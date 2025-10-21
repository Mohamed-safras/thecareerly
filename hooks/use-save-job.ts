import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldError } from "@/types/form-errors";
import { setFieldErrors } from "@/store/slice/form-error-slice";
import { FORM_ID } from "@/constents/job-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveJob } from "@/store/slice/jobs-slice";
import { getJobsPath } from "@/constents/router-links";
import { getApiTokenWithSession } from "@/server/services/auth/get-api-token.service";
import { AxiosError } from "axios";
import { extractMessage } from "@/lib/http/axios-client";

export function useSubmitForm() {
  const router = useRouter();
  const [postingType, setPostingType] = useState<"DRAFT" | "PUBLISH">("DRAFT");

  const { jobForm, loading, error } = useAppSelector(({ jobs }) => jobs);
  const { user } = useAppSelector(({ user }) => user);
  const jobsPath = getJobsPath(user?.organizationId, user?.teamId);
  const dispatch = useAppDispatch();

  // ✅ Step-based error handlers
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

    dispatch(setFieldErrors({ formId: FORM_ID + "_basic_info", errors }));
    return errors;
  };

  const validateJobDescription = (): FieldError[] => {
    const errors: FieldError[] = [];

    if (!jobForm.description)
      errors.push({ path: "description", message: "description is required" });

    dispatch(setFieldErrors({ formId: FORM_ID + "_job_description", errors }));
    return errors;
  };

  // ✅ Validate current step only
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

  // ✅ Full form submission
  const submit = async (type: "DRAFT" | "PUBLISH") => {
    console.log("Submitting form with type:", type);
    const errors = [...validateBasicInfo(), ...validateJobDescription()];
    if (errors.length > 0) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    // Map PUBLISH to OPEN for the status field
    const statusValue = type === "PUBLISH" ? "OPEN" : "DRAFT";
    setPostingType(type);

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

    formData.append(
      "scheduleDate",
      new Date(jobForm.scheduleDate).toISOString().slice(0, 16)
    ); // "YYYY-MM-DDTHH:mm"

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

    formData.append("organizationSite", "https://www.acentura.com");

    formData.append("organizationLogo", process.env.NEXT_PUBLIC_APP_LOGO || "");

    formData.append("status", statusValue);

    formData.append("postingType", postingType);

    try {
      const token = await getApiTokenWithSession();

      const result = await dispatch(saveJob({ formData, token })).unwrap();

      toast.success(
        type === "PUBLISH"
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
    loading,
    error,
    postingType,
  };
}
