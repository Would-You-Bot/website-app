import { CheckIcon, CloseIcon } from "./icons";

interface ArrayProps {
  criteria: string;
  free: string | number | boolean;
  premium: string | number | boolean;
}

interface PlansComparisonProps {
  className?: string;
  data: Array<ArrayProps>;
  colSeparator?: boolean;
  rowSeparator?: boolean;
}

export default function PlansComparison({
  className,
  data,
  colSeparator,
  rowSeparator,
}: PlansComparisonProps) {
  return (
    <section className="max-w-8xl w-full h-auto flex flex-col mx-auto text-white">
      <div className="w-full max-w-8xl mx-auto flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Plan Comparison
          </h2>
          <p className="text-center mt-2">
            Compare the features of our free and premium plans
          </p>
          </div>
        <div className="w-full flex bg-neutral-800 h-16 rounded-t-3xl mt-6">
          <div className="w-full basis-1/3 text-bold flex items-center justify-center"></div>
          <div className="w-full basis-1/3 flex items-center justify-center">
            Free
          </div>
          <div className="w-full basis-1/3 flex items-center justify-center">
            Premium
          </div>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-full flex h-16 ${rowSeparator && index != 0 ? "border-t-2 border-neutral-800" : ""}`}
            >
              <div className="w-full basis-1/3 flex items-center justify-center text-sm sm:text-base text-center px-2">
                {item.criteria}
              </div>
              <div
                className={`w-full basis-1/3 flex items-center justify-center text-[#7A7B7E] font-bold text-md ${colSeparator ? "border-x-2 border-neutral-800" : ""}`}
              >
                {typeof item.free === "boolean" ? (
                  item.free ? (
                    <CheckIcon className="w-5 h-5 sm:w-7 sm:h-7 text-[#7A7B7E]" />
                  ) : (
                    <CloseIcon className="w-5 h-5 sm:w-7 sm:h-7 text-[#7A7B7E]" />
                  )
                ) : (
                  <span className="text-sm sm:text-base text-center px-2">
                    {item.free}
                  </span>
                )}
              </div>
              <div className="w-full basis-1/3 flex items-center justify-center text-brand-customPrimary font-bold text-md">
                {typeof item.premium === "boolean" ? (
                  item.premium ? (
                    <CheckIcon className="w-5 h-5 sm:w-7 sm:h-7 text-brand-customPrimary" />
                  ) : (
                    <CloseIcon className="w-5 h-5 sm:w-7 sm:h-7 text-brand-customPrimary" />
                  )
                ) : (
                  <span className="text-sm sm:text-base text-center px-2">
                    {item.premium}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
