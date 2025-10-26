import { FieldError } from "@/types/form-errors";

export const goNext = (
  currentStep: number,
  total: number,
  validateStep: (step: number) => FieldError[],
  setCurrentStep: (value: React.SetStateAction<number>) => void
) => {
  const errors = validateStep(currentStep);
  if (errors.length > 0) return;
  setCurrentStep((step) => Math.min(total, step + 1));
};

export const goTo = (
  goTo: number,
  currentStep: number,
  validateStep: (step: number) => FieldError[],
  setCurrentStep: (value: React.SetStateAction<number>) => void
) => {
  const errors = validateStep(currentStep);
  if (errors.length > 0 && goTo > currentStep) return;
  setCurrentStep(goTo);
};

export const goPrev = (
  setCurrentStep: (value: React.SetStateAction<number>) => void
) => setCurrentStep((step) => Math.max(1, step - 1));
