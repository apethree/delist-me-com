import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Parse inbound email (format depends on email service provider)
    // This is a generic handler - adapt based on your email provider (Mailgun, SendGrid, etc.)
    const body = await req.json()

    const from = body.from || body.sender
    const to = body.to || body.recipient
    const subject = body.subject
    const textBody = body.text || body['body-plain']
    const htmlBody = body.html || body['body-html']
    const attachments = body.attachments || []

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find virtual email and user
    const { data: virtualEmail } = await supabaseClient
      .from('virtual_emails')
      .select('id, user_id, forwarding_enabled, forwarding_email')
      .eq('email_address', to)
      .eq('status', 'active')
      .single()

    if (!virtualEmail) {
      console.error('Virtual email not found:', to)
      return new Response('Email address not found', { status: 404 })
    }

    // Store received email
    const { data: storedEmail, error: insertError } = await supabaseClient
      .from('received_emails')
      .insert({
        user_id: virtualEmail.user_id,
        virtual_email_id: virtualEmail.id,
        from_email: from,
        to_email: to,
        subject: subject,
        body_text: textBody,
        body_html: htmlBody,
        attachments: attachments.map((a: any) => ({
          filename: a.filename,
          content_type: a['content-type'],
          size: a.size,
        })),
        headers: body.headers || {},
        read: false,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error storing email:', insertError)
    }

    // Forward email if enabled
    if (virtualEmail.forwarding_enabled && virtualEmail.forwarding_email) {
      // TODO: Implement email forwarding via SendGrid/Resend
      console.log('Would forward to:', virtualEmail.forwarding_email)
    }

    // Send notification
    await supabaseClient.from('notifications').insert({
      user_id: virtualEmail.user_id,
      type: 'push',
      channel: 'expo',
      title: 'New Email',
      body: `From ${from}: ${subject}`,
      data: { type: 'email', from, subject },
      status: 'pending',
    })

    // Log activity
    await supabaseClient.from('activity_log').insert({
      user_id: virtualEmail.user_id,
      activity_type: 'email_received',
      entity_type: 'received_email',
      entity_id: storedEmail?.id,
      title: 'Email received',
      description: `Received email from ${from}`,
    })

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Error', { status: 500 })
  }
})
