// TODO: Fix this and possibly use next-sitemap instead
// https://www.npmjs.com/package/next-sitemap

const fs = require("fs")
const path = require("path")

function getFilesRecursively(dir, excludePrefix = "_") {
  let files = []
  const entries = fs.readdirSync(dir)

  for (const entry of entries) {
    const entryPath = path.join(dir, entry)
    const isDirectory = fs.statSync(entryPath).isDirectory()

    if (isDirectory) {
      files = [...files, ...getFilesRecursively(entryPath, excludePrefix)]
    } else if (!entry.startsWith(excludePrefix)) {
      files.push(entryPath)
    }
  }

  return files
}

function generateSitemap(entries, baseUrl) {
  const sitemapHeader =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n'
  const sitemapFooter = "</urlset>"

  const mainWebsite = `<url><loc>${baseUrl}</loc><priority>1.0</priority></url>\n`

  const sitemapBody = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""
      const priority =
        entry.priority ? `<priority>${entry.priority}</priority>` : ""
      const changefreq =
        entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ""

      return `<url><loc>${baseUrl}${entry.url.replace(/\\/g, "/")}/</loc>${lastmod}${priority}${changefreq}</url>`
    })
    .join("\n")

  return sitemapHeader + mainWebsite + sitemapBody + sitemapFooter
}

function main() {
  const baseUrl = "https://wouldyoubot.gg"
  const blogPostsDir = path.join(__dirname, "posts")
  const appDir = path.join(__dirname, "app")

  const blogEntries = getFilesRecursively(blogPostsDir, "_", [
    ".mdx",
    ".tsx"
  ]).map((file) => ({
    url: `/blog${file.replace(blogPostsDir, "").replace(/\.mdx|\.tsx$/, "")}`,
    lastmod: fs.statSync(file).mtime.toISOString(),
    priority: 0.7,
    changefreq: "monthly"
  }))

  const pageEntries = getFilesRecursively(appDir, "_", [".mdx", ".tsx"]).map(
    (file) => ({
      url: file
        .replace(appDir, "")
        .replace(/\.mdx|\.tsx$/, "")
        .replace("https://wouldyoubot.gg/index/", ""),
      lastmod: fs.statSync(file).mtime.toISOString(),
      priority: 1.0,
      changefreq: "weekly"
    })
  )

  const allEntries = [...blogEntries, ...pageEntries]

  const excludedEntries = allEntries.filter((entry) => {
    return (shouldExclude = !(
      entry.url.replace(/\\/g, "/") === "/blog/index" ||
      entry.url.replace(/\\/g, "/") === "/index" ||
      entry.url.includes("[slug]")
    ))
  })

  const sitemapContent = generateSitemap(excludedEntries, baseUrl)

  const sitemapFilePath = path.join(__dirname, "public/sitemap.xml")

  fs.writeFileSync(sitemapFilePath, sitemapContent)
}

main()
