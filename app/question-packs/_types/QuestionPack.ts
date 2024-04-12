import { QuestionPackType } from "@/app/question-packs/_types";

export type QuestionPack = {
  id: string;
  title: string;
  description: string;
  type: QuestionPackType;
  numberOfQuestions: number;
  numberOfLikes: number;
};
