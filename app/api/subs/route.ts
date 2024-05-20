import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import guildProfileSchema from "@/models/Guild";
import connectDb from "@/lib/mongodb";

interface StripeSubscriptionRequest {
    monthly: string;
    userId: string;
    serverId: string;
    priceId: string;
}

export async function POST(req: Request) {

  await connectDb();

  const { priceId, serverId, userId, monthly } =
  (await req.json()) as StripeSubscriptionRequest;

  const server = await guildProfileSchema.findOne({ serverId });

  if (!serverId) {
    return NextResponse.json({ message: "Missing ServerId Parameter", status: 422 }, { status: 422 });
  }

  if (!priceId) {
    return NextResponse.json({ message: "Missing PriceId Parameter", status: 422 }, { status: 422 });
  }

  if (!userId) {
    return NextResponse.json({ message: "Missing UserId Parameter", status: 422 }, { status: 422 });
  }

  if (!monthly) {
    return NextResponse.json({ message: "Missing Monthly Parameter", status: 422 }, { status: 422 });
  }

  if (server && server?.premiumExpiration !== null) {
    return NextResponse.json({ message: "This server already has an active premium subscription", status: 409  }, { status: 409 });
  }

  try {
    // we will receive the priceId, email, and userId from the client

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
      return NextResponse.json({ message: error.message, status: 500 }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred", status: 500 },
        { status: 500 },
      );
    }
  }
}
