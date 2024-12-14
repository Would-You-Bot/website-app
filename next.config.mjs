/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['wouldyoubot.gg'],
      allowedOrigins: ['wouldyoubot.gg']
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', 
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://top.gg https://bottom.gg;", // Allow only your site and top.gg to frame your site
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Fallback for older browsers
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/support',
        destination: 'https://discord.com/invite/vMyXAxEznS',
        permanent: true
      },
      {
        source: '/rivo',
        destination: 'https://rivo.gg',
        permanent: true
      },
      {
        source: '/invite',
        destination:
          'https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands',
        permanent: true
      },
      {
        source: '/reddit',
        destination: 'https://www.reddit.com/r/WouldYou/',
        permanent: true
      },
      {
        source: '/discord',
        destination: '/support',
        permanent: true
      },
      {
        source: '/imprint',
        destination: '/legal',
        permanent: true
      },
      {
        source: '/impressum',
        destination: '/legal-de',
        permanent: true
      },
      {
        source: '/manage/subscription',
        destination: '/api/subs/manage',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.wouldyoubot.gg',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
