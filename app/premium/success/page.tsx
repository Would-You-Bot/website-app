// TODO remove the use client directive in favor of a server component
"use client";
import Button from "@/components/Button";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

// To test the searchParams use https://obscure-umbrella-p9994pv5xr4c7pvw-3000.app.github.dev//premium/success?type=monthly&server=942897714956472401

// TODO: Add confetti animation on page and button click!
export default function Premium() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const serverId = searchParams.get("server");

  return (
    <>
      <Head>
        <title>Would You - Commands</title>
      </Head>
      <main className="flex flex-col flex-1 items-center justify-center gap-8 px-8 text-neutral-300">
        <h1 className="mt-36 text-6xl font-bold text-brand-blue-100 text-center drop-shadow-blue-glow">
          Payment Successful!
        </h1>
        <p className="mb-4 text-lg text-white">
          Your payment for Would You Premium billed{" "}
          <b>{type === "monthly" ? "monthly" : "annually"}</b> was successful!
        </p>
        {
          // TODO: Add space between the premium text
        }
        <Button
          className="w-fit"
          onClick={() =>
            window.open(`https://discord.com/channels/${serverId}/`, "_blank")
          }
        >
          <span>
            Click to visit your new <b>Premium</b> server
          </span>
        </Button>
      </main>
    </>
  );
}
