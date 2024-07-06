"use client";

import Button from "@/components/Button";
import DailyMessageEmbed from "@/components/Embeds/DailyMessageEmbed";
import HigherLowerEmbed from "@/components/Embeds/HigherLowerEmbed";
import MainDiscordEmbed from "@/components/Embeds/MainDiscordEmbed";
import NeverHaveIEverEmbed from "@/components/Embeds/NeverHaveIEverEmbed";
import FeatureItem from "@/components/FeatureItem";
import ServerMarquee from "@/components/ServerMarquee";
import { getRandomQuestion } from "@/helpers/getRandomQuestion";
import { domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HomeContentProps {
  initialQuestion: string;
  serverCount: number;
  servers: any[];
}

export function HomeContent({
  initialQuestion,
  serverCount,
  servers,
}: HomeContentProps) {
  const currentDate = new Date().toLocaleString();
  const [replayedRounds, setReplayedRounds] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);

  const date = new Date();

  const threadName = `${[
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join("/")} - Daily Message`;

  const replay = () => {
    if (replayedRounds < 3) {
      setCurrentQuestion(getRandomQuestion());
      setReplayedRounds(replayedRounds + 1);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="mt-0 sm:mt-16 lg:mt-28 flex w-full max-w-8xl flex-col items-center justify-between gap-16 px-8 text-center lg:flex-row lg:text-left">
        <m.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center lg:block"
        >
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-bold leading-normal text-white mb-8">
            Entertain Your
            <br />
            <span className="text-brand-red-100 drop-shadow-red-glow">
              Discord
            </span>{" "}
            <span className="text-brand-blue-100 drop-shadow-blue-glow">
              Server
            </span>
          </h1>
          <p className="text-lg text-neutral-300">
            Play fun and entertaining games with Would You, featuring user polls
            and customization. Play Would You Rather, Truth or Dare, Never Have
            I Ever, Higher or Lower, and What Would You Do!{" "}
            <span className="hidden">tempus voicus</span>
          </p>
          <Link
            href="/invite"
            target="_blank"
            className="mt-8 flex w-fit justify-center"
          >
            <Button className="gap-2">
              Unleash the Fun
              <svg
                width="13"
                height="13"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 509 511.54"
              >
                <path
                  fillRule="nonzero"
                  fill="#fff"
                  d="M447.19 347.03c0-17.06 13.85-30.91 30.91-30.91 17.05 0 30.9 13.85 30.9 30.91v87.82c0 21.08-8.63 40.29-22.51 54.18-13.88 13.88-33.09 22.51-54.18 22.51H76.69c-21.09 0-40.3-8.63-54.18-22.51C8.63 475.14 0 455.93 0 434.85V76.69c0-21.09 8.63-40.3 22.51-54.18C36.39 8.63 55.6 0 76.69 0h86.98c17.06 0 30.9 13.85 30.9 30.9 0 17.06-13.84 30.91-30.9 30.91H76.69c-4.07 0-7.82 1.69-10.51 4.37-2.68 2.69-4.37 6.44-4.37 10.51v358.16c0 4.06 1.69 7.82 4.37 10.5 2.69 2.68 6.44 4.38 10.51 4.38h355.62c4.07 0 7.82-1.7 10.51-4.38 2.68-2.68 4.37-6.44 4.37-10.5v-87.82zm0-243.56L308.15 244.28c-11.91 12.12-31.45 12.28-43.56.37-12.11-11.91-12.28-31.45-.37-43.56L401.77 61.81H309.7c-17.06 0-30.9-13.85-30.9-30.91 0-17.05 13.84-30.9 30.9-30.9h168.4C495.15 0 509 13.85 509 30.9v165.04c0 17.06-13.85 30.9-30.9 30.9-17.06 0-30.91-13.84-30.91-30.9v-92.47z"
                />
              </svg>
            </Button>
          </Link>
        </m.div>
        <MainDiscordEmbed
          replayedRounds={replayedRounds}
          currentQuestion={currentQuestion}
          replay={replay}
        />
      </section>

      <section className="mt-36">
        <Image
          src="/LandingWave.svg"
          alt="Wave"
          draggable={false}
          width="10000"
          height="10000"
          priority
        />
        <div className="w-full bg-[#101010] px-8 pb-12 text-center text-xl sm:text-3xl md:text-4xl text-white md:-mt-20 md:pb-28">
          <h2>
            Trusted by{" "}
            <span className="bg-gradient-brand bg-clip-text font-bold text-transparent">
              {serverCount.toLocaleString()}+
            </span>{" "}
            communities
          </h2>
          <h3 className="mt-4 text-sm sm:text-xl md:text-2xl">
            keeping{" "}
            <span className="bg-gradient-brand bg-clip-text font-bold text-transparent">
              4,000,000+
            </span>{" "}
            users entertained
          </h3>

          <ServerMarquee
            servers={servers.slice(0, Math.ceil(servers.length / 2))}
            speed={40}
          />
          <ServerMarquee
            servers={servers.slice(Math.ceil(servers.length / 2))}
            speed={30}
            direction="right"
          />
        </div>
      </section>

      <section className="mt-20 flex w-full max-w-8xl flex-col items-center gap-20 px-8">
        <m.div
          initial={{ opacity: 0, transform: "translateY(15px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="bg-gradient-brand bg-clip-text text-6xl font-bold text-transparent">
            Features
          </h2>
          <h3 className="mt-4 text-center text-2xl text-white">
            What Does Would You Offer To Your Server?
          </h3>
        </m.div>

        <FeatureItem
          reverse
          right={<DailyMessageEmbed threadName={threadName} />}
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Increase user engagement
              </h4>
              <p className="mx-auto text-center text-lg text-neutral-300 md:text-left">
                Keep your community engaged and active with daily &quot;Would
                You Rather&quot; messages!
              </p>
            </>
          }
        />

        <FeatureItem
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Entertain your server
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
                Entertain your discord server with fun and interactive games
                like Would You Rather, Truth or Dare, Never Have I Ever, Higher
                or Lower, and What Would You Do!
              </p>
            </>
          }
          right={<HigherLowerEmbed currentDate={currentDate} />}
        />

        <FeatureItem
          reverse
          right={<NeverHaveIEverEmbed replayedRounds={0} />}
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Upgrade your server
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
                Upgrade your server with Would You, featuring a wide variety of
                games and customized questions.
              </p>
            </>
          }
        />
      </section>

      <section className="mt-36 w-full bg-[#101010] px-9 py-12">
        <m.h2
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="text-center text-5xl font-bold leading-normal text-white"
        >
          Keep Your Server Active with{" "}
          <span className="bg-gradient-brand bg-clip-text font-bold text-transparent">
            Would You
          </span>
        </m.h2>
        <m.h3
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="mt-4 text-center text-xl text-neutral-300"
        >
          Invite To Your Server Now!
        </m.h3>
        <m.div
          initial={{ opacity: 0, transform: "translateY(-20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="mt-8 flex justify-center"
        >
          <Link href="/invite" target="_blank">
            <Button>Invite</Button>
          </Link>
        </m.div>
      </section>
    </LazyMotion>
  );
}
