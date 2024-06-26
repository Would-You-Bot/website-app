import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import React from "react";
import Navbar from "@/components/Navbar";
import { getIdToken } from "@/helpers/oauth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Would You - The Discord Bot",
  description: "Generated by create next app",
};

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
