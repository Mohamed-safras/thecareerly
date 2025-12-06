"use client";

import React, { useEffect } from "react";
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
import Stepper from "@/components/stepper";
import JobDescription from "@/features/jobs/components/job-description";
import PreviewPanel from "@/features/jobs/components/preview-job";
import BasicInfo from "@/features/jobs/components/basci-info";
import ScreeningQuestions from "@/features/jobs/components/screen-questions";
import { editJobPostingSteps } from "@/constents/stepper-item";
import HiringProcesses from "@/features/jobs/components/hiring-processes";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { useSubmitJobForm } from "@/hooks/use-submit-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getJobsPath } from "@/lib/utils";
import { goNext, goPrev, goTo } from "@/lib/form-validation/job-form";
import { UPDATE_JOB_FORM } from "@/constents/local-store-values";
import {
  setUpdateForm as setFormMerge,
  replaceUpdateForm as replaceForm,
  toggleUpdatePlatform as togglePlatformAction,
} from "@/store/slice/jobs-slice";
import { redirect } from "next/navigation";

interface EditJobProps {
  id: string;
}

export default function EditJob({ id }: EditJobProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const { user } = useAppSelector(({ auth }) => auth);

  const { jobs } = useAppSelector(({ jobs }) => jobs); // not fetch from here fetch job with the id
  const { updateJobForm } = useAppSelector(({ jobs }) => jobs);
  const dispatch = useAppDispatch();

  const total = editJobPostingSteps.length;

  const jobsPath = user && getJobsPath(user.organizationId, user.teamId);

  const { validateStep } = useSubmitJobForm({
    jobForm: updateJobForm,
    formErrorType: UPDATE_JOB_FORM,
  });
  useEffect(() => {
    const findJob = jobs.find((job) => job.id === id);
    console.log("Found Job for Edit:", findJob);
    if (!findJob) {
      redirect("/not-found");
    }

    dispatch(
      replaceForm({
        ...findJob,
      })
    );
  }, [id, dispatch, jobs]);

  return (
    <HeaderShell
      breadCrumbPage="Edit Job"
      breadCrumbsItems={[{ label: "Jobs", link: jobsPath ? jobsPath : "#" }]}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto grid max-w-8xl grid-cols-1 gap-4 sm:gap-6 max-[1279px]:grid-cols-1 min-[1280px]:grid-cols-10 p-2 sm:p-4"
      >
        {/* Left column*/}
        <div className="relative min-[1280px]:col-span-3">
          <div className="min-[1280px]:sticky min-[1280px]:top-15 p-2 sm:p-4 space-y-4 sm:space-y-6 border rounded-xl sm:rounded-2xl shadow-sm h-fit bg-card">
            <Stepper
              steps={editJobPostingSteps}
              currentStep={currentStep}
              validateStep={validateStep}
              setCurrentStep={setCurrentStep}
              goTo={goTo}
              orientation="horizontal"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="min-[1280px]:col-span-7 space-y-4 sm:space-y-6">
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
                  <Sparkles className="h-5 w-5" /> Edit Job
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
                  jobForm={updateJobForm}
                  formType={UPDATE_JOB_FORM}
                  setFormMerge={setFormMerge}
                  replaceForm={replaceForm}
                  formErrorType={UPDATE_JOB_FORM}
                />
              )}
              {currentStep === 2 && (
                <JobDescription
                  jobForm={updateJobForm}
                  setFormMerge={setFormMerge}
                  formErrorType={UPDATE_JOB_FORM}
                />
              )}
              {currentStep === 3 && (
                <ScreeningQuestions
                  jobForm={updateJobForm}
                  formType={UPDATE_JOB_FORM}
                  setFormMerge={setFormMerge}
                  replaceForm={replaceForm}
                />
              )}
              {currentStep === 4 && (
                <HiringProcesses
                  jobForm={updateJobForm}
                  formType={UPDATE_JOB_FORM}
                  setFormMerge={setFormMerge}
                  replaceForm={replaceForm}
                />
              )}
              {currentStep === 5 && <PreviewPanel jobForm={updateJobForm} />}
              {currentStep === 6 && (
                <SchedulePanel
                  setCurrentStep={setCurrentStep}
                  jobForm={updateJobForm}
                  setFormMerge={setFormMerge}
                  togglePlatformAction={togglePlatformAction}
                  formErrorType={UPDATE_JOB_FORM}
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
