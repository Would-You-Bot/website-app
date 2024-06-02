"use client";

import Button from "@/components/Button";
import blogStyles from "@/styles/blog.module.css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {
  Button: Button,
  a: CustomLink,
};

function CustomLink(props: any) {
  return <a {...props} target="_blank" />;
}

interface MainContentProps {
  source: MDXRemoteSerializeResult;
}

export function MainContent({ source }: MainContentProps) {
  return (
    <main
      className={`markdown w-full max-w-8xl px-8 text-neutral-300 ${blogStyles.markdown}`}
    >
      <MDXRemote {...source} components={components} />
    </main>
  );
}
