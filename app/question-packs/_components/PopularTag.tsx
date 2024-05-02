"use server";

import { FireIcon } from "@/components/Icons/FireIcon";

export async function PopularTag() {
  return (
    <div
      aria-hidden
      className="px-2 py-3 h-[23px] text-xs font-[400] flex items-center justify-center gap-1 bg-gradient-tag rounded-[7px] uppercase"
    >
      <FireIcon className="w-4 h-4" /> POPULAR
    </div>
  );
}
