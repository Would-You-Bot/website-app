"use client";
import {
  m,
  useAnimationControls,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import { useIdToken } from "@/helpers/hooks/useIdToken";
import { IdTokenJWT } from "@/helpers/oauth/types";
import DiscordLoginButton from "@/components/DiscordLoginButton";
import UserDropdown from "./UserDropdown";
import { LayoutDashboardIcon } from "lucide-react";

interface NavbarProps {
  idToken: IdTokenJWT | null;
}

const menuItems = [
  { label: "Manage Subscription", href: "/api/subs/manage", icon: LayoutDashboardIcon },
];

const Navbar = ({ idToken: idToken_ }: NavbarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const idToken = useIdToken(idToken_);
  const lineOneControls = useAnimationControls();
  const lineTwoControls = useAnimationControls();
  const lineThreeControls = useAnimationControls();
  const menuControls = useAnimationControls();

  const toggleMobileMenu = () => {
    if (mobileMenu) {
      lineOneControls.start(
        { rotate: "0deg" },
        { duration: 0.3, type: "spring" }
      );
      lineTwoControls.start(
        { opacity: 1, transform: "translateX(0)" },
        { duration: 0.12 }
      );
      lineThreeControls.start(
        { rotate: "0deg" },
        { duration: 0.3, type: "spring" }
      );
      menuControls.start(
        { opacity: 0.5, left: "100vw", pointerEvents: "none" },
        { duration: 0.21, type: "spring" }
      );

      setMobileMenu(false);
    } else {
      lineOneControls.start(
        { rotate: "45deg" },
        { duration: 0.3, type: "spring" }
      );
      lineTwoControls.start(
        { opacity: 0, transform: "translateX(1)" },
        { duration: 0.12 }
      );
      lineThreeControls.start(
        { rotate: "-45deg" },
        { duration: 0.3, type: "spring" }
      );
      menuControls.start(
        { opacity: 1, left: "0", pointerEvents: "all" },
        { duration: 0.21, type: "spring" }
      );

      setMobileMenu(true);
    }
  };

  return (
    <nav className="fixed left-0 top-0 z-50 mb-28 flex h-auto py-6 w-full justify-center items-center">
      <div className="flex items-center justify-between h-full w-full max-w-8xl px-8">
        <div className="flex items-center justify-center backdrop-blur bg-[#202020] bg-opacity-90 border-2 border-white/5 rounded-[10px] h-16 px-6">
          <Link href="/" className="flex items-center gap-6">
            <Image
              src="/Logo.svg"
              className="rounded-full"
              alt="Would You Logo"
              width="30"
              height="30"
              priority
            />
            <p className="text-xl font-bold text-white">Would You</p>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 backdrop-blur bg-[#202020] bg-opacity-90 border-2 border-white/5 rounded-[10px] h-16 px-10">
          <div className="flex w-max gap-6">
            <Link
              href="/commands"
              className="text-lg text-neutral-300 transition-all hover:text-neutral-100"
            >
              Commands
            </Link>
            <Link
              href="/blog"
              className="text-lg text-neutral-300 transition-all hover:text-neutral-100"
            >
              Blog
            </Link>
            <Link
              href="/vote"
              target="_blank"
              className="text-lg text-neutral-300 transition-all hover:text-neutral-100"
            >
              Vote
            </Link>
            <Link
              href="/premium"
              className="text-lg text-yellow-300 transition-all hover:text-yellow-200"
            >
              Premium
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center h-16">
          {idToken ? (
            <UserDropdown idToken={idToken} items={menuItems} />
          ) : (
            <DiscordLoginButton className="rounded-[10px] h-16 px-6" />
          )}
        </div>
      </div>
    </nav>
    // <nav className="fixed left-0 top-0 z-50 mb-28 flex h-[80px] w-full justify-center items-center border-b border-b-neutral-800 bg-neutral-900 bg-opacity-90 backdrop-blur-sm">
    //   <div className="flex items-center justify-between w-full h-full max-w-8xl px-8">
    //     <div className="flex items-center">
    //       <div className="ml-16 hidden items-center md:flex">
    //         <Link
    //           href="/question-packs"
    //           className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
    //         >
    //           Packs
    //         </Link>
    //         <Link
    //           href="/commands"
    //           className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
    //         >
    //           Commands
    //         </Link>
    //         <Link
    //           href="/blog"
    //           className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
    //         >
    //           Blog
    //         </Link>
    //         <Link
    //           href="/vote"
    //           target="_blank"
    //           className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
    //         >
    //           Vote
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="z-50 flex gap-2 items-center">
    //       {idToken ? (
    //         <UserDropdown idToken={idToken} items={menuItems} />
    //       ) : (
    //         <>
    //           <Link href="/invite" target="_blank" className="hidden md:block">
    //             <Button className="">Invite</Button>
    //           </Link>
    //           <DiscordLoginButton className="rounded-lg" />
    //         </>
    //       )}
    //       <div
    //         className="relative ml-6 flex h-6 w-8 flex-col items-center justify-between md:hidden"
    //         onClick={() => toggleMobileMenu()}
    //       >
    //         <LazyMotion features={domAnimation}>
    //           <m.span
    //             className="h-[3px] w-[30px] origin-left rounded-full bg-neutral-300"
    //             initial={{ rotate: "0deg" }}
    //             animate={lineOneControls}
    //           />
    //           <m.span
    //             className="menu-line line-1 h-[3px] w-[30px] rounded-full bg-neutral-300"
    //             initial={{ opacity: 1 }}
    //             animate={lineTwoControls}
    //           />
    //           <m.span
    //             className="menu-line line-1 h-[3px] w-[30px] origin-left rounded-full bg-neutral-300"
    //             initial={{ rotate: "0deg" }}
    //             animate={lineThreeControls}
    //           />
    //         </LazyMotion>
    //       </div>
    //     </div>
    //     <LazyMotion features={domAnimation}>
    //       <m.div
    //         className="fixed left-0 top-0 z-40 h-[100vh] w-[100vw] bg-neutral-900"
    //         transition={{ duration: 0.21, type: "easeInOut" }}
    //         initial={{ opacity: 0.5, left: "100vw", pointerEvents: "none" }}
    //         animate={menuControls}
    //       >
    //         <div className="absolute top-36 flex w-full flex-col items-center">
    //           <Link
    //             href="/"
    //             className="mt-8 text-center text-3xl text-white"
    //             onClick={() => toggleMobileMenu()}
    //           >
    //             Home
    //           </Link>
    //           <Link
    //             href="/question-packs"
    //             className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
    //           >
    //             Packs
    //           </Link>
    //           <Link
    //             href="/commands"
    //             className="mt-8 text-center text-3xl text-white"
    //             onClick={() => toggleMobileMenu()}
    //           >
    //             Commands
    //           </Link>
    //           <Link
    //             href="/blog"
    //             className="mt-8 text-center text-3xl text-white"
    //             onClick={() => toggleMobileMenu()}
    //           >
    //             Blog
    //           </Link>
    //           <Link
    //             href="/vote"
    //             target="_blank"
    //             className="mt-8 text-center text-3xl text-white"
    //             onClick={() => toggleMobileMenu()}
    //           >
    //             Vote
    //           </Link>
    //           <Link
    //             href="/invite"
    //             target="_blank"
    //             className="mt-8 text-center text-2xl"
    //           >
    //             <Button>Invite</Button>
    //           </Link>
    //           {idToken ? (
    //             <a href="/logout" className="mt-8 text-center text-2xl">
    //               <Button>Logout</Button>
    //             </a>
    //           ) : (
    //             <a href="/login" className="mt-8 text-center text-2xl">
    //               <Button>Login with Discord</Button>
    //             </a>
    //           )}
    //         </div>
    //       </m.div>
    //     </LazyMotion>
    //   </div>
    // </nav>
  );
};

export default Navbar;
