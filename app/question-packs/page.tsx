import { getQuestionPacks } from "@/app/question-packs/_data";
import { QuestionPackCard } from "@/app/question-packs/_components";

export default async function QuestionPacksPage() {
  const questionPacks = await getQuestionPacks();

  return (
    <div className="grid grid-cols-3 gap-12">
      {questionPacks.map((pack) => (
        <QuestionPackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
