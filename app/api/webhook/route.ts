import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

        console.log(event)
    switch (event.type) {
        case 'charge.refunded':
          const chargeRefunded = event.data.object;
          // Then define and call a function to handle the event charge.refunded
          break;
        case 'charge.succeeded':
          const chargeSucceeded = event.data.object;
          // Then define and call a function to handle the event charge.succeeded
          break;
        case 'charge.dispute.created':
          const chargeDisputeCreated = event.data.object;
          // Then define and call a function to handle the event charge.dispute.created
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
/* 
    console.log(
      res?.data?.object?.billing_details?.email, // email
      res?.data?.object?.amount, // amount
      JSON.stringify(res), // payment info
      res?.type, // type
      String(timeString), // time
      String(dateTime), // date
      res?.data?.object?.receipt_email, // email
      res?.data?.object?.receipt_url, // url
      JSON.stringify(res?.data?.object?.payment_method_details), // Payment method details
      JSON.stringify(res?.data?.object?.billing_details), // Billing details
      res?.data?.object?.currency // Currency
    ); */

    return NextResponse.json({ status: "sucess", event: event.type, response: res });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
