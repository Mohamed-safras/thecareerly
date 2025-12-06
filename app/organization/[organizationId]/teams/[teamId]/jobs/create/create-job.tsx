"use client";

import React from "react";
import { motion } from "framer-motion";
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
import HorizontalStepper from "@/components/stepper";
import JobDescription from "@/features/jobs/components/job-description";
import PreviewPanel from "@/features/jobs/components/preview-job";
import BasicInfo from "@/features/jobs/components/basci-info";
import ScreeningQuestions from "@/features/jobs/components/screen-questions";
import { createJobPostingSteps } from "@/constents/stepper-item";
import HiringProcesses from "@/features/jobs/components/hiring-processes";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { useSubmitJobForm } from "@/hooks/use-submit-form";
import { useAppSelector } from "@/store/hooks";
import { getJobsPath } from "@/lib/utils";
import { CREATE_JOB_FORM } from "@/constents/local-store-values";
import {
  setCreateForm as setFormMerge,
  replaceCreateForm as replaceForm,
  toggleCreatePlatform as togglePlatformAction,
} from "@/store/slice/jobs-slice";

import { goNext, goPrev, goTo } from "@/lib/form-validation/job-form";

export default function CreateJob() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const total = createJobPostingSteps.length;

  const { user } =;
  const { createJobForm } = useAppSelector(({ jobs }) => jobs);

  const jobsPath = getJobsPath(user?.organizationId, user?.teamId);
  const { validateStep } = useSubmitJobForm({
    jobForm: createJobForm,
    formErrorType: CREATE_JOB_FORM,
  });
  return (
    <HeaderShell
      breadCrumbPage="Create"
      breadCrumbsItems={[{ label: "Jobs", link: jobsPath ? jobsPath : "#" }]}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto grid max-w-8xl grid-cols-1 gap-4 sm:gap-6 p-2 sm:p-4"
      >
        <div className="relative col-span-1">
          <div className="p-2 sm:p-4 space-y-4 sm:space-y-6 border rounded-xl sm:rounded-2xl shadow-sm h-fit bg-card">
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

        {/* Right column - Content */}
        <div className="col-span-1 space-y-4 sm:space-y-6">
          <Card className="shadow-sm rounded-xl sm:rounded-2xl">
            <CardHeader>
              {currentStep === 5 ? (
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Eye className="h-4 w-4 mr-2" /> Preview
                </CardTitle>
              ) : currentStep === 6 ? (
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Rocket className="h-5 w-5" /> Schedule & Publish
                </CardTitle>
              ) : (
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5" /> Create Job
                </CardTitle>
              )}

              {currentStep === 1 && (
                <CardDescription>
                  Provide the basic information about the job.
                </CardDescription>
              )}

              {currentStep === 2 && (
                <CardDescription>
                  Create a standout job description and generate a professional
                  poster for your opening or let AI do it for you.
                </CardDescription>
              )}

              {currentStep === 3 && (
                <CardDescription>
                  You can create screening questions. Candidates who provide an
                  incorrect answers will automatically be moved into the{" "}
                  {"'Unsuitable'"} folder within Applicant manager.
                </CardDescription>
              )}

              {currentStep === 4 && (
                <CardDescription>
                  The goal of the recruitment and selection process at
                  organisation is to find and hire the best candidates for job
                  openings. This process has a funnel structure. Imagine a new
                  hire for a role - your current employee decided to pursure
                  another opportunity
                </CardDescription>
              )}

              {currentStep === 5 && (
                <CardDescription>
                  See how your job post will look before publishing.
                </CardDescription>
              )}

              {currentStep === 6 && (
                <CardDescription>
                  Plan your post in advance and publish it at the perfect time.
                </CardDescription>
              )}
            </CardHeader>

            <CardContent>
              {currentStep === 1 && (
                <BasicInfo
                  jobForm={createJobForm}
                  formType={CREATE_JOB_FORM}
                  setFormMerge={setFormMerge}
                  replaceForm={replaceForm}
                  formErrorType={CREATE_JOB_FORM}
                />
              )}
              {currentStep === 2 && (
                <JobDescription
                  jobForm={createJobForm}
                  setFormMerge={setFormMerge}
                  formErrorType={CREATE_JOB_FORM}
                />
              )}
              {currentStep === 3 && (
                <ScreeningQuestions
                  jobForm={createJobForm}
                  formType={CREATE_JOB_FORM}
                  setFormMerge={setFormMerge}
                  replaceForm={replaceForm}
                />
              )}
              {currentStep === 4 && (
                <HiringProcesses
                  jobForm={createJobForm}
                  formType={CREATE_JOB_FORM}
                  setFormMerge={setFormMerge}
                  replaceForm={replaceForm}
                />
              )}
              {currentStep === 5 && <PreviewPanel jobForm={createJobForm} />}
              {currentStep === 6 && (
                <SchedulePanel
                  setCurrentStep={setCurrentStep}
                  jobForm={createJobForm}
                  setFormMerge={setFormMerge}
                  togglePlatformAction={togglePlatformAction}
                  formErrorType={CREATE_JOB_FORM}
                />
              )}
            </CardContent>

            <CardFooter className="flex  items-center justify-between gap-2 py-4 border-t">
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
      </motion.div>
    </HeaderShell>
  );
}
