import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Verify Twilio webhook signature (TODO: implement signature verification)
    const twilioSignature = req.headers.get('X-Twilio-Signature')
    
    const formData = await req.formData()
    const MessageSid = formData.get('MessageSid')?.toString() || ''
    const From = formData.get('From')?.toString() || ''
    const To = formData.get('To')?.toString() || ''
    const Body = formData.get('Body')?.toString() || ''
    const NumMedia = parseInt(formData.get('NumMedia')?.toString() || '0')

    // Get media URLs if MMS
    const mediaUrls: string[] = []
    for (let i = 0; i < NumMedia; i++) {
      const mediaUrl = formData.get(`MediaUrl${i}`)?.toString()
      if (mediaUrl) mediaUrls.push(mediaUrl)
    }

    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find virtual phone number and user
    const { data: virtualPhone } = await supabaseClient
      .from('virtual_phone_numbers')
      .select('id, user_id')
      .eq('phone_number', To)
      .eq('status', 'active')
      .single()

    if (!virtualPhone) {
      console.error('Virtual phone not found:', To)
      return new Response('OK', { status: 200 }) // Still return 200 to Twilio
    }

    // Store SMS message
    const { error: insertError } = await supabaseClient
      .from('sms_messages')
      .insert({
        user_id: virtualPhone.user_id,
        virtual_phone_id: virtualPhone.id,
        direction: 'inbound',
        from_number: From,
        to_number: To,
        body: Body,
        media_urls: mediaUrls,
        provider_message_sid: MessageSid,
        status: 'received',
        read: false,
      })

    if (insertError) {
      console.error('Error storing SMS:', insertError)
    }

    // Send notification to user
    await supabaseClient.from('notifications').insert({
      user_id: virtualPhone.user_id,
      type: 'push',
      channel: 'expo',
      title: 'New SMS Message',
      body: `From ${From}: ${Body.substring(0, 100)}`,
      data: { type: 'sms', from: From },
      status: 'pending',
    })

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: virtualPhone.user_id,
      activity_type: 'sms_received',
      entity_type: 'sms_message',
      title: 'SMS received',
      description: `Received SMS from ${From}`,
    })

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Error', { status: 500 })
  }
})
