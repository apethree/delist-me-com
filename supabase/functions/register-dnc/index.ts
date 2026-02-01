import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const { phone_number } = await req.json()

    if (!phone_number) {
      return new Response(JSON.stringify({ error: 'Phone number is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // TODO: Integrate with actual FTC DNC API
    // For now, create a mock registration
    const confirmationNumber = `DNC-${Date.now()}`
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 5) // DNC registrations last 5 years

    const { data: registration, error: insertError } = await supabaseClient
      .from('dnc_registrations')
      .insert({
        user_id: user.id,
        phone_number, // TODO: Encrypt this
        registration_status: 'registered',
        confirmation_number: confirmationNumber,
        registered_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Update user's DNC status
    await supabaseClient
      .from('users')
      .update({
        dnc_registered: true,
        dnc_registered_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: user.id,
      activity_type: 'dnc_registered',
      entity_type: 'dnc_registration',
      entity_id: registration.id,
      title: 'Registered on Do Not Call list',
      description: `Registered ${phone_number} on federal DNC registry`,
    })

    return new Response(
      JSON.stringify({
        success: true,
        data: registration,
        message: 'Successfully registered on Do Not Call list',
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
