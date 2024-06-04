import {
  MainContent,
  ProgressBar,
  TableOfContents,
} from "@/app/blog/[slug]/_components";
import { getPost } from "@/app/blog/[slug]/_data";
import { postPaths } from "@/utils/mdx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { frontMatter } = await getPost(slug);
  const title = frontMatter.title + "- Would You Bot";

  return {
    title,
    description: frontMatter.description,
    metadataBase: new URL("https://wouldyoubot.gg/blog/"),
    openGraph: {
      title,
      publishedTime: frontMatter.seoDate,
      type: "article",
      description: frontMatter.description,
      authors: frontMatter.author.name,
      tags: frontMatter.tags,
      images: frontMatter.thumbnail?.large,
    },
  };
}

export function generateStaticParams() {
  return postPaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ slug }));
}

const BlogPost = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { source, frontMatter } = await getPost(slug);

  return (
    <>
      <ProgressBar />
      <div className="mt-36 w-full max-w-8xl px-8 text-neutral-300">
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
          <TableOfContents toc={frontMatter.toc ?? []} />
        </div>
      </div>

      <MainContent source={source} />
    </>
  );
};

export default BlogPost;
