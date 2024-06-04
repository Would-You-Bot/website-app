import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getIdToken } from "@/helpers/oauth";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Would You - The Discord Bot",
  description: "Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
  robots: "index, follow",
  metadataBase: new URL("https://wouldyoubot.gg"),
  openGraph: {
    title: "Would You - The Discord Bot",
    description: "Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
    type: "website",
    url: "https://wouldyoubot.gg",
    images: "https://i.imgur.com/BsWSxze.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "https://i.imgur.com/BsWSxze.png",
    title: "Would You - The Discord Bot",
    description: "Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
    site: "@WouldYouBot",    
  },
};

export const viewport: Viewport = {
  themeColor: "#0598F6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idToken = getIdToken();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar idToken={idToken} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
