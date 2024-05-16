import { PropsWithChildren } from "react";

export default function QuestionPacksLayout({ children }: PropsWithChildren) {
  return (
    <main className="mt-48 overflow-x-hidden text-neutral-300 container max-w-8xl px-8 mx-auto">
      {children}
    </main>
  );
}
