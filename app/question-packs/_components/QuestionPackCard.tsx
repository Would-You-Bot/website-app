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
          <p className="font-bold text-2xl text-white">{pack.title}</p>
          {isPopular && <PopularTag />}
        </div>
        <p className="text-[#B4B4B4]">{pack.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <p className="text-[#898989]">Questions</p>
            <p className="text-white font-bold">{pack.numberOfQuestions}</p>
          </div>
          <div>
            <p className="text-[#898989]">Type</p>
            <p className="text-white font-bold">{pack.type}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="bg-[#101010] p-3 rounded-lg flex items-center justify-center gap-2 text-[#909090]">
            <HeartIcon /> {pack.numberOfLikes} Likes
          </button>
          <button
            className={cn(
              "rounded-lg flex items-center justify-center gap-2 text-white",
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
