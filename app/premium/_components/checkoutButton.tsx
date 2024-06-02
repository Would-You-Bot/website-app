"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

interface CheckoutButtonProps {
  monthly: string;
  serverId: string | undefined;
  priceId: string;
}

// sub button
export default function CheckoutButton({
  monthly,
  serverId,
  priceId,
}: CheckoutButtonProps) {
  const { toast } = useToast();
  const handleCheckout = async () => {
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
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
        serverId: serverId,
      }),
    });

    const data = await response.json();

    if (data?.action) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: data.message,
        action: (
          <ToastAction
            onClick={() => window.open("/api/subs/manage", "_blank")}
            altText="Manage"
          >
            Manage
          </ToastAction>
        ),
      });
      return;
    }

    if (
      data.status === 409 ||
      data.status === 422 ||
      data.status === 500 ||
      data.status === 401
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: data.message,
      });
      return;
    }

    const stripeSession = data as { id: string };
    console.log(stripeSession.id);
    await stripe?.redirectToCheckout({ sessionId: stripeSession.id });
  };

  return (
    <button
      disabled={!serverId}
      onClick={handleCheckout}
      className="ml-auto mt-4 flex w-fit justify-center rounded-lg bg-brand-blue-100 px-5 py-1 text-sm font-bold leading-loose text-white disabled:cursor-not-allowed disabled:bg-[#1D1D1D] disabled:text-[#444444]"
    >
      Checkout
    </button>
  );
}
