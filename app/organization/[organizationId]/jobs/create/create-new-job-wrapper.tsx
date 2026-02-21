"use client";

import React from "react";
import { createJobPostingSteps } from "@/const/stepper-item";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { useSubmitJobForm } from "@/features/jobs/hooks/use-submit-form";
import { useAppSelector } from "@/store/hooks";
import { CREATE_JOB_FORM } from "@/const/local-store-values";
import {
  setCreateForm as setFormMerge,
  replaceCreateForm as replaceForm,
  toggleCreatePlatform as togglePlatformAction,
} from "@/store/slice/jobs-slice";

import { goTo } from "@/validators/job-form";
import { useAuth } from "@/features/auth/hooks/use-auth";
import JobHeaderStepper from "@/features/jobs/components/create-new-job/job-header-stepper";
import JobFormCard from "@/features/jobs/components/create-new-job/job-form-card";
import { getJobsPath } from "@/utils/generate-path";

const CreateNewJobWrapper = () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const total = createJobPostingSteps.length;

  const { user } = useAuth();
  const { createJobFormData } = useAppSelector(({ jobs }) => jobs);

  const jobsPath = getJobsPath(user?.organizationId, user?.teamId);
  const { validateStep } = useSubmitJobForm({
    jobForm: createJobFormData,
    formErrorType: CREATE_JOB_FORM,
  });

  return (
    <HeaderShell
      breadCrumbPage="Create New Job"
      breadCrumbsItems={[{ label: "Jobs", link: jobsPath ? jobsPath : "#" }]}
    >
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] w-full p-0">
        <div className="grid grid-cols-1 w-full h-full lg:mx-auto lg:max-w-7xl">
          <JobHeaderStepper
            createJobPostingSteps={createJobPostingSteps}
            currentStep={currentStep}
            validateStep={validateStep}
            setCurrentStep={setCurrentStep}
            goTo={goTo}
          />

          <JobFormCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            total={total}
            jobForm={createJobFormData}
            formType={CREATE_JOB_FORM}
            formErrorType={CREATE_JOB_FORM}
            defaultTitle="Create Job"
            setFormMerge={setFormMerge}
            replaceForm={replaceForm}
            togglePlatformAction={togglePlatformAction}
            validateStep={validateStep}
          />
        </div>
      </div>
    </HeaderShell>
  );
};

export default CreateNewJobWrapper;
