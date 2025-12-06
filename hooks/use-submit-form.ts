import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldError } from "@/types/form-errors";
import { setFieldErrors } from "@/store/slice/form-error-slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createJob, updateJob } from "@/store/slice/jobs-slice";
import { AxiosError } from "axios";
import { extractMessage } from "@/lib/http/axios-client";
import { getJobsPath } from "@/lib/utils";
import { ACTIONS } from "@/constents/actions";
import { JobForm } from "@/types/job-form";

export function useSubmitJobForm({
  jobForm,
  formErrorType,
}: {
  jobForm: JobForm;
  formErrorType: string;
}) {
  const [postingType, setPostingType] = useState<
    ACTIONS.DRAFT | ACTIONS.PUBLISH
  >(ACTIONS.DRAFT);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector(({ auth }) => auth);
  const jobsPath = user && getJobsPath(user.organizationId, user.teamId);
  const { loading, error } = useAppSelector(({ jobs }) => jobs);

  const validateBasicInfo = (): FieldError[] => {
    const errors: FieldError[] = [];

    if (!jobForm.title)
      errors.push({ path: "title", message: "Title is required." });
    if (!jobForm.location)
      errors.push({ path: "location", message: "Location is required." });
    if (!jobForm.workPreference)
      errors.push({
        path: "workPreference",
        message: "Work preference is required",
      });
    if (!jobForm.employmentType)
      errors.push({
        path: "employmentType",
        message: "Employment type is required",
      });
    if (!jobForm.jobSeniority)
      errors.push({
        path: "jobSeniority",
        message: "Job seniority is required",
      });
    if (!jobForm.minimumQualificationLevel)
      errors.push({
        path: "minimumQualificationLevel",
        message: "Minimum Qualification Level is required",
      });

    dispatch(setFieldErrors({ formId: formErrorType + "_basic_info", errors }));
    return errors;
  };

  const validateJobDescription = (): FieldError[] => {
    const errors: FieldError[] = [];

    if (!jobForm.description)
      errors.push({ path: "description", message: "description is required" });

    dispatch(
      setFieldErrors({ formId: formErrorType + "_job_description", errors })
    );
    return errors;
  };

  const validateSelectionProcess = (): FieldError[] => {
    const errors: FieldError[] = [];
    if (
      !Array.isArray(jobForm.selectionProcess) ||
      jobForm.selectionProcess.some(
        (item) =>
          typeof item !== "object" || item === null || Array.isArray(item)
      )
    ) {
      errors.push({
        path: "selectionProcess",
        message: "Expected object(s) in selectionProcess",
      });
    }
    dispatch(
      setFieldErrors({ formId: formErrorType + "_selection_process", errors })
    );
    return errors;
  };

  const validateStep = (step: number): FieldError[] => {
    switch (step) {
      case 1:
        return validateBasicInfo();
      case 2:
        return validateJobDescription();
      default:
        return [];
    }
  };

  const submit = async (
    JobsState: ACTIONS.DRAFT | ACTIONS.PUBLISH,
    submissionType: string
  ) => {
    const errors = [
      ...validateBasicInfo(),
      ...validateJobDescription(),
      ...validateSelectionProcess(),
    ];

    if (errors.length > 0) {
      console.log("Form submission blocked due to validation errors:", errors);
      toast.error("Please fix the form errors before submitting");
      return;
    }

    // Map PUBLISH to OPEN for the status field
    const statusValue =
      JobsState === ACTIONS.PUBLISH ? ACTIONS.OPEN : ACTIONS.DRAFT;
    setPostingType(JobsState);

    const formData = new FormData();

    formData.append("title", jobForm.title);
    formData.append("location", jobForm.location);
    formData.append("workPreference", jobForm.workPreference);
    formData.append("employmentType", jobForm.employmentType);
    formData.append("jobSeniority", jobForm.jobSeniority);

    formData.append(
      "minimumQualificationLevel",
      jobForm.minimumQualificationLevel
    );

    formData.append("description", jobForm.description);

    formData.append("scheduleDate", jobForm.scheduleDate); // "YYYY-MM-DDTHH:mm"

    jobForm.facilities.forEach((facility) => {
      formData.append("facilities[]", facility);
    });

    formData.append("salary", JSON.stringify(jobForm.salary));

    jobForm.platforms.forEach((platform) => {
      formData.append("selectedPlatforms[]", platform);
    });

    jobForm.questions.forEach((question) => {
      formData.append("questions[]", JSON.stringify(question));
    });

    jobForm.selectionProcess.forEach((process) => {
      formData.append("selectionProcess[]", JSON.stringify(process));
    });

    jobForm.skills.forEach((skill) => {
      formData.append("skills[]", skill);
    });

    formData.append("status", statusValue);

    formData.append("postingType", postingType);

    try {
      const token = "dad";

      const result = await dispatch(
        submissionType === ACTIONS.CREATE
          ? createJob({ formData, token })
          : updateJob({ formData, token })
      ).unwrap();

      toast.success(
        JobsState === ACTIONS.PUBLISH
          ? "Job published successfully!"
          : "Draft saved successfully!"
      );
      router.push(jobsPath ? jobsPath : "#");
      return result;
    } catch (error: unknown) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof AxiosError
          ? extractMessage(error.response?.data, error.response?.status)
          : "Failed to save job. Please try again.";

      toast.error(message);
    }
  };

  return {
    submit,
    validateStep,
    validateBasicInfo,
    validateJobDescription,
    validateSelectionProcess,
    loading,
    error,
    postingType,
  };
}
