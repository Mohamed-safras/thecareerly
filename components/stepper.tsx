import { FieldError } from "@/types/form-errors";
import { CheckCircle2 } from "lucide-react";
import React from "react";

type StepperOrientation = "horizontal" | "vertical";

export default function Stepper({
  validateStep,
  setCurrentStep,
  steps,
  currentStep,
  goTo,
  className,
  orientation = "vertical",
}: {
  currentStep: number;
  steps: Readonly<{ title: string }[]>;
  validateStep: (step: number) => FieldError[];
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  goTo: (
    goTo: number,
    currentStep: number,
    validateStep: (step: number) => FieldError[],
    setCurrentStep: (value: React.SetStateAction<number>) => void,
  ) => void;
  className?: string;
  orientation?: StepperOrientation; // New prop for explicit control
}) {
  // --- Tailwind Class Utilities ---

  const isVertical = orientation === "vertical";
  const isHorizontal = orientation === "horizontal";

  // Classes for the inner container (flex layout)
  const innerContainerClasses = isVertical
    ? "flex flex-col gap-0"
    : "flex flex-row justify-start gap-8 min-w-max"; // Key Change: Re-introduced min-w-max for overflow

  // Classes for each step wrapper
  const stepWrapperClasses = isVertical
    ? "flex flex-col items-start"
    : "flex flex-col items-start relative shrink-0";

  // --- Render Component ---

  return (
    <div
      // Key Change: Added overflow-x-scroll to the outer div for horizontal scroll
      className={`w-full no-scrollbar ${className} ${
        isHorizontal ? "overflow-x-scroll pb-3" : "overflow-x-hidden"
      }`}
    >
      <div className={`relative ${innerContainerClasses}`}>
        {steps.map((s, idx) => {
          const stepNo = idx + 1;
          const done = stepNo < currentStep;
          const active = stepNo === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <div key={s.title} className={stepWrapperClasses}>
              <button
                type="button"
                onClick={() =>
                  goTo(stepNo, currentStep, validateStep, setCurrentStep)
                }
                className={`group flex items-center gap-3 rounded-full border px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
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

              {/* Connector Line Logic (Dynamic based on orientation) */}
              {!isLast && (
                <div
                  className={`bg-primary rounded ${
                    isVertical
                      ? "ml-6 h-8 w-0.5" // Vertical connector
                      : "absolute h-0.5 w-8 top-1/2 -translate-y-1/2 left-full translate-x-0" // Horizontal connector
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
