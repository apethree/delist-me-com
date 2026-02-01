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

    const { finding_ids } = await req.json()

    if (!finding_ids || !Array.isArray(finding_ids) || finding_ids.length === 0) {
      return new Response(JSON.stringify({ error: 'finding_ids array is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Get findings with broker info
    const { data: findings, error: findingsError } = await supabaseClient
      .from('broker_findings')
      .select('id, broker_id, data_brokers(id, name, removal_method, removal_url)')
      .in('id', finding_ids)
      .eq('user_id', user.id)
      .eq('status', 'found')

    if (findingsError) throw findingsError

    if (!findings || findings.length === 0) {
      return new Response(JSON.stringify({ error: 'No valid findings found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    const removalRequests = []

    // Create removal request for each finding
    for (const finding of findings) {
      const { data: request, error: requestError } = await supabaseClient
        .from('removal_requests')
        .insert({
          user_id: user.id,
          finding_id: finding.id,
          broker_id: finding.broker_id,
          status: 'pending',
          method: finding.data_brokers?.removal_method || 'form',
        })
        .select()
        .single()

      if (requestError) {
        console.error('Error creating removal request:', requestError)
        continue
      }

      removalRequests.push(request)

      // Log activity
      await supabaseClient.from('activity_log').insert({
        user_id: user.id,
        activity_type: 'removal_requested',
        entity_type: 'removal_request',
        entity_id: request.id,
        title: 'Removal request submitted',
        description: `Submitted removal request to ${finding.data_brokers?.name}`,
      })
    }

    // TODO: Trigger actual removal process (could be background job)
    // This would involve form filling, email sending, etc.

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          requests_created: removalRequests.length,
          requests: removalRequests,
        },
        message: `Created ${removalRequests.length} removal request(s)`,
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
