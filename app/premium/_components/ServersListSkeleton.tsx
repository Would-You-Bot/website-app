"use server";

import { Skeleton } from "@/components/ui/skeleton";

export async function ServersListSkeleton() {
  return (
    <>
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
      <ServersListItem />
    </>
  );
}

function ServersListItem() {
  return (
    <div className="flex gap-2 items-center h-10 hover:bg-white/5 px-2 rounded-sm transition">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-6 w-1/2 rounded-md" />
    </div>
  );
}
