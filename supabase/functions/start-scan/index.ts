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

    // Create new scan session
    const { data: session, error: sessionError } = await supabaseClient
      .from('scan_sessions')
      .insert({
        user_id: user.id,
        status: 'pending',
        brokers_to_scan: 0,
        brokers_scanned: 0,
        brokers_found: 0,
      })
      .select()
      .single()

    if (sessionError) throw sessionError

    // Get all active data brokers
    const { data: brokers, error: brokersError } = await supabaseClient
      .from('data_brokers')
      .select('id, name')
      .eq('active', true)
      .eq('scrape_enabled', true)

    if (brokersError) throw brokersError

    // Update session with broker count
    await supabaseClient
      .from('scan_sessions')
      .update({
        brokers_to_scan: brokers.length,
        status: 'scanning',
        started_at: new Date().toISOString(),
      })
      .eq('id', session.id)

    // Create finding records for each broker
    const findingInserts = brokers.map(broker => ({
      user_id: user.id,
      scan_session_id: session.id,
      broker_id: broker.id,
      status: 'unknown',
    }))

    await supabaseClient.from('broker_findings').insert(findingInserts)

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: user.id,
      activity_type: 'scan_started',
      entity_type: 'scan_session',
      entity_id: session.id,
      title: 'Scan started',
      description: `Started scanning ${brokers.length} data brokers`,
    })

    // TODO: Trigger actual scanning (could be async job, separate function, or external service)
    // For now, return the session ID so the client can poll for updates

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          session_id: session.id,
          brokers_to_scan: brokers.length,
        },
        message: 'Scan started successfully',
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
