"use client";
import DiscordLoginButton from "@/components/DiscordLoginButton";
import { useIdToken } from "@/helpers/hooks/useIdToken";
import { IdTokenJWT } from "@/helpers/oauth/types";
import { Crown } from "@/icons/Crown";
import { useAnimationControls } from "framer-motion";
import { LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserDropdown from "./UserDropdown";

interface NavbarProps {
  idToken: IdTokenJWT | null;
}

const menuItems = [
  {
    label: "Manage Subscription",
    href: "/api/subs/manage",
    icon: LayoutDashboardIcon,
  },
];

const Navbar = ({ idToken: idToken_ }: NavbarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const idToken = useIdToken(idToken_);
  const lineOneControls = useAnimationControls();
  const lineTwoControls = useAnimationControls();
  const lineThreeControls = useAnimationControls();
  const menuControls = useAnimationControls();

  const handleIsOpen = () => {
    if (window.innerWidth < 768) setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky left-0 top-[1px] z-50 mb-8 flex h-auto w-full items-center justify-center py-6">
      <div className="flex h-full w-full max-w-8xl items-center justify-between px-8 transition-all duration-300">
        <div className="flex h-16 min-w-fit items-center justify-center rounded-[10px] border-2 border-white/5 bg-[#202020] bg-opacity-90 px-6 backdrop-blur">
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
        <div
          className={`absolute flex items-center justify-center gap-6 rounded-[10px] border-2 border-white/5 bg-[#202020] bg-opacity-90 backdrop-blur md:static ${isOpen ? "right-0 top-0 z-10 h-screen w-screen rounded-none" : "right-7 top-6 h-16 w-16 md:w-min"} transition-all duration-300`}
        >
          <div className="hidden w-max gap-6 px-10 md:flex">
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
              className="flex items-center gap-2 text-lg text-yellow-500 drop-shadow-gold-glow transition-all hover:text-yellow-300"
            >
              Premium
              <Crown />
            </Link>
          </div>
          <button
            className={`absolute right-[1.05rem] top-[1.35rem] z-50 flex flex-col gap-[5px] md:hidden`}
            onClick={handleIsOpen}
          >
            <div
              className={`h-[2px] w-[25px] rounded-[10px] bg-white ${isOpen ? "translate-y-[7px] rotate-45" : ""} transition-all duration-300`}
            />
            <div
              className={`h-[2px] w-[25px] rounded-[10px] bg-white ${isOpen ? "opacity-0" : ""} transition-all`}
            />
            <div
              className={`h-[2px] w-[25px] rounded-[10px] bg-white ${isOpen ? "-translate-y-[7px] -rotate-45" : ""} transition-all duration-300`}
            />
          </button>
          <div
            className={`mb-auto flex h-full w-full flex-col items-center justify-center gap-8 p-4 text-white md:hidden ${isOpen ? "pointer-events-auto opacity-100 transition-all delay-150 duration-300" : "pointer-events-none opacity-0"}`}
          >
            <Link
              href="/commands"
              onClick={handleIsOpen}
              className="text-2xl text-neutral-300 transition-all hover:text-neutral-100"
            >
              Commands
            </Link>
            <Link
              href="/blog"
              onClick={handleIsOpen}
              className="text-2xl text-neutral-300 transition-all hover:text-neutral-100"
            >
              Blog
            </Link>
            <Link
              href="/vote"
              target="_blank"
              onClick={handleIsOpen}
              className="text-2xl text-neutral-300 transition-all hover:text-neutral-100"
            >
              Vote
            </Link>
            <Link
              href="/premium"
              onClick={handleIsOpen}
              className="flex items-center gap-2 text-2xl text-yellow-500 drop-shadow-gold-glow transition-all hover:text-yellow-300"
            >
              Premium
              <Crown />
            </Link>
            {idToken ? (
              <UserDropdown idToken={idToken} items={menuItems} />
            ) : (
              <DiscordLoginButton className="h-16 rounded-[10px] px-6" />
            )}
          </div>
        </div>
        <div className="hidden h-16 min-w-fit items-center justify-center md:flex">
          {idToken ? (
            <UserDropdown idToken={idToken} items={menuItems} />
          ) : (
            <DiscordLoginButton className="h-16 rounded-[10px] px-6" />
          )}
        </div>
      </div>
    </nav>
    // <nav className="fixed left-0 top-0 z-50 mb-28 flex h-[80px] w-full justify-center items-center border-b border-b-neutral-800 bg-neutral-900 bg-opacity-80 backdrop-blur-sm">
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
