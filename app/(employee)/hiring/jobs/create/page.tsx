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
import SchedulePanel from "@/features/jobs/components/schedule-job";
import HiringShell from "@/features/jobs/components/hiring-shell";
import HorizontalStepper from "@/components/horizontal-stepper";
import JobDescription from "@/features/jobs/components/job-description";
import PreviewPanel from "@/features/jobs/components/preview-job";
import BasicInfo from "@/features/jobs/components/basci-info";
import ScreeningQuestions from "@/features/jobs/components/screen-questions";
import { jobPostingSteps } from "@/constents/stepper-item";
import { HIRING, HIRING_JOBS } from "@/constents/router-links";
import HiringProcesses from "@/features/jobs/components/hiring-processes";

export default function JobPost() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const total = jobPostingSteps.length;

  const goPrev = () => setCurrentStep((step) => Math.max(1, step - 1));
  const goNext = () => setCurrentStep((step) => Math.min(total, step + 1));
  const goTo = (index: number) => setCurrentStep(index);

  return (
    <HiringShell
      breadCrumpPage="Create"
      breadCrumbsItems={[
        { label: "Hiring", link: HIRING },
        { label: "Jobs", link: HIRING_JOBS },
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className=" mx-auto grid max-w-8xl grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-10 p-4"
      >
        {/* Left column*/}
        <div className="relative sm:col-span-1 lg:col-span-3">
          <div className="md:sticky md:top-15 p-4 space-y-6 border rounded-2xl shadow-sm col-span-1 h-fit">
            <HorizontalStepper
              steps={jobPostingSteps}
              currentStep={currentStep}
              onGoTo={goTo}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="sm:col-span-1 lg:col-span-7 space-y-6">
          <Card className="shadow-sm rounded-2xl">
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
              {currentStep === 1 && <BasicInfo />}
              {currentStep === 2 && <JobDescription />}
              {currentStep === 3 && <ScreeningQuestions />}
              {currentStep === 4 && <HiringProcesses />}
              {currentStep === 5 && <PreviewPanel />}
              {currentStep === 6 && <SchedulePanel />}
            </CardContent>

            <CardFooter className="flex  items-center justify-between gap-2 py-4 border-t">
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
                variant="ghost"
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
