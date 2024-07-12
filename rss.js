import fs from "fs"
import RSS from "rss"
import matter from "matter"
import path from "path"

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

const blogPostsDir = path.join(__dirname, "posts")
const POST_PATHS = getFilesRecursively(blogPostsDir, "_")

const POSTS = POST_PATHS.map((filePath) => {
  const source = fs.readFileSync(filePath, "utf8")
  const { data } = matter(source)
  return {
    filePath,
    data
  }
})

// Generate RSS feed
const feed = new RSS({
  title: "Would You Bot RSS Feed",
  site_url: "https://wouldyoubot.gg",
  feed_url: "https://wouldyoubot.gg/rss.xml"
})

POSTS.forEach((post) => {
  feed.item({
    title: post.data.title,
    description: post.data.description,
    url: `https://wouldyoubot.gg/blog/${path.basename(post.filePath, ".mdx")}`,
    date: new Date(post.data.seoDate)
  })
})

const rss = feed.xml({ indent: true })

// Write RSS feed to file
fs.writeFileSync(path.join(__dirname, "public", "rss.xml"), rss)
