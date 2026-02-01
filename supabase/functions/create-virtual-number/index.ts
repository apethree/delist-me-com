import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get authenticated user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    // Parse request body
    const { phone_number } = await req.json()

    if (!phone_number) {
      return new Response(JSON.stringify({ error: 'Phone number is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Check if user already has a virtual number
    const { data: existingNumbers, error: checkError } = await supabaseClient
      .from('virtual_phone_numbers')
      .select('id, is_primary')
      .eq('user_id', user.id)
      .eq('status', 'active')

    if (checkError) throw checkError

    const isFirstNumber = !existingNumbers || existingNumbers.length === 0
    const purchasePrice = isFirstNumber ? 0.00 : 9.99 // First number free, additional at subscription cost

    // Provision number with Twilio (placeholder - implement actual Twilio API call)
    const twilioSid = `PN${Date.now()}` // Mock SID for now

    // Create virtual phone number record
    const { data: newNumber, error: insertError } = await supabaseClient
      .from('virtual_phone_numbers')
      .insert({
        user_id: user.id,
        phone_number,
        provider: 'twilio',
        provider_sid: twilioSid,
        status: 'active',
        is_primary: isFirstNumber,
        purchase_price: purchasePrice,
        monthly_cost: isFirstNumber ? 0.00 : 9.99,
        forwarding_enabled: false,
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: user.id,
      activity_type: 'virtual_phone_created',
      entity_type: 'virtual_phone',
      entity_id: newNumber.id,
      title: 'Virtual phone number created',
      description: `Created virtual phone number ${phone_number}`,
      metadata: { is_primary: isFirstNumber, purchase_price: purchasePrice },
    })

    return new Response(
      JSON.stringify({
        success: true,
        data: newNumber,
        message: isFirstNumber ? 'First virtual number created (free)' : 'Additional virtual number created',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
