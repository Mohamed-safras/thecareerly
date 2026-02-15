"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Stepper from "@/components/stepper";
import { editJobPostingSteps } from "@/const/stepper-item";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { useSubmitJobForm } from "@/features/jobs/hooks/use-submit-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getJobsPath } from "@/lib/utils";
import { goTo } from "@/validators/job-form";
import { UPDATE_JOB_FORM } from "@/const/local-store-values";
import {
  setUpdateForm as setFormMerge,
  replaceUpdateForm as replaceForm,
  toggleUpdatePlatform as togglePlatformAction,
} from "@/store/slice/jobs-slice";
import { redirect } from "next/navigation";
import JobFormCard from "@/features/jobs/components/create-new-job/job-form-card";

interface EditJobProps {
  id: string;
}

export default function EditJob({ id }: EditJobProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const { user } = useAppSelector(({ auth }) => auth);

  const { jobs } = useAppSelector(({ jobs }) => jobs);
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
      }),
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
          <JobFormCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            total={total}
            jobForm={updateJobForm}
            formType={UPDATE_JOB_FORM}
            formErrorType={UPDATE_JOB_FORM}
            defaultTitle="Edit Job"
            setFormMerge={setFormMerge}
            replaceForm={replaceForm}
            togglePlatformAction={togglePlatformAction}
            validateStep={validateStep}
          />
        </div>
      </motion.div>
    </HeaderShell>
  );
}
