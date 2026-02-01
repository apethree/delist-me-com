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
    const { email_address } = await req.json()

    if (!email_address || !email_address.endsWith('@delistme.com')) {
      return new Response(JSON.stringify({ error: 'Invalid email address. Must end with @delistme.com' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Check if email already exists
    const { data: existing } = await supabaseClient
      .from('virtual_emails')
      .select('id')
      .eq('email_address', email_address)
      .single()

    if (existing) {
      return new Response(JSON.stringify({ error: 'Email address already taken' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 409,
      })
    }

    // Get user's real email for forwarding
    const { data: userData } = await supabaseClient
      .from('users')
      .select('email')
      .eq('id', user.id)
      .single()

    // Create virtual email record
    const { data: newEmail, error: insertError } = await supabaseClient
      .from('virtual_emails')
      .insert({
        user_id: user.id,
        email_address,
        status: 'active',
        forwarding_enabled: true,
        forwarding_email: userData?.email, // TODO: Encrypt this
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: user.id,
      activity_type: 'virtual_email_created',
      entity_type: 'virtual_email',
      entity_id: newEmail.id,
      title: 'Virtual email created',
      description: `Created virtual email ${email_address}`,
    })

    return new Response(
      JSON.stringify({
        success: true,
        data: newEmail,
        message: 'Virtual email created successfully',
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
