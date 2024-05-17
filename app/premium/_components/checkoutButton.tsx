"use client";
import { loadStripe } from "@stripe/stripe-js";

// sub button
export default function CheckoutButton({
  monthly,
  userId,
  serverId,
  priceId,
}: {
  monthly: string;
  userId: string;
  serverId: string | undefined;
  priceId: string;
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
        priceId: priceId,
        monthly: monthly,
        userId: userId,
        serverId: serverId,
      }),
    });

    const stripeSession = (await response.json()) as { id: string };
    console.log(stripeSession.id);
    await stripe?.redirectToCheckout({ sessionId: stripeSession.id });
  };

  return (
    <button
      disabled={!serverId}
      onClick={handleCheckout}
      className="flex mt-4 ml-auto w-fit justify-center rounded-lg px-5 py-1 font-bold text-sm leading-loose bg-brand-blue-100 text-white disabled:bg-[#1D1D1D] disabled:text-[#444444] disabled:cursor-not-allowed"
    >
      Checkout
    </button>
  );
}
