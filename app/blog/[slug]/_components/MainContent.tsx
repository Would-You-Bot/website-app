"use client";

import blogStyles from "@/styles/blog.module.css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Button from "@/components/Button";

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
      className={`markdown px-8 text-neutral-300 max-w-7xl w-full ${blogStyles.markdown}`}
    >
      <MDXRemote {...source} components={components} />
    </main>
  );
}
