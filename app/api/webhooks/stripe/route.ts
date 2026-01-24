import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

// We force dynamic to prevent caching of webhook requests
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const subscriptionId = session.subscription as string
        const customerId = session.customer as string

        // Retrieve the subscription details to get the current period end
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)

        // Find the user by stripe_customer_id
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            stripe_subscription_id: subscriptionId,
            subscription_status: subscription.status,
            subscription_plan_id: session.metadata?.priceId || (subscription as any).plan?.id,
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        
        if (updateError) console.error('Error updating profile:', updateError)
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('profiles')
          .update({
            subscription_status: subscription.status,
            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            stripe_subscription_id: subscription.id,
          })
          .eq('stripe_customer_id', subscription.customer as string)
        break
      }
    }
  } catch (error) {
    console.error('Webhook handler failed:', error)
    return new NextResponse('Webhook handler failed', { status: 500 })
  }

  return new NextResponse('Webhook received', { status: 200 })
}
