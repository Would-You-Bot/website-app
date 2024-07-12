/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      allowedForwardedHosts: ["wouldyoubot.gg"],
      allowedOrigins: ["wouldyoubot.gg"]
    }
  },
  async redirects() {
    return [
      {
        source: "/vote",
        destination: "https://wumpus.store/bot/981649513427111957/vote",
        permanent: true
      },
      {
        source: "/support",
        destination: "https://discord.com/invite/vMyXAxEznS",
        permanent: true
      },
      {
        source: "/rivo",
        destination: "https://rivo.gg",
        permanent: true
      },
      {
        source: "/invite",
        destination:
          "https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands",
        permanent: true
      },
      {
        source: "/reddit",
        destination: "https://www.reddit.com/r/WouldYou/",
        permanent: true
      },
      {
        source: "/discord",
        destination: "/support",
        permanent: true
      },
      {
        source: "/imprint",
        destination: "/legal",
        permanent: true
      },
      {
        source: "/impressum",
        destination: "/legal-de",
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "cdn.wouldyoubot.gg",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

export default nextConfig
