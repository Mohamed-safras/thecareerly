"use client";

import React from "react";
import { createJobPostingSteps } from "@/const/stepper-item";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { useSubmitJobForm } from "@/features/jobs/hooks/use-submit-form";
import { useAppSelector } from "@/store/hooks";
import { getJobsPath } from "@/lib/utils";
import { CREATE_JOB_FORM } from "@/const/local-store-values";
import {
  setCreateForm as setFormMerge,
  replaceCreateForm as replaceForm,
  toggleCreatePlatform as togglePlatformAction,
} from "@/store/slice/jobs-slice";

import { goTo } from "@/validators/job-form";
import { useAuth } from "@/features/auth/hooks/use-auth";
import CreateNewJobHeaderStepper from "@/features/jobs/components/create-new-job/create-new-job-header-stepper";
import JobFormCard from "@/features/jobs/components/create-new-job/job-form-card";

const CreateNewJobWrapper = () => {
  const [currentStep, setCurrentStep] = React.useState(2);
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
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-3 p-3">
        <CreateNewJobHeaderStepper
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
    </HeaderShell>
  );
};

export default CreateNewJobWrapper;
