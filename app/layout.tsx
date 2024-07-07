import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getIdToken } from "@/helpers/oauth";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Alert from "@/components/Alert";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idToken = getIdToken();

  return (
    <html lang="en">
      <script
        defer
        data-domain="wouldyoubot.gg"
        src="https://stats.wouldyoubot.gg/js/script.js"
      ></script>
      <body className={inter.className}>
        <Link href="/premium" className="w-full">
          <Alert active className="bg-brand-customPrimary text-white">
            <b>Would You Bot</b> • Use code <code className="bg-foreground/15 px-1 rounded border border-foreground/5">release15</code> to get a 15% discount on your premium subscription
          </Alert>
        </Link>
        <div className="w-full relative">
          <Navbar idToken={idToken} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
