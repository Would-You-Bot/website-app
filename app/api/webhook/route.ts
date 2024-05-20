import { stripe } from "@/lib/stripe";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import guildProfileSchema from "@/models/Guild";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Webhook signature verification failed: ${error.message}`
        );
      } else {
        console.error(
          "Webhook signature verification failed with unknown error type."
        );
      }
      return NextResponse.json(
        { message: "Webhook Error", status: 400 },
        { status: 400 }
      );
    }

    switch (event.type) {
      // in the event of a successful checkout
      case "checkout.session.completed":
        const session: Stripe.Checkout.Session = event.data.object;
        const userId = session.metadata?.userId;
        const serverId = session.metadata?.serverId;
        const tier =
          session.metadata?.monthly === "true" ? "monthly" : "yearly";

        if (!userId || !serverId || !tier) {
          console.error("One or more variables are undefined.");
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          );
        }
        await guildProfileSchema.findOneAndUpdate(
          { serverId },
          {
            guildID: serverId,
            premiumUser: userId,
            premium: 1,
            premiumExpiration: new Date(
              tier === "monthly"
                ? new Date().setMonth(new Date().getMonth() + 1)
                : new Date().setFullYear(new Date().getFullYear() + 1)
            ),
          },
          { upsert: true }
        );
        break;

      // in the event of a subscription being updated
      case "customer.subscription.updated":
        const subscription: Stripe.Subscription = event.data.object;
        const userIdUpdated = subscription.metadata?.userId;
        const serverIdUpdated = subscription.metadata?.serverId;
        const tierUpdated =
          subscription.metadata?.monthly === "true" ? "monthly" : "yearly";

        if (!userIdUpdated || !serverIdUpdated || !tierUpdated) {
          console.error("One or more variables are undefined.");
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          );
        }

        await guildProfileSchema.findOneAndUpdate(
          { serverId },
          {
            guildID: serverId,
            premiumUser: userId,
            premium: 1,
            premiumExpiration: new Date(subscription.current_period_end),
          },
          { upsert: true }
        );
        break;

      // in the event of a subscription being deleted
      case "customer.subscription.deleted":
        const subscriptionDeleted: Stripe.Subscription = event.data.object;
        const userIdDeleted = subscriptionDeleted.metadata?.userId;
        const serverIdDeleted = subscriptionDeleted.metadata?.serverId;
        const tierDeleted =
          subscriptionDeleted.metadata?.monthly === "true"
            ? "monthly"
            : "yearly";

        if (!userIdDeleted || !serverIdDeleted || !tierDeleted) {
          console.error("One or more variables are undefined.");
          return NextResponse.json(
            { message: "One or more variables are missing", status: 400 },
            { status: 400 }
          );
        }

        await guildProfileSchema.findOneAndUpdate(
          { serverId },
          {
            guildID: serverId,
            premiumUser: null,
            premium: 0,
            premiumExpiration: null,
          }
        );
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ message: "success", status: "success" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, status: 500 },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred", status: 500 },
        { status: 500 }
      );
    }
  }
}
