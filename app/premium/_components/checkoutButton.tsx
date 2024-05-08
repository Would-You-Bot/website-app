"use client";
import { loadStripe } from "@stripe/stripe-js";

// sub button
export default function CheckoutButton({
  priceId,
  tier,
  userId,
  serverId,
}: {
  priceId: string;
  tier: string;
  userId: string;
  serverId: string;
}) {
  const handleCheckout = async () => {
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const stripe = await stripePromise;

    const response = await fetch("/api/subs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // we will use all of these in our webhooks
        priceId: "priceId",
        tier: tier,
        userId: userId,
        serverId: serverId,
      }),
    });

    const stripeSession = (await response.json()) as { id: string };
    await stripe?.redirectToCheckout({ sessionId: stripeSession.id });
  };

  return (
    <button
      disabled={!serverId}
      onClick={handleCheckout}
      className="flex mt-4 ml-auto w-fit justify-center rounded-lg px-5 py-1 font-bold text-sm leading-loose bg-brand-blue-100 text-white disabled:bg-neutral-500"
    >
      Checkout
    </button>
  );
}
