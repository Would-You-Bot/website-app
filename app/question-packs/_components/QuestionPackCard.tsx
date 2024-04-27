"use server";

import { cn } from "@/utils/cn";
import { QuestionPack } from "@/app/question-packs/_types";

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
        <div className="flex justify-between">
          <p className="font-bold text-2xl text-neutral-100">{pack.title}</p>
          {isPopular ? "POPULAR" : null}
        </div>
        <p className="">{pack.description}</p>
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
          <button className="bg-[#101010] p-3 rounded-lg">
            {pack.numberOfLikes} Likes
          </button>
          <button
            className={cn(
              "p-3 rounded-lg",
              isPopular ? "bg-gradient-brand" : "bg-blue-500",
            )}
          >
            Use Pack
          </button>
        </div>
      </div>
    </div>
  );
}
