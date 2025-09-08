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
import { ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import SchedulePanel from "@/features/jobs/components/schedule-job";
import HiringShell from "@/features/jobs/components/hiring-shell";
import HorizontalStepper from "@/components/horizontal-stepper";
import JobDescription from "@/features/jobs/components/job-description";
import PreviewPanel from "@/features/jobs/components/preview-job";
import BasicInfo from "@/features/jobs/components/basci-info";
import ScreeningQuestions from "@/features/jobs/components/screen-questions";

export default function JobPost() {
  const steps = [
    { title: "Basic Information" },
    { title: "Job Description" },
    { title: "Applicable Questions" },
    { title: "Hiring Process" },
    { title: "Confirmation" },
  ];

  const [currentStep, setCurrentStep] = React.useState(1); // 1-indexed like the mock (currently step 3)
  const total = steps.length;

  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(total, s + 1));
  const goTo = (i: number) => setCurrentStep(i);

  return (
    <HiringShell
      breadCrumpPage="Create"
      breadCrumbsItems={[
        { label: "Hiring", link: "/hiring" },
        { label: "Jobs", link: "/hiring/jobs" },
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto grid max-w-8xl grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-10 p-4"
      >
        {/* Left column*/}
        <div className="sm:col-span-1 lg:col-span-3">
          <div className="md:sticky md:top-15 space-y-6">
            <Card className="shadow-sm col-span-1 h-fit">
              <CardHeader className="pb-2 space-y-3">
                <HorizontalStepper
                  steps={steps}
                  currentStep={currentStep}
                  onGoTo={goTo}
                />
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Right column */}
        <div className="sm:col-span-1 lg:col-span-7 space-y-6">
          <Card className="shadow-sm rounded-2xl">
            <CardHeader>
              {currentStep === 5 ? (
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Eye className="h-4 w-4 mr-2" /> Preview & Publish
                </CardTitle>
              ) : (
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5" /> Create Job
                </CardTitle>
              )}

              {currentStep === 1 && (
                <React.Fragment>
                  <CardDescription>
                    Provide the basic information about the job.
                  </CardDescription>
                </React.Fragment>
              )}

              {currentStep === 2 && (
                <React.Fragment>
                  <CardDescription>
                    Create a standout job description or let AI write it for
                    you.
                  </CardDescription>
                </React.Fragment>
              )}

              {currentStep === 3 && (
                <React.Fragment>
                  <CardDescription>
                    You can create screening questions. Candidates who provide
                    an incorrect answers will automatically be moved into the{" "}
                    {"'Unsuitable'"} folder within Applicant manager.
                  </CardDescription>
                </React.Fragment>
              )}
            </CardHeader>

            <CardContent>
              {currentStep === 1 && <BasicInfo />}
              {currentStep === 2 && <JobDescription />}
              {currentStep === 3 && <ScreeningQuestions />}
              {currentStep === 4 && <SchedulePanel />}
              {currentStep === 5 && <PreviewPanel />}
            </CardContent>

            {/* <CardFooter className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => toast.warning("Draft saved (demo)")}
              >
                Save Draft
              </Button>
              <Button
                onClick={() =>
                  toast.success("JD submitted for approval (demo)")
                }
              >
                Submit for Approval
              </Button>
            </CardFooter> */}

            <CardFooter className="flex items-center justify-between gap-2 py-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={goPrev}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {total}
              </div>
              <Button
                className="min-w-24"
                onClick={goNext}
                disabled={currentStep === total}
              >
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </HiringShell>
  );
}
