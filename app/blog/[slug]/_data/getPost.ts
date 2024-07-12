import { POST_PATH } from "@/utils/mdx"
import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import { mdxComponents } from "@/app/blog/[slug]/_data/mdxComponents"

export interface FrontMatter {
  title: string
  description: string
  date: string
  seoDate: string
  thumbnail?: {
    large?: string
    banner?: string
    alt?: string
  }
  author: {
    name: string
    avatar: string
  }
  tags: string[]
  pinned?: boolean
  toc?: string[]
}

export const getPost = cache(
  async (slug: string): Promise<CompileMDXResult<FrontMatter>> => {
    const postFilePath = path.join(POST_PATH, `${slug}.mdx`)
    const source = await readFile(postFilePath)

    return await compileMDX({
      source: source,
      components: mdxComponents,
      options: {
        parseFrontmatter: true
      }
    })
  }
)
