import { POST_PATH } from "@/utils/mdx"
import matter from "gray-matter"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { cache } from "react"

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
  async (
    slug: string
  ): Promise<{
    source: MDXRemoteSerializeResult
    frontMatter: FrontMatter
  }> => {
    const postFilePath = path.join(POST_PATH, `${slug}.mdx`)
    const source = await readFile(postFilePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, { scope: data })

    return {
      source: mdxSource,
      frontMatter: data as FrontMatter
    }
  }
)
