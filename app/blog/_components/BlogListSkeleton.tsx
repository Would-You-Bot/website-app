"use server";

export async function BlogListSkeleton() {
  return (
    <>
      <ListItemSkeleton />
      <ListItemSkeleton />
      <ListItemSkeleton />
    </>
  );
}

/**
 * @private
 */
function ListItemSkeleton() {
  return (
    <div className="w-full rounded-lg bg-neutral-800 p-4 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-3 w-full">
          <div className="w-[40px] h-[40px] bg-neutral-700 rounded-full animate-pulse" />
          <div className="w-3/4 sm:w-1/2 md:w-1/4 h-[20px] bg-neutral-700 rounded-lg animate-pulse" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-1/2 md:w-1/4 lg:w-1/6 h-[20px] bg-neutral-700 rounded-lg animate-pulse" />
          <div className="w-full sm:w-3/4 h-[20px] bg-neutral-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
