import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Rocket, Sparkles } from "lucide-react";
import SchedulePanel from "@/features/jobs/components/publish-job";
import JobDescription from "@/features/jobs/components/job-description";
import PreviewPanel from "@/features/jobs/components/preview-job";
import BasicInfo from "@/features/jobs/components/basci-info";
import ScreeningQuestions from "@/features/jobs/components/screen-questions";
import HiringProcesses from "@/features/jobs/components/hiring-processes";
import { goNext, goPrev } from "@/validators/job-form";
import type { JobFormData } from "@/interfaces/job";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { FieldError } from "@/types/form-errors";
import { StepModeSelection } from "./step-mode-selection";
import { useAppDispatch } from "@/store/hooks";

interface JobFormCardProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  jobForm: JobFormData;
  formType: string;
  formErrorType: string;
  defaultTitle: string;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
  replaceForm: ActionCreatorWithPayload<JobFormData>;
  togglePlatformAction: ActionCreatorWithPayload<string>;
  validateStep: (step: number) => FieldError[];
}

const stepDescriptions: Record<number, string> = {
  1: "Choose to start fresh or use a template.",
  2: "Provide the basic information about the job.",
  3: "Create a standout job description and generate a professional poster for your opening or let AI do it for you.",
  4: "You can create screening questions. Candidates who provide an incorrect answers will automatically be moved into the 'Unsuitable' folder within Applicant manager.",
  5: "The goal of the recruitment and selection process at organisation is to find and hire the best candidates for job openings. This process has a funnel structure. Imagine a new hire for a role - your current employee decided to pursure another opportunity",
  6: "See how your job post will look before publishing.",
  7: "Plan your post in advance and publish it at the perfect time.",
};

const JobFormCard = ({
  currentStep,
  setCurrentStep,
  total,
  jobForm,
  formType,
  formErrorType,
  defaultTitle,
  setFormMerge,
  replaceForm,
  togglePlatformAction,
  validateStep,
}: JobFormCardProps) => {
  const getTitle = () => {
    if (currentStep === 1) {
      return (
        <CardTitle className="flex items-center gap-2 text-xl">
          How would you like to start?
        </CardTitle>
      );
    }

    if (currentStep === 5) {
      return (
        <CardTitle className="flex items-center gap-2 text-xl">
          <Eye className="h-4 w-4 mr-2" /> Preview
        </CardTitle>
      );
    }

    if (currentStep === 6) {
      return (
        <CardTitle className="flex items-center gap-2 text-xl">
          <Rocket className="h-5 w-5" /> Schedule & Publish
        </CardTitle>
      );
    }
    return (
      <CardTitle className="flex items-center gap-2 text-xl">
        <Sparkles className="h-5 w-5" /> {defaultTitle}
      </CardTitle>
    );
  };

  const dispatch = useAppDispatch();

  const handleModeChange = (field: keyof JobFormData, value: unknown) => {
    dispatch(setFormMerge({ [field]: value } as Partial<JobFormData>));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepModeSelection
            jobForm={jobForm}
            onChange={handleModeChange}
            onApplyTemplate={(prefill) => {
              dispatch(setFormMerge(prefill));
            }}
          />
        );
      case 2:
        return (
          <BasicInfo
            jobForm={jobForm}
            formType={formType}
            setFormMerge={setFormMerge}
            replaceForm={replaceForm}
            formErrorType={formErrorType}
          />
        );
      case 3:
        return (
          <JobDescription
            jobForm={jobForm}
            setFormMerge={setFormMerge}
            formErrorType={formErrorType}
          />
        );
      case 4:
        return (
          <ScreeningQuestions
            jobForm={jobForm}
            formType={formType}
            setFormMerge={setFormMerge}
            replaceForm={replaceForm}
          />
        );
      case 5:
        return (
          <HiringProcesses
            jobForm={jobForm}
            formType={formType}
            setFormMerge={setFormMerge}
            replaceForm={replaceForm}
          />
        );
      case 6:
        return <PreviewPanel jobForm={jobForm} />;

      case 7:
        return (
          <SchedulePanel
            setCurrentStep={setCurrentStep}
            jobForm={jobForm}
            setFormMerge={setFormMerge}
            togglePlatformAction={togglePlatformAction}
            formErrorType={formErrorType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="col-span-1 space-y-3">
      <Card className="shadow-sm rounded-xl sm:rounded-2xl">
        <CardHeader>
          {getTitle()}
          {stepDescriptions[currentStep] && (
            <CardDescription>{stepDescriptions[currentStep]}</CardDescription>
          )}
        </CardHeader>

        <CardContent>{renderStep()}</CardContent>

        <CardFooter className="flex  items-center justify-between gap-2 py-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goPrev(setCurrentStep)}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {total}
          </div>

          <Button
            variant="ghost"
            className="min-w-24"
            onClick={() =>
              goNext(currentStep, total, validateStep, setCurrentStep)
            }
            disabled={currentStep === total}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobFormCard;
