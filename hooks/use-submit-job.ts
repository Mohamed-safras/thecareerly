// hooks/use-submit-job.ts
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FieldError } from "@/types/form-errors";
import { setFieldErrors } from "@/store/slice/form-error-slice";
import { FORM_ID } from "@/constents/job-form";
import { toast } from "sonner";
import { STATUS_TEXT } from "@/server/response/http-status";

export function useSubmitForm() {
  const [loading, setLoading] = useState(false);
  const [postingType, setPostingType] = useState<"draft" | "publish">("draft");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const {
    title,
    employmentType,
    workPreference,
    jobSeniority,
    minimumQualificationLevel,
    facilities,
    description,
    location,
    salary,
    scheduleDate,
    platforms,
    questions,
    selectionProcess,
    skills,
  } = useAppSelector(({ jobForm }) => jobForm);
  const dispatch = useAppDispatch();

  const formErrorHandler = () => {
    const fieldErrors: FieldError[] = [];
    if (!title) {
      fieldErrors.push({
        path: "title",
        message: "Title is required.",
      });
    }

    if (!location) {
      fieldErrors.push({
        path: "location",
        message: "Location is required.",
      });
    }

    if (!workPreference) {
      fieldErrors.push({
        path: "workPreference",
        message: "work preference is required",
      });
    }

    if (!employmentType) {
      fieldErrors.push({
        path: "employementType",
        message: "Employement type is required",
      });
    }

    if (!jobSeniority) {
      fieldErrors.push({
        path: "jobSeniority",
        message: "Job seniority is required",
      });
    }

    if (!minimumQualificationLevel) {
      fieldErrors.push({
        path: "minimumQualificationLevel",
        message: "Minimum Qualification Level is required",
      });
    }
    dispatch(
      setFieldErrors({
        formId: FORM_ID,
        errors: [...fieldErrors],
      })
    );
    console.log(fieldErrors);
    return fieldErrors;
  };

  const submit = async (postingType: "draft" | "publish" = "draft") => {
    console.log(postingType);
    const formData = new FormData();

    // always append a string (use empty string as fallback)
    formData.append("title", title);
    if (employmentType) formData.append("employmentType", employmentType);
    if (workPreference) formData.append("workPreference", workPreference);
    if (jobSeniority) formData.append("jobSeniority", jobSeniority);
    if (minimumQualificationLevel != null) {
      formData.append(
        "minimumQualificationLevel",
        String(minimumQualificationLevel)
      );
    }
    // stringify with a safe fallback so append always receives a string
    formData.append("facilities", JSON.stringify(facilities || []));
    formData.append("description", description ?? "");

    if (location != null) formData.append("location", String(location));

    formData.append("salary", JSON.stringify(salary ?? {}));

    if (scheduleDate != null)
      formData.append("scheduleDate", String(scheduleDate));

    formData.append("selectedPlatforms", JSON.stringify(platforms ?? []));

    formData.append("companyName", process.env.NEXT_PUBLIC_ORG_NAME! ?? "");

    formData.append("companySite", process.env.NEXT_PUBLIC_ORG_WEB_SITE! ?? "");

    formData.append("companyLogo", process.env.NEXT_PUBLIC_ORG_LOGO! ?? "");
    formData.append("questions", JSON.stringify(questions ?? []));
    formData.append("selectionProcess", JSON.stringify(selectionProcess ?? []));
    formData.append("postingType", postingType);
    // if (status != null) formData.append("status", String(status));
    // if (complianceStatus != null)
    //   formData.append("complianceStatus", String(complianceStatus));
    // formData.append("ai_content", JSON.stringify(ai_content ?? {}));
    // formData.append(
    //   "social_media_posts",
    //   JSON.stringify(social_media_posts ?? {})
    // );
    formData.append("skills", JSON.stringify(skills ?? []));

    // if (poster) formData.append("poster", poster);

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setPostingType(postingType);
      const response = await axios.post(
        "/api/employee/jobs/create-job",
        formData
      );
      setSuccess(true);
      if (
        (response && response.statusText === STATUS_TEXT[200]) ||
        response.statusText === STATUS_TEXT[201]
      ) {
        console.log(response.data);
        toast.success(response?.data?.message);
        return response.data;
      }
    } catch (err: unknown) {
      console.log(err);
      let message = "Something went wrong";
      if (axios.isAxiosError(err)) {
        console.log(err);
        message = err.response?.data?.message || err.message;
        toast.error(message);
      } else if (err instanceof Error) {
        message = err.message;
        toast.error(message);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    formErrorHandler,
    loading,
    error,
    success,
    postingType,
  };
}
