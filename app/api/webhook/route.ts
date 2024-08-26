import { stripe } from "@/lib/stripe"
import guildProfileSchema from "@/models/Guild"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("stripe-signature")

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
          "Webhook signature verification failed with unknown error type."
        )
      }
      return NextResponse.json(
        { message: "Webhook Error", status: 400 },
        { status: 400 }
      )
    }

    switch (event.type) {
      // in the event of a successful checkout
      case "checkout.session.completed":
        const checkoutSession: Stripe.Checkout.Session = event.data.object
        const serverIdSession = checkoutSession.metadata?.serverId
        const userIdSession = checkoutSession.metadata?.userId

        if (!userIdSession || !serverIdSession) {
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          )
        }

        await guildProfileSchema.findOneAndUpdate(
          { guildID: serverIdSession },
          {
            premiumPending: true,
            premiumUser: userIdSession
          },
          { upsert: true }
        )
      break;

      case 'charge.succeeded': 
        const chargeSucceeded: Stripe.Charge = event.data.object
        const userIdCharge = chargeSucceeded.metadata?.userId
        const serverIdCharge = chargeSucceeded.metadata?.serverId

        const supscription = event.data.subscription

        if (!userIdCharge || !serverIdCharge) {
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          )
        }

        await guildProfileSchema.findOneAndUpdate(
          { guildID: serverIdSession },
          {
            premiumPending: false,
            premiumUser: userIdSession
          },
          { upsert: true }
        )
    
    break;
        

      // in the event of a subscription being updated
      case "customer.subscription.updated":
        const subscriptionUpdated: Stripe.Subscription = event.data.object
        const userIdUpdated = subscriptionUpdated.metadata?.userId
        const serverIdUpdated = subscriptionUpdated.metadata?.serverId
        const tierUpdated =
          subscriptionUpdated.metadata?.monthly === "true" ?
            "monthly"
          : "yearly"

        if (!userIdUpdated || !serverIdUpdated || !tierUpdated) {
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          )
        }

        await guildProfileSchema.findOneAndUpdate(
          { guildID: serverIdUpdated },
          {
            premium: 1,
            premiumExpiration: new Date(
              subscriptionUpdated.current_period_end * 1000
            )
          },
          { upsert: true }
        )
        break

      // in the event of a subscription being deleted
      case "customer.subscription.deleted":
        const subscriptionDeleted: Stripe.Subscription = event.data.object
        const userIdDeleted = subscriptionDeleted.metadata?.userId
        const serverIdDeleted = subscriptionDeleted.metadata?.serverId
        const tierDeleted =
          subscriptionDeleted.metadata?.monthly === "true" ?
            "monthly"
          : "yearly"

        if (!userIdDeleted || !serverIdDeleted || !tierDeleted) {
          console.error("One or more variables are undefined.")
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          )
        }
        try {
          await guildProfileSchema.findOneAndUpdate(
            { guildID: serverIdDeleted },
            {
              premiumUser: null,
              premium: 0,
              premiumExpiration: null
            }
          )
        } catch (error) {
          console.error(error)
          return NextResponse.json(
            {
              message: "An error occurred while updating the database.",
              status: 500
            },
            { status: 500 }
          )
        }

        break

      default:
        console.log("Unhandled event type:", event.type)
    }

    return NextResponse.json({ message: "success", status: "success" })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, status: 500 },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred", status: 500 },
        { status: 500 }
      )
    }
  }
}
