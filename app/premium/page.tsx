// TODO remove the use client directive in favor of a server component
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Button from "@/components/Button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthTokenOrNull } from "@/helpers/oauth/helpers";
import testServers from "@/helpers/testServers";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CheckArrowIcon = () => (
  <div className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-brand-customPrimary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.383 4.117a1.252 1.252 0 0 1 0 1.77l-10 10a1.252 1.252 0 0 1-1.77 0l-5-5a1.252 1.252 0 0 1 1.77-1.77L7.5 13.23l9.117-9.113a1.252 1.252 0 0 1 1.77 0h-.004Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

const XIcon = () => (
  <div className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="text-[#5A5B5E]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.313 1 9.749 7.563 3.187 1 1 3.188 7.562 9.75 1 16.313 3.187 18.5l6.562-6.563 6.564 6.563 2.187-2.188-6.562-6.562L18.5 3.187 16.313 1Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

type PricingData = {
  price: { monthly: number; yearly: number };
  premium: {
    "All Freemium Features": boolean;
    "Unlimited Custom Questions": boolean;
    "Customized Webhook Branding": boolean;
    "No More Invite Button Ads": boolean;
    "Auto Pin Daily Messages": boolean;
  };
};
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
  const [serversData, setServersData] = useState<string[]>([]);

  const fetchData = async () => {
    if (serversData.length > 0) return;
    try {
      const servers = await testServers();
      setServersData(servers);
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
  };

  function getInitials(serverName) {
    const words = serverName.split(' ');
    const initials = words.map(word => word[0]).join('');
    return initials.length > 1 ? initials.slice(0, 2) : initials[0];
  }

  const handleChange = () => {
    setIsMonthly(!isMonthly);
  };

  console.log(serversData);

  return (
    <>
      <Head>
        <title>Would You - Commands</title>
      </Head>
      <main className="relative flex w-full justify-center mb-40">
        <div className="w-full max-w-7xl px-8">
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
                      <div
                        className={`${!isMonthly && 'text-gray-400'}`}
                      >
                        Monthly
                      </div>
                      <div className={`${!isMonthly && 'text-gray-400'}`}>
                        Yearly
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex justify-center">
                  <div className="mb-8 w-fit rounded-[1.7rem] bg-gradient-premium p-[4px] lg:mb-0">
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
                      <Dialog>
                        <DialogTrigger onClick={() => { fetchData()}}className="mt-20 w-full justify-center rounded-xl rounded-t-xl py-2 font-bold leading-loose bg-brand-blue-100 text-white">
                          Get Started
                        </DialogTrigger>
                        <DialogContent className="bg-brand-customDarkBg3 border-none">
                          <DialogHeader>
                            <DialogTitle className="text-white font-bold text-xl">
                              <div>Buy <span className="text-brand-red-100">Would</span> <span className="text-brand-blue-100">You</span> Monthly/Yearly</div>
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="w-full">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a server to continue" />
                              </SelectTrigger>
                              <SelectContent>
                                {serversData.map(server => (
                                  <SelectItem key={server.id} value={server.id}>
                                    <div className="flex gap-2 items-center">
                                      <Avatar className="h-6 w-6">
                                         <AvatarImage src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`} /> 
                                        <AvatarFallback><img src="https://cdn.discordapp.com/embed/avatars/5.png" alt="avatar example" /></AvatarFallback>
                                      </Avatar>
                                      <span>{server.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <button
                              className="flex mt-4 ml-auto w-fit justify-center rounded-lg px-5 py-1 font-bold text-sm leading-loose bg-brand-blue-100 text-white"
                              // onClick={() => { testServers()}}
                            >
                              Purchase
                            </button>
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </LazyMotion>
        </div>
      </main>
    </>
  );
}