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
import { ChevronLeft, ChevronRight, Shield, Sparkles } from "lucide-react";
import SchedulePanel from "@/features/jobs/components/publish-job";
import JobDescription from "@/features/jobs/components/job-description";
import PreviewPanel from "@/features/jobs/components/preview-job";
import HiringProcesses from "@/features/jobs/components/hiring-processes";
import { goNext, goPrev } from "@/validators/job-form";
import type { JobFormData } from "@/interfaces/job";
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { FieldError } from "@/types/form-errors";
import { useAppDispatch } from "@/store/hooks";
import StepRequirements from "./step-requirements";
import StepJobDetails from "@/features/jobs/components/create-new-job/step-job-details";
import StepModeSelection from "./step-mode-selection";
import StepCompliance from "./step-compliance";
import { StepContentReview } from "./step-content-review";
import StepMediaAttachments from "./step-media-attachments";

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

const stepHeaderDetails: Record<
  number,
  { title: string; description: string; icon?: React.ReactNode }
> = {
  1: {
    title: "How would you like to start?",
    description: "Choose to start fresh or use a template.",
  },
  2: {
    title: "Job details",
    description: "Provide the basic information about the job.",
  },
  3: {
    title: "Job Description",
    description: "Write or generate content with AI.",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
  4: {
    title: "Review",
    description: "Fine-tune the content before proceeding.",
  },
  5: {
    title: "Requirements & Screening",
    description:
      "Set education, experience, and application screening questions.",
  },
  6: {
    title: "Media & Attachments",
    description: "Add images, videos, or documents to your job posting.",
  },
  7: {
    title: "Compliance Check",
    description: "Scan your job posting for compliance issues.",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  8: {
    title: "",
    description: "See how your job post will look before publishing.",
  },
  9: {
    title: "",
    description:
      "Plan your post in advance and publish it at the perfect time.",
  },
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
  const dispatch = useAppDispatch();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepModeSelection
            jobForm={jobForm}
            setFormMerge={setFormMerge}
            onApplyTemplate={(prefill) => {
              dispatch(setFormMerge(prefill));
            }}
          />
        );
      case 2:
        return (
          <StepJobDetails
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
          <StepContentReview jobForm={jobForm} setFormMerge={setFormMerge} />
        );
      case 5:
        return (
          <StepRequirements
            jobForm={jobForm}
            setFormMerge={setFormMerge}
            formErrorType={formErrorType}
          />
        );
      case 6:
        return (
          <StepMediaAttachments jobForm={jobForm} setFormMerge={setFormMerge} />
        );
      case 7:
        return <StepCompliance jobForm={jobForm} setFormMerge={setFormMerge} />;
      case 8:
        return (
          <HiringProcesses
            jobForm={jobForm}
            formType={formType}
            setFormMerge={setFormMerge}
            replaceForm={replaceForm}
          />
        );
      case 9:
        return <PreviewPanel jobForm={jobForm} />;
      case 10:
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
      <Card className="rounded-none border-none py-0 gap-0">
        <CardHeader className="p-3">
          {stepHeaderDetails[currentStep] && (
            <CardTitle className="flex items-center gap-1 text-xl">
              {stepHeaderDetails[currentStep].icon}
              {stepHeaderDetails[currentStep].title || defaultTitle}
            </CardTitle>
          )}
          {stepHeaderDetails[currentStep] && (
            <CardDescription>
              {stepHeaderDetails[currentStep].description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="p-3">{renderStep()}</CardContent>

        <CardFooter className="flex items-center justify-between gap-3 p-3 border-t">
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
