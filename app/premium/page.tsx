// TODO remove the use client directive in favor of a server component
"use client";

import DiscordLoginButton from "@/components/DiscordLoginButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { useIdToken } from "@/helpers/hooks";
import { getServer } from "@/lib/redis";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { Suspense, useState } from "react";
import { ServersListSkeleton } from "./_components";
import PlansComparison from "./_components/PlansComparison";
import CheckoutButton from "./_components/checkoutButton";
import {
  ApplePay,
  CheckIcon,
  CloseIcon,
  GooglePay,
  Link,
  MasterCard,
  PayPal,
  Stripe,
  StripeSquare,
  Visa,
} from "./_components/icons";
import { DiscordGuild, PricingData } from "./_types";

const pricingData: PricingData = {
  price: { monthly: 2.99, yearly: 29.99 },
  premium: {
    "All Freemium Features": true,
    "Unlimited Custom Questions": true,
    "Customized Webhook Branding": true,
    "No More Invite Button Ads": true,
    "Auto Pin Daily Messages": true,
  },
};

const data = [
  {
    criteria: "5 Gamemodes",
    free: true,
    premium: true,
  },
  {
    criteria: "Question of the Day",
    free: true,
    premium: true,
  },
  {
    criteria: "Thousands of Questions",
    free: true,
    premium: true,
  },
  {
    criteria: "Custom Questions",
    free: "Limited (100 per category)",
    premium: "Unlimited",
  },
  {
    criteria: "Custom Webhook Branding",
    free: false,
    premium: true,
  },
  {
    criteria: "Invite Button on Questions",
    free: true,
    premium: false,
  },
  {
    criteria: "Auto Pin Daily Messages",
    free: false,
    premium: true,
  },
];

export default function Premium() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [serversData, setServersData] = useState<DiscordGuild[]>([]);
  const [serverId, setServerId] = useState<string>();
  const idToken = useIdToken(null);

  const handleChange = () => {
    setIsMonthly(!isMonthly);
  };

  const fetchData = async () => {
    const servers = (await getServer()) as DiscordGuild[];
    setServersData(servers);
  };

  return (
    <>
      <Head>
        <title>Would You - Premium</title>
      </Head>
      <main className="relative mb-40 flex w-full justify-center">
        <div className="flex w-full max-w-8xl flex-col gap-52 px-8">
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="container mx-auto px-4">
                <h1 className="mt-36 text-4xl font-bold text-yellow-500 drop-shadow-gold-glow">
                  Premium
                </h1>
                <p className="text-customGrayText mb-6 mt-4 text-neutral-300">
                  Select the plan that suits your needs and benefit from our
                  discord bot.
                </p>
                <div className="mx-auto my-4 max-w-2xl text-center">
                  <label className="group relative mx-auto flex h-16 w-fit cursor-pointer items-center justify-between rounded-2xl bg-black/40 pl-6 pr-8 text-xl">
                    <input
                      type="checkbox"
                      className="peer appearance-none"
                      checked={!isMonthly}
                      onChange={handleChange}
                    />
                    <span className="after:bg-customPrimary absolute z-10 -ml-4 flex h-16 w-[6rem] cursor-pointer items-center duration-300 ease-in-out after:h-12 after:w-[20rem] after:rounded-lg after:bg-brand-customPrimary after:shadow-md after:duration-300 peer-checked:after:translate-x-[6rem]"></span>
                    <div className="z-20 flex gap-10 text-base font-bold text-white">
                      <div className={`${!isMonthly && "text-gray-400"}`}>
                        Monthly
                      </div>
                      <div className={`${isMonthly && "text-gray-400"}`}>
                        Yearly
                      </div>
                    </div>
                  </label>
                </div>
                <div className="mx-auto flex w-fit flex-col">
                  <div className="mb-4 w-auto rounded-[1.7rem] bg-gradient-premium p-[4px]">
                    <div className="relative overflow-hidden rounded-3xl bg-brand-customDarkBg3 px-8 py-8">
                      <span
                        className={`${!isMonthly ? "top-7" : "pointer-events-none -top-10 opacity-0"} text-mb absolute right-6 cursor-default rounded-xl bg-white/15 px-4 py-2 text-white transition-all duration-300`}
                      >
                        2 months free
                      </span>
                      <h4 className="font-heading mb-2 text-left text-2xl font-bold text-white 2xl:mb-4">
                        Premium
                      </h4>
                      <div className="flex items-end justify-start">
                        <div className="mr-2 mt-4 text-left text-4xl font-bold text-white sm:text-5xl">
                          {isMonthly
                            ? pricingData.price.monthly
                            : pricingData.price.yearly}
                        </div>
                        <div className="text-gray-400">
                          {isMonthly ? "/ month" : "/ year"}
                        </div>
                      </div>
                      <p className="mb-8 mt-1 text-left leading-loose text-gray-400">
                        Experience the full power of our Would You bot.
                      </p>
                      <ul className="mb-16 text-white">
                        {Object.keys(pricingData["premium"]).map(
                          (text, index) => (
                            <li className="mb-4 flex items-center" key={index}>
                              {pricingData["premium"][
                                text as keyof (typeof pricingData)["premium"]
                              ] ? (
                                <CheckIcon className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent text-brand-customPrimary" />
                              ) : (
                                <CloseIcon className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent text-[#7A7B7E]" />
                              )}
                              <span>{text}</span>
                            </li>
                          ),
                        )}
                      </ul>
                      <Dialog>
                        {idToken ? (
                          <DialogTrigger
                            onClick={() => {
                              fetchData();
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-2 font-bold leading-loose text-white transition hover:bg-green-600 focus:ring-0"
                          >
                            Continue with Stripe
                            <StripeSquare className="h-5 w-5" />
                          </DialogTrigger>
                        ) : (
                          <DiscordLoginButton
                            className="rounded-xl font-bold"
                            redirect="/premium"
                          />
                        )}
                        <DialogContent className="w-fit border-none bg-brand-customDarkBg3">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white">
                              <div>
                                Buy{" "}
                                <span className="text-brand-red-100">
                                  Would
                                </span>{" "}
                                <span className="text-brand-blue-100">You</span>
                                {isMonthly ? " Monthly" : " Yearly"}
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="w-full !rounded-2xl">
                            <Select
                              onValueChange={setServerId}
                              defaultValue={serverId ? serverId : ""}
                            >
                              <SelectTrigger className="w-[300px] sm:w-[400px]">
                                <SelectValue placeholder="Select a server to continue" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[40vh] max-w-[300px] sm:max-w-[400px]">
                                <Suspense fallback={<ServersListSkeleton />}>
                                  {serversData.map((server: DiscordGuild) => (
                                    <SelectItem
                                      key={server.id}
                                      value={server.id}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage
                                            src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`}
                                          />
                                          <AvatarFallback>
                                            <Image
                                              src="https://cdn.discordapp.com/embed/avatars/5.png"
                                              alt="avatar example"
                                              width={90}
                                              height={90}
                                            />
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="line-clamp-1 text-ellipsis">
                                          {server.name}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </Suspense>
                              </SelectContent>
                            </Select>
                            <CheckoutButton
                              monthly={String(isMonthly)}
                              priceId={
                                isMonthly
                                  ? process.env
                                      .NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID!
                                  : process.env
                                      .NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID!
                              }
                              serverId={serverId}
                            />
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Toaster />
                  <a
                    href="https://stripe.com/"
                    target="_blank"
                    className="flex flex-wrap justify-center gap-2 sm:gap-3"
                  >
                    <Stripe />
                    <ApplePay />
                    <GooglePay />
                    <MasterCard />
                    <Visa />
                    <PayPal />
                    <Link />
                  </a>
                </div>
              </div>
            </m.div>
          </LazyMotion>
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PlansComparison data={data} rowSeparator colSeparator />
            </m.div>
          </LazyMotion>
        </div>
      </main>
    </>
  );
}
