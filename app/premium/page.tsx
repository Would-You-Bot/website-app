// TODO remove the use client directive in favor of a server component
"use client";

import { Suspense, useState } from "react";
import Head from "next/head";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { getServer } from "@/lib/redis";
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
import { ServersListSkeleton } from "./_components";
import { PricingData, DiscordGuild } from "./_types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import CheckoutButton from "./_components/checkoutButton";
import { useIdToken } from "@/helpers/hooks";
import {
  ApplePay,
  CheckArrowIcon,
  GooglePay,
  Link,
  MasterCard,
  PayPal,
  Stripe,
  StripeSquare,
  Visa,
  XIcon,
} from "./_components/icons";
import DiscordLoginButton from "@/components/DiscordLoginButton";
import { Toaster } from "@/components/ui/toaster";

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
    console.log(servers, "servers");
    setServersData(servers);
  };

  return (
    <>
      <Head>
        <title>Would You - Premium</title>
      </Head>
      <main className="relative flex w-full justify-center mb-40">
        <div className="w-full max-w-8xl px-8">
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
                <p className="mb-6 text-customGrayText text-neutral-300 mt-4">
                  Select the plan that suits your needs and benefit from our
                  discord bot.
                </p>
                <div className="mx-auto max-w-2xl text-center my-4">
                  <label className="bg-black/40 group relative mx-auto flex h-16 w-fit cursor-pointer items-center justify-between rounded-2xl text-xl pl-6 pr-8">
                    <input
                      type="checkbox"
                      className="peer appearance-none"
                      checked={!isMonthly}
                      onChange={handleChange}
                    />
                    <span className="absolute -ml-4 flex h-16 w-[6rem] cursor-pointer items-center duration-300 ease-in-out after:h-12 after:w-[20rem] after:rounded-lg after:bg-customPrimary after:shadow-md after:duration-300 peer-checked:after:translate-x-[6rem] after:bg-brand-customPrimary z-10"></span>
                    <div className="flex text-base gap-10 font-bold text-white z-20">
                      <div className={`${!isMonthly && "text-gray-400"}`}>
                        Monthly
                      </div>
                      <div className={`${isMonthly && "text-gray-400"}`}>
                        Yearly
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex flex-col w-fit mx-auto">
                  <div className="w-auto rounded-[1.7rem] bg-gradient-premium p-[4px] mb-4">
                    <div className="rounded-3xl bg-brand-customDarkBg3 px-8 py-8 ">
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
                      <p className="mb-8 mt-8 text-left leading-loose text-gray-400 2xl:mb-12">
                        Experience the full power of our Would You bot.
                      </p>
                      <ul className="mb-14 text-white">
                        {Object.keys(pricingData["premium"]).map(
                          (text, index) => (
                            <li
                              className="mb-4 flex items-center"
                              key={`${text}-${index}`}
                            >
                              {pricingData["premium"][
                                text as keyof (typeof pricingData)["premium"]
                              ] ? (
                                <CheckArrowIcon />
                              ) : (
                                <XIcon />
                              )}
                              <span>{text}</span>
                            </li>
                          )
                        )}
                      </ul>
                      <Dialog
                        onOpenChange={() => {
                          setServerId("");
                        }}
                      >
                        {idToken ? (
                          <DialogTrigger
                            onClick={() => {
                              fetchData();
                            }}
                            className="mt-20 text-white focus:ring-0 flex w-full justify-center items-center gap-2 rounded-xl py-2 font-bold leading-loose bg-green-500"
                          >
                            Continue with Stripe
                            <StripeSquare className="w-5 h-5" />
                          </DialogTrigger>
                        ) : (
                          <DiscordLoginButton className="font-bold rounded-xl" redirect="/premium" />
                        )}
                        <DialogContent className="bg-brand-customDarkBg3 border-none">
                          <DialogHeader>
                            <DialogTitle className="text-white font-bold text-xl">
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
                          <DialogDescription className="w-full">
                            <Select onValueChange={setServerId}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a server to continue" />
                              </SelectTrigger>
                              <SelectContent>
                                <Suspense fallback={<ServersListSkeleton />}>
                                  {serversData.map((server: DiscordGuild) => (
                                    <SelectItem
                                      key={server.id}
                                      value={server.id}
                                    >
                                      <div className="flex gap-2 items-center">
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
                                        <span>{server.name}</span>
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
                              userId="347077478726238228"
                              serverId={serverId}
                            />
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Toaster />
                  <a href="" className="">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                      <Stripe />
                      <ApplePay />
                      <GooglePay />
                      <MasterCard />
                      <Visa />
                      <PayPal />
                      <Link />
                    </div>
                  </a>
                </div>
              </div>
            </m.div>
          </LazyMotion>
        </div>
      </main>
    </>
  );
}
