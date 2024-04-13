import { cache } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "node:path";
import { POST_PATH } from "@/utils/mdx";
import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export interface FrontMatter {
  title: string;
  description: string;
  date: string;
  seoDate: string;
  thumbnail?: {
    large?: string;
    banner?: string;
    alt?: string;
  };
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  pinned?: boolean;
  toc?: string[];
}

export const getPost = cache(
  async (
    slug: string,
  ): Promise<{
    source: MDXRemoteSerializeResult;
    frontMatter: FrontMatter;
  }> => {
    const postFilePath = path.join(POST_PATH, `${slug}.mdx`);
    const source = await readFile(postFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, { scope: data });

    return {
      source: mdxSource,
      frontMatter: data as FrontMatter,
    };
  },
);
