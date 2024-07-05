import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getIdToken } from "@/helpers/oauth";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
