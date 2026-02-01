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

    // Create Supabase client with the user's token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    )

    const formData = await req.formData()
    const file = formData.get('file')
    const documentSide = formData.get('document_side') // front, back, selfie
    const verificationId = formData.get('verification_id')
    const documentType = formData.get('document_type') // passport, dl, etc

    if (!file || !documentSide || !verificationId) {
      throw new Error('Missing required fields: file, document_side, verification_id')
    }

    if (!(file instanceof File)) {
      throw new Error('Invalid file')
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File too large (max 10MB)')
    }

    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WEBP allowed')
    }

    // Path: user_id/verification_id/side_timestamp.ext
    const ext = file.name.split('.').pop()
    const path = `${userId}/${verificationId}/${documentSide}_${Date.now()}.${ext}`

    // Upload to Storage
    const { data: uploadData, error: uploadError } = await supabaseClient
      .storage
      .from('id-documents')
      .upload(path, file, {
        contentType: file.type,
        upsert: true
      })

    if (uploadError) throw uploadError

    // Insert into documents table for metadata tracking
    const { data: docRecord, error: docError } = await supabaseClient
      .from('documents')
      .insert({
        user_id: userId,
        document_type: String(documentType || 'id_verification'),
        file_name: file.name,
        file_path: path,
        file_size: file.size,
        mime_type: file.type,
        storage_bucket: 'id-documents',
        status: 'uploaded'
      })
      .select()
      .single()

    if (docError) {
      console.error('Error tracking document:', docError)
      // Continue anyway as storage upload succeeded
    }

    // Update identity_verifications
    // First fetch current documents
    const { data: currentSession, error: fetchError } = await supabaseClient
      .from('identity_verifications')
      .select('uploaded_documents')
      .eq('id', verificationId)
      .single()

    if (fetchError) throw fetchError

    const uploadedDocs = new Set(currentSession.uploaded_documents || [])
    uploadedDocs.add(String(documentSide))
    const newDocList = Array.from(uploadedDocs)

    const { error: updateError } = await supabaseClient
      .from('identity_verifications')
      .update({
        uploaded_documents: newDocList,
        updated_at: new Date().toISOString()
      })
      .eq('id', verificationId)

    if (updateError) throw updateError

    return new Response(JSON.stringify({
      success: true,
      path: path,
      uploaded_documents: newDocList
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
