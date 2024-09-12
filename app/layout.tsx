import { getIdToken } from '@/helpers/oauth'
import { ThemeProvider } from 'next-themes'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import Alert from '@/components/Alert'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const idToken = getIdToken()

  return (
    <html lang="en">
      <script
        defer
        data-domain="wouldyoubot.gg"
        src="https://stats.wouldyoubot.gg/js/script.js"
      ></script>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Alert
            href="/premium"
            className="bg-brand-customPrimary text-white"
            active
          >
            <b>Would You Bot</b> • Upgrade your server with Premium
          </Alert>
          <div className="w-full relative min-h-dvh flex flex-col">
            <Navbar idToken={idToken} />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
