"use server";

import { getQuestionPacks } from "@/app/question-packs/_data";
import { QuestionPackCard } from "./QuestionPackCard";

export async function QuestionPackList() {
  const questionPacks = await getQuestionPacks();

  return (
    <>
      {questionPacks.map((pack) => (
        <QuestionPackCard key={pack.id} pack={pack} />
      ))}
    </>
  );
}
