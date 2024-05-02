"use server";

import { cn } from "@/utils/cn";
import { QuestionPack } from "@/app/question-packs/_types";
import { PopularTag } from "@/app/question-packs/_components/PopularTag";
import { ExternalLinkIcon } from "@/components/Icons/ExternalLinkIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon";

export async function QuestionPackCard({ pack }: { pack: QuestionPack }) {
  const isPopular = pack.numberOfLikes > 900;

  return (
    <div
      className={cn(
        "rounded-[12px] p-[3px] bg-[#141414]",
        isPopular ? "bg-gradient-brand" : null,
      )}
    >
      <div className="p-4 bg-[#141414] rounded-[10px]">
        <div className="flex justify-between mb-2">
          <p className="font-bold text-2xl text-neutral-100">{pack.title}</p>
          {isPopular && <PopularTag />}
        </div>
        <p>{pack.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <p>Questions</p>
            <p className="text-neutral-100 font-bold">
              {pack.numberOfQuestions}
            </p>
          </div>
          <div>
            <p>Type</p>
            <p className="text-neutral-100 font-bold">{pack.type}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="bg-[#101010] p-3 rounded-lg flex items-center justify-center gap-2">
            <HeartIcon /> {pack.numberOfLikes} Likes
          </button>
          <button
            className={cn(
              "rounded-lg flex items-center justify-center gap-2",
              isPopular ? "bg-gradient-brand" : "bg-blue-500",
            )}
          >
            <ExternalLinkIcon />{" "}
            <span className="align-text-bottom">Use Pack</span>
          </button>
        </div>
      </div>
    </div>
  );
}
