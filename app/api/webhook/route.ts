import guildProfileSchema from '@/models/Guild'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Webhook signature verification failed: ${error.message}`)
    } else {
      console.error(
        'Webhook signature verification failed with unknown error type.'
      )
    }
    return NextResponse.json(
      { message: 'Webhook Error', status: 400 },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session: Stripe.Checkout.Session = event.data.object
      if (!session.id) {
        throw new Error('Session ID is missing')
      }

      const retrievedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ['line_items']
        }
      )

      const lineItems = retrievedSession.line_items?.data
      if (!lineItems || lineItems.length === 0) {
        throw new Error('No line items found in the session')
      }

      const firstLineItem = lineItems[0]
      if (!firstLineItem.price?.product) {
        throw new Error('Product information is missing')
      }

      if (!session.subscription) {
        throw new Error('No subscription found in the session')
      }

      const subscription: Stripe.Subscription =
        await stripe.subscriptions.retrieve(session.subscription as string)

      if (!subscription) throw new Error('Failed to retrieve subscription')

      const userId = subscription.metadata?.userId
      const serverId = subscription.metadata?.serverId
      const tier = subscription.metadata?.monthly === "true" ? "monthly" : "yearly" 
      if (!userId || !serverId || !tier) {
        return NextResponse.json(
          {
            message: 'Missing metadata',
            status: 400 
          },
          { status: 400 }
        )
      }

      if (tier !== 'monthly' && tier !== 'yearly') {
        return NextResponse.json(
          {
            message: 'Invalid tier spesificed',
            status: 400 
          },
          { status: 400 }
        )
      }

      const pending = session.payment_status == 'unpaid'

      console.log(pending)

      try {
        await guildProfileSchema.findOneAndUpdate(
          { guildID: serverId },
          {
            guildID: serverId,
            premiumUser: userId,
            premium: 1,
            premiumExpiration: new Date(subscription.current_period_end * 1000),
            pending: pending,
            pendingSince: pending ? new Date(Date.now()) : null
          },
          { upsert: true }
        )
      } catch (error) {
        return NextResponse.json(
          {
            message: 'An error occurred while updating the database.',
            status: 500
          },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { message: 'Premium status updated successfully', status: 200 },
        { status: 200 }
      )
    }
    case 'charge.succeeded': {
      const charge = event.data.object as Stripe.Charge
      console.log(charge)
      try {
        if (!charge.invoice) {
          // This charge is not associated with a subscription invoice
          return NextResponse.json(
            { message: 'Charge is not related to a subscription', status: 400 },
            { status: 400 }
          )
        }

        const invoice = await stripe.invoices.retrieve(charge.invoice as string)
        if (!invoice.subscription) {
          throw new Error('Invoice is not associated with a subscription')
        }

        console.log(invoice.subscription)

        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        )
        const userId = subscription.metadata?.userId
        const serverId = subscription.metadata?.serverId

        if (!userId || !serverId) {
          throw new Error('Required metadata is missing')
        }

        // Update the guild profile to reflect the successful payment
        await guildProfileSchema.findOneAndUpdate(
          { guildID: serverId },
          {
            premiumExpiration: new Date(subscription.current_period_end * 1000),
            pending: false,
            pendingSince: null
          }
        )

        return NextResponse.json(
          { message: 'Charge succeeded, profile updated', status: 200 },
          { status: 200 }
        )
      } catch (error) {
        console.error('Error in charge.succeeded handler:', error)
        return NextResponse.json(
          {
            message:
              error instanceof Error ?
                error.message
              : 'An unknown error occurred',
            status: 500
          },
          { status: 500 }
        )
      }
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice

      if (!invoice.subscription) {
        throw new Error('Invoice is not associated with a subscription')
      }

      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string
      )
      const userId = subscription.metadata?.userId
      const serverId = subscription.metadata?.serverId

      if (!userId || !serverId) {
        throw new Error('Required metadata is missing')
      }

      // Update the guild profile to reflect the failed payment
      await guildProfileSchema.findOneAndUpdate(
        { guildID: serverId },
        {
          pending: true,
          pendingSince: new Date()
        }
      )

      return NextResponse.json(
        { message: 'Payment failed, profile updated', status: 200 },
        { status: 200 }
      )
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription

      try {
        const userId = subscription.metadata?.userId
        const serverId = subscription.metadata?.serverId

        if (!userId || !serverId) {
          throw new Error('Required metadata is missing')
        }

        // Update the guild profile to remove premium status
        await guildProfileSchema.findOneAndUpdate(
          { guildID: serverId },
          {
            premium: 0,
            premiumExpiration: null,
            pending: false,
            pendingSince: null
          }
        )

        return NextResponse.json(
          {
            message: 'Subscription deleted, premium status removed',
            status: 200
          },
          { status: 200 }
        )
      } catch (error) {
        console.error('Error in customer.subscription.deleted handler:', error)
        return NextResponse.json(
          {
            message:
              error instanceof Error ?
                error.message
              : 'An unknown error occurred',
            status: 500
          },
          { status: 500 }
        )
      }
    }

    default:
      //console.log(event.type)
      return NextResponse.json(
        { message: 'Unhandeled Event type ', stauts: 200 },
        { status: 200 }
      )
  }
}
