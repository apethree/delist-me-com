import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export const handler = async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) throw new Error('Missing authorization token')

    // Decode JWT to get user ID (sub)
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const jwtPayload = JSON.parse(jsonPayload)
    const userId = jwtPayload.sub

    if (!userId) throw new Error('Invalid token: missing sub claim')

    // Create Supabase client with the user's token to respect RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
      }
    )

    const { verification_type } = await req.json()

    // Create verification session
    const { data, error } = await supabaseClient
      .from('identity_verifications')
      .insert({
        user_id: userId,
        verification_type: verification_type || 'id_only',
        status: 'pending_documents',
        required_documents: verification_type === 'id_with_selfie' ? ['front', 'back', 'selfie'] : ['front', 'back'],
        uploaded_documents: []
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
}


if (import.meta.main) {
  serve(handler)
}
