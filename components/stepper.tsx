import { FieldError } from "@/types/form-errors";
import { CheckCircle2 } from "lucide-react";

export default function Stepper({
  validateStep,
  setCurrentStep,
  steps,
  currentStep,
  goTo,
}: {
  currentStep: number;
  steps: Readonly<{ title: string }[]>;
  validateStep: (step: number) => FieldError[];
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  goTo: (
    goTo: number,
    currentStep: number,
    validateStep: (step: number) => FieldError[],
    setCurrentStep: (value: React.SetStateAction<number>) => void
  ) => void;
}) {
  return (
    <div className="w-full max-[1279px]:max-w-5xl max-[1279px]:m-auto max-[1279px]:overflow-x-scroll min-[1280px]:overflow-x-auto no-scrollbar">
      <div className="relative flex flex-col max-[1279px]:flex-row max-[1279px]:justify-center max-[1279px]:gap-8 min-[1280px]:flex-col min-[1280px]:gap-0 max-[1279px]:min-w-max">
        {steps.map((s, idx) => {
          const stepNo = idx + 1;
          const done = stepNo < currentStep;
          const active = stepNo === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <div
              key={s.title}
              className={`flex flex-col items-start max-[1279px]:relative max-[1279px]:shrink-0 ${
                !isLast ? "max-[1279px]:pr-0" : ""
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  goTo(stepNo, currentStep, validateStep, setCurrentStep)
                }
                className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                  active
                    ? "border-primary bg-pr text-primary"
                    : done
                    ? "border-muted bg-muted/40 text-foreground"
                    : "border-muted text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    done
                      ? "bg-primary text-accent"
                      : active
                      ? "bg-primary text-accent"
                      : "bg-muted border text-foreground"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : stepNo}
                </span>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {s.title}
                </span>
              </button>

              {/* vertical connector (mobile & above 1280px) */}
              {!isLast && (
                <div className="max-[1279px]:hidden min-[1280px]:inline-block ml-6 h-8 w-1 bg-primary rounded" />
              )}

              {/* horizontal connector (up to 1279px) */}
              {!isLast && (
                <div className="absolute hidden max-[1279px]:inline-block min-[1280px]:hidden h-1 w-8 bg-primary rounded top-1/2 -translate-y-1/2 left-full translate-x-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
