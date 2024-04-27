"use server";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/cn";

export async function QuestionPackListSkeleton() {
  return (
    <>
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
      <QuestionItemSkeleton />
    </>
  );
}

function QuestionItemSkeleton() {
  return (
    <div className={cn("rounded-[12px] p-[3px] bg-[#141414]")}>
      <div className="p-4 bg-[#141414] rounded-[10px]">
        <div className="flex justify-between mb-2">
          <Skeleton className="w-1/2 h-8" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <Skeleton className="w-1/3 h-5" />
            <Skeleton className="w-3/5 h-5" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="w-1/2 h-5" />
            <Skeleton className="w-2/5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="space-y-1">
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-1/3 h-5" />
          </div>
          <div className="space-y-1">
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-1/3 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
