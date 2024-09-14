const { readdirSync } = require("fs");
const path = require("path");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:  'https://wouldyoubot.gg',
  generateRobotsTxt: true,
  exclude: ["/auth/*", "/api/*", "/blog/*"],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 1,
  output: "standalone",
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['imp']
      },
      {
        userAgent: 'Cliqzbot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
    ],
  },
  additionalPaths: async () =>
    readdirSync(path.join(process.cwd(), "posts"))
      .filter((path) => path.charAt(0) !== "_")
      .filter((path) => /\.mdx?$/.test(path))
      .map((path) => `/blog/${path.replace(/\.mdx?$/, "")}`),
}
