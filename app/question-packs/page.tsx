import { Suspense } from "react";
import { QuestionPackListSkeleton } from "./_components/QuestionPackListSkeleton";
import { QuestionPackList } from "./_components/QuestionPackList";

export default async function QuestionPacksPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
      <Suspense fallback={<QuestionPackListSkeleton />}>
        <QuestionPackList />
      </Suspense>
    </div>
  );
}
