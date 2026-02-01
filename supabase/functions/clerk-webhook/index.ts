import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Webhook } from 'https://esm.sh/svix@1.4.9'

serve(async (req) => {
  try {
    // Verify Clerk webhook signature
    const svixId = req.headers.get('svix-id')
    const svixTimestamp = req.headers.get('svix-timestamp')
    const svixSignature = req.headers.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response('Missing svix headers', { status: 400 })
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET')

    if (!webhookSecret) {
      return new Response('Webhook secret not configured', { status: 500 })
    }

    const wh = new Webhook(webhookSecret)
    let payload: any

    try {
      payload = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      })
    } catch (err) {
      console.error('Webhook verification failed:', err)
      return new Response('Invalid signature', { status: 400 })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const eventType = payload.type

    switch (eventType) {
      case 'user.created':
        // Create user in Supabase
        const { data: newUser, error: createError } = await supabaseClient
          .from('users')
          .insert({
            id: payload.data.id, // Use Clerk ID as primary key
            clerk_user_id: payload.data.id,
            email: payload.data.email_addresses[0]?.email_address,
            full_name: `${payload.data.first_name || ''} ${payload.data.last_name || ''}`.trim(),
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating user:', createError)
        }

        // Sync identities
        for (const identity of payload.data.external_accounts || []) {
          await supabaseClient.from('clerk_identities').insert({
            user_id: payload.data.id,
            clerk_identity_id: identity.id,
            provider: identity.provider,
            provider_user_id: identity.provider_user_id,
            email: identity.email_address,
            verified: identity.verification?.status === 'verified',
            is_primary: false,
          })
        }

        // Queue for Breach Monitoring
        for (const emailObj of payload.data.email_addresses || []) {
            if (emailObj.verification?.status === 'verified') {
                await supabaseClient.from('breach_monitors').upsert({
                    user_id: payload.data.id,
                    email: emailObj.email_address,
                    status: 'pending',
                    next_check_at: new Date().toISOString()
                }, { onConflict: 'email' })
            }
        }
        break

      case 'user.updated':
        // Update user in Supabase
        await supabaseClient
          .from('users')
          .update({
            email: payload.data.email_addresses[0]?.email_address,
            full_name: `${payload.data.first_name || ''} ${payload.data.last_name || ''}`.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq('clerk_user_id', payload.data.id)
        break

      case 'user.deleted':
        // Soft delete or hard delete user
        await supabaseClient
          .from('users')
          .delete()
          .eq('clerk_user_id', payload.data.id)
        break
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
