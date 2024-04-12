import { PropsWithChildren } from "react";

export default function QuestionPacksLayout({ children }: PropsWithChildren) {
  return (
    <main className="mt-48 overflow-x-hidden text-neutral-300 container mx-auto">
      {children}
    </main>
  );
}
