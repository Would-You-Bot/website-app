import { POST_PATH } from "@/utils/mdx";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import Link from "next/link";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { ProgressBar } from "@/app/blog/[slug]/_components/ProgressBar";
import { MainContent } from "@/app/blog/[slug]/_components/MainContent";
import { cache } from "react";
import { Metadata } from "next";

interface FrontMatter {
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

interface TableOfContentsProps {
  toc: string[];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  if (toc.length === 0) return null;
  return (
    <div className="flex max-w-full flex-col gap-1 xl:max-w-[200px] 2xl:max-w-[240px]">
      <p className="mb-1 font-semibold text-white">TABLE OF CONTENTS</p>
      <ol>
        {toc.map((x) => {
          return (
            <li key={x} className="mt-3">
              <p className="text-sm text-[#D4D4D4]">{x}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { frontMatter } = await _getPost(slug);

  return {
    title: frontMatter.title + "- Would You Bot",
    description: frontMatter.description,
    openGraph: {
      publishedTime: frontMatter.seoDate,
      type: "article",
      description: frontMatter.description,
      authors: frontMatter.author.name,
      tags: frontMatter.tags,
      images: frontMatter.thumbnail?.large,
    },
  };
}

const BlogPost = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { source, frontMatter } = await _getPost(slug);

  return (
    <>
      <ProgressBar />
      <div className="mt-36 px-8 text-neutral-300 xl:px-[17vw]">
        <Link
          href="/blog"
          className="text-neutral-300 transition-all hover:text-white"
        >
          <p className="mb-4">&larr; Back</p>
        </Link>
        {frontMatter.thumbnail?.banner && (
          <Image
            src={frontMatter.thumbnail.banner}
            alt={frontMatter.title + "- Would You Bot"}
            width={1000}
            height={200}
            className="mb-4 h-auto w-full rounded-lg"
          />
        )}
        <h1 className="text-4xl font-bold text-white">{frontMatter.title}</h1>
        <p className="mt-4">{frontMatter.description}</p>
        <div className="mt-4 flex items-center">
          <Image
            src={frontMatter.author.avatar}
            alt={frontMatter.author.name}
            width={30}
            height={30}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-4">
            <p className="text-neutral-300">{frontMatter.author.name}</p>
            <p className="text-sm text-neutral-400">{frontMatter.date}</p>
          </div>
        </div>
        <div className="my-4 flex flex-wrap gap-1 border-b border-b-neutral-500 pb-4">
          {frontMatter.tags.map((tag) => (
            <p
              key={tag}
              className="min-w-fit rounded-full border border-neutral-500 px-2 py-1 text-xs text-neutral-300"
            >
              {tag}
            </p>
          ))}
        </div>
        <div className="xl: relative left-0 top-0 mb-10 flex border-b border-neutral-500 pb-5 xl:fixed xl:left-4 xl:top-40 xl:border-b-0">
          <TableOfContents toc={frontMatter.toc || []} />
        </div>
      </div>

      <MainContent source={source} />
    </>
  );
};

export default BlogPost;

const _getPost = cache(
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
