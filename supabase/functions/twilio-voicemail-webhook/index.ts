import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const formData = await req.formData()
    const CallSid = formData.get('CallSid')?.toString() || ''
    const From = formData.get('From')?.toString() || ''
    const To = formData.get('To')?.toString() || ''
    const RecordingUrl = formData.get('RecordingUrl')?.toString() || ''
    const RecordingDuration = formData.get('RecordingDuration')?.toString() || '0'

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find virtual phone number
    const { data: virtualPhone } = await supabaseClient
      .from('virtual_phone_numbers')
      .select('id, user_id')
      .eq('phone_number', To)
      .eq('status', 'active')
      .single()

    if (!virtualPhone) {
      console.error('Virtual phone not found:', To)
      return new Response('OK', { status: 200 })
    }

    // TODO: Download recording from Twilio and upload to Supabase Storage
    // const storagePath = `voicemails/${virtualPhone.user_id}/${CallSid}.mp3`

    // Store voicemail
    const { error: insertError } = await supabaseClient
      .from('voicemails')
      .insert({
        user_id: virtualPhone.user_id,
        virtual_phone_id: virtualPhone.id,
        from_number: From,
        duration_seconds: parseInt(RecordingDuration),
        recording_url: RecordingUrl,
        storage_path: null, // TODO: Add after uploading to storage
        transcription: null, // TODO: Add AI transcription
        provider_call_sid: CallSid,
        status: 'new',
      })

    if (insertError) {
      console.error('Error storing voicemail:', insertError)
    }

    // Send notification
    await supabaseClient.from('notifications').insert({
      user_id: virtualPhone.user_id,
      type: 'push',
      channel: 'expo',
      title: 'New Voicemail',
      body: `From ${From} (${RecordingDuration}s)`,
      data: { type: 'voicemail', from: From },
      status: 'pending',
    })

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: virtualPhone.user_id,
      activity_type: 'voicemail_received',
      entity_type: 'voicemail',
      title: 'Voicemail received',
      description: `Received voicemail from ${From}`,
    })

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Error', { status: 500 })
  }
})
