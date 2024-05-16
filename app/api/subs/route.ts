import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface StripeSubscriptionRequest {
    monthly: string;
    userId: string;
    serverId: string;
    priceId: string;
}

export async function POST(req: Request) {
  try {
    // we will receive the priceId, email, and userId from the client
    const { priceId, serverId, userId, monthly } =
      (await req.json()) as StripeSubscriptionRequest;

    const session = await stripe.checkout.sessions.create({
      metadata: {
        // we will use this in our webhooks 
        priceId: priceId,
        userId: userId,
        serverId: serverId,
        monthly: monthly,
      },
      allow_promotion_codes: true,
      payment_method_types: ["card", "paypal", "sofort", "link"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",

      // normally you would redirect to a succes page/onboarding page
      success_url: `${req.headers.get("referer")}/success?type=${monthly ? "monthly" : "annualy"}&server=${serverId}`,

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
