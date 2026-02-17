import HorizontalStepper from "@/components/stepper";
import { FieldError } from "@/types/form-errors";
import React from "react";

export interface CreateNewJobHeaderStepperProps {
  createJobPostingSteps: readonly {
    id: number;
    title: string;
  }[];
  currentStep: number;
  validateStep: (step: number) => FieldError[];
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  goTo: (
    goTo: number,
    currentStep: number,
    validateStep: (step: number) => FieldError[],
    setCurrentStep: (value: React.SetStateAction<number>) => void,
  ) => void;
}

const CreateNewJobHeaderStepper: React.FC<CreateNewJobHeaderStepperProps> = ({
  createJobPostingSteps,
  currentStep,
  validateStep,
  setCurrentStep,
  goTo,
}) => {
  return (
    <div className="sticky top-10 z-20 col-span-1">
      <div className="p-3 space-y-3 h-fit bg-card">
        <HorizontalStepper
          steps={createJobPostingSteps}
          currentStep={currentStep}
          validateStep={validateStep}
          setCurrentStep={setCurrentStep}
          goTo={goTo}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default CreateNewJobHeaderStepper;
