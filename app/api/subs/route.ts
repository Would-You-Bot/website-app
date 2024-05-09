import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface StripeSubscriptionRequest {
    monthly: string;
    userId: string;
    serverId: string;
}

export async function POST(req: Request) {
  try {
    // we will receive the priceId, email, and userId from the client
    const { serverId, userId, monthly } =
      (await req.json()) as StripeSubscriptionRequest;
    console.log(process.env.STRIPE_MONTHLY_PRICE_ID, process.env.STRIPE_YEARLY_PRICE_ID)
    const priceId = monthly == "true" ? process.env.STRIPE_MONTHLY_PRICE_ID! : process.env.STRIPE_YEARLY_PRICE_ID!;
    console.log(priceId);
    const session = await stripe.checkout.sessions.create({
      metadata: {
        // we will use this in our webhooks 
        priceid: priceId,
        userId: userId,
        serverId: serverId,
        monthly: monthly,
      },
      payment_method_types: ["card", "paypal", "revolut_pay"],
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
