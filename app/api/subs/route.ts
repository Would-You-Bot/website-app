import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface StripeSubscriptionRequest {
    priceId: string;
    tier: string;
    userId: string;
    serverId: string;
}

export async function POST(req: Request) {
  try {
    // we will receive the priceId, email, and userId from the client
    const { priceId, serverId, userId, tier } =
      (await req.json()) as StripeSubscriptionRequest;

    const session = await stripe.checkout.sessions.create({
      metadata: {
        // we will use this in our webhooks
        priceid: priceId,
        userId: userId,
        serverId: serverId,
        tier: tier,
      },
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",

      // normally you would redirect to a succes page/onboarding page
      success_url: `${req.headers.get("referer")}`,

      cancel_url: `${req.headers.get("referer")}`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
