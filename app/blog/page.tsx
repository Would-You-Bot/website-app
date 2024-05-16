import { Suspense } from "react";
import { BlogList, BlogListSkeleton } from "@/app/blog/_components";

const BlogPosts = async () => {
  return (
    <main className="px-8 max-w-8xl w-full">
      <h1 className="mt-36 text-4xl font-bold text-white">
        <span className="text-brand-red-100 drop-shadow-red-glow">Would</span>{" "}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">You</span>{" "}
        Blog
      </h1>
      <div className="mt-8 flex flex-col gap-4">
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
    </main>
  );
};

export default BlogPosts;
