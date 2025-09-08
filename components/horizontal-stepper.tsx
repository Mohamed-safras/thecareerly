import { CheckCircle2 } from "lucide-react";

export default function VerticalStepper({
  steps,
  currentStep,
  onGoTo,
}: {
  steps: { title: string }[];
  currentStep: number;
  onGoTo: (i: number) => void;
}) {
  return (
    <div className="w-full md:max-w-5xl md:m-auto md:overflow-x-scroll lg:overflow-x-auto">
      {/* make the row wider than viewport on md so horizontal scroll can show all buttons */}
      <div className="relative flex flex-col md:flex-row md:justify-center md:gap-8 lg:flex-col lg:gap-0 md:min-w-max">
        {steps.map((s, idx) => {
          const stepNo = idx + 1;
          const done = stepNo < currentStep;
          const active = stepNo === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <div
              key={s.title}
              // prevent shrinking and reserve space for the md horizontal connector so it doesn't get cut off
              className={`flex flex-col items-start md:relative md:shrink-0 ${
                !isLast ? "md:pr-0" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => onGoTo(stepNo)}
                className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                  active
                    ? "border-emerald-600/60 bg-emerald-50 text-emerald-700"
                    : done
                    ? "border-muted bg-muted/40 text-foreground"
                    : "border-muted text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    done
                      ? "bg-emerald-600 text-white"
                      : active
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : stepNo}
                </span>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {s.title}
                </span>
              </button>

              {/* vertical connector (mobile & lg) */}
              {!isLast && (
                <div className="md:hidden lg:inline-block ml-6 h-6 w-0.5 bg-muted rounded" />
              )}

              {/* horizontal connector (md) aligned with button and included in scroll width */}
              {!isLast && (
                <div className="absolute hidden md:inline-block lg:hidden h-0.5 w-8 bg-muted rounded top-1/2 -translate-y-1/2 left-full translate-x-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
