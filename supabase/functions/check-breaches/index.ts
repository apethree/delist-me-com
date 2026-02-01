import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Interface for HIBP response
interface HIBPBreach {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  AddedDate: string
  ModifiedDate: string
  PwnCount: number
  Description: string
  LogoPath: string
  DataClasses: string[]
  IsVerified: boolean
  IsFabricated: boolean
  IsSensitive: boolean
  IsRetired: boolean
  IsSpamList: boolean
}

serve(async (req) => {
  // Use Service Role Key for backend access
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // 1. Fetch pending monitors
  // We process 5 at a time to stay well within rate limits per minute
  const { data: batch, error: fetchError } = await supabase
    .from('breach_monitors')
    .select('*')
    .lte('next_check_at', new Date().toISOString())
    .neq('status', 'processing')
    .limit(5)

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError }), { status: 500 })
  }

  if (!batch || batch.length === 0) {
    return new Response(JSON.stringify({ message: 'No pending checks' }), { status: 200 })
  }

  // Mark as processing to avoid race conditions (simple locking)
  const ids = batch.map(b => b.id)
  await supabase.from('breach_monitors').update({ status: 'processing' }).in('id', ids)

  const results = []
  const apiKey = Deno.env.get('HIBP_API_KEY')

  if (!apiKey) {
    console.error("Missing HIBP_API_KEY")
     // Reset status to error or pending?
    await supabase.from('breach_monitors').update({ status: 'error_config' }).in('id', ids)
    return new Response("Missing HIBP Config", { status: 500 })
  }

  // 2. Process Loop
  for (const monitor of batch) {
    // Rate Limit: HIBP allows 1 request per 1.5 seconds.
    // We wait 1.6s BEFORE each request just to be safe.
    await new Promise(resolve => setTimeout(resolve, 1600))

    try {
      const email = monitor.email
      const encodedEmail = encodeURIComponent(email)
      const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodedEmail}?truncateResponse=false`
      
      const res = await fetch(url, {
        headers: {
          'hibp-api-key': apiKey,
          'user-agent': 'DelistMe-Scanner'
        }
      })

      if (res.status === 200) {
        const breaches: HIBPBreach[] = await res.json()
        
        let breachCount = 0
        for (const b of breaches) {
           // Upsert Known Breach
           const { data: kBreach, error: kbError } = await supabase
             .from('known_breaches')
             .upsert({
               name: b.Name,
               title: b.Title,
               domain: b.Domain || '',
               breach_date: b.BreachDate,
               added_date: b.AddedDate,
               modified_date: b.ModifiedDate,
               description: b.Description,
               logo_path: b.LogoPath,
               pwn_count: b.PwnCount,
               data_classes: b.DataClasses,
               is_verified: b.IsVerified,
               is_fabricated: b.IsFabricated,
               is_sensitive: b.IsSensitive,
               is_retired: b.IsRetired,
               is_spam_list: b.IsSpamList
             }, { onConflict: 'name' })
             .select()
             .single()

           if (kBreach) {
             // Link to User
             await supabase.from('user_breaches').upsert({
               user_id: monitor.user_id,
               breach_id: kBreach.id,
               email: email
             }, { onConflict: 'user_id, breach_id, email' })
             breachCount++
           }
        }
        
        results.push({ email, found: breachCount })
        
      } else if (res.status === 404) {
        // No breaches found
        results.push({ email, found: 0 })
      } else if (res.status === 429) {
        // Rate limited - Stop batch?
        console.error(`Rate limited for ${email}`)
        // Backoff for this item?
        throw new Error('RateLimit')
      } else {
        console.error(`API Error ${res.status} for ${email}`)
      }

      // Update Monitor Status
      // Schedule next check in 7 days
      const nextCheck = new Date()
      nextCheck.setDate(nextCheck.getDate() + 7)

      await supabase.from('breach_monitors').update({
        status: 'checked',
        last_checked_at: new Date().toISOString(),
        next_check_at: nextCheck.toISOString()
      }).eq('id', monitor.id)

    } catch (err) {
      console.error(`Error processing ${monitor.email}`, err)
      // Reset to pending to retry later? Or error state?
      // If RateLimit, maybe retry soon.
      await supabase.from('breach_monitors').update({
        status: 'retry',
        next_check_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // Retry in 5 mins
      }).eq('id', monitor.id)
    }
  }

  return new Response(JSON.stringify({ processed: batch.length, results }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  })
})
