"use server";

import { QuestionPack, QuestionPackType } from "@/app/question-packs/_types";
import { unstable_cache } from "next/cache";

const mock: () => Promise<QuestionPack[]> = unstable_cache(
  () =>
    Promise.resolve(
      new Array(10).fill(null).map((_, i) => ({
        id: `${i + 1}`,
        title: "School Questions",
        description:
          "Over 1000 Would you rather questions about school situations",
        numberOfQuestions: Math.floor(Math.random() * 1000),
        numberOfLikes: Math.floor(Math.random() * 1000),
        type: QuestionPackType.WouldYouRather,
      })),
    ),
  ["mock"],
);

// TODO replace with database call later
export async function getQuestionPacks(): Promise<QuestionPack[]> {
  return mock();
}
