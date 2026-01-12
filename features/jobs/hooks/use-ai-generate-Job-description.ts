import { JobForm } from "@/interfaces/job";
import { useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { extractStatusAndMessage } from "@/lib/error/error-message-extractor";
import { GENERATE_JOB_DESCRIPTION_API } from "@/constents/router-links";
import { AIPromptInput } from "@/types/gen-AI";
import { useAppDispatch } from "@/store/hooks";
import { AI_AGENT_SERVICE_ENDPOINTS } from "@/constents/api-end-points";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface AIGenerateJobDescriptionProps {
  jobForm: JobForm;
  setFormMerge: ActionCreatorWithPayload<Partial<JobForm>>;
}

const useAIGenerateJobDescription = ({
  jobForm,
  setFormMerge,
}: AIGenerateJobDescriptionProps) => {
  const dispatch = useAppDispatch();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    title,
    location,
    employmentType,
    workPreference,
    minimumQualificationLevel,
    jobSeniority,
    facilities,
  } = jobForm;

  const aiPromptInputs: AIPromptInput = useMemo(
    () => ({
      title,
      location,
      employmentType,
      workPreference,
      qualification: minimumQualificationLevel,
      seniority: jobSeniority,
      facilities,
      applyUrl: process.env.NEXT_PUBLIC_ORG_WEB_SITE!,
    }),
    [
      title,
      facilities,
      location,
      employmentType,
      workPreference,
      minimumQualificationLevel,
      jobSeniority,
    ]
  );

  const generateJobDescription = useCallback(async () => {
    console.log(GENERATE_JOB_DESCRIPTION_API);

    if (!aiPromptInputs.title) {
      toast.error("Job title is required");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const response = await fetch(
        AI_AGENT_SERVICE_ENDPOINTS.GENERATE_JOB_DESCRIPTION,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: aiPromptInputs }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to connect to AI server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        dispatch(setFormMerge({ description: result }));
      }

      toast.success("Job description generated successfully");
    } catch (err: unknown) {
      const { status, message } = extractStatusAndMessage(err);

      let errorMsg: string;
      if (status === 408 || message?.includes("timeout")) {
        errorMsg = "Request timed out. Please try again.";
      } else if (status && status >= 400 && status < 500) {
        errorMsg = message || "Invalid request. Please check your inputs.";
      } else if (status && status >= 500) {
        errorMsg = "Server error. Please try again later.";
      } else {
        errorMsg = message || "Failed to generate job description";
      }

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setGenerating(false);
    }
  }, [aiPromptInputs, dispatch, setFormMerge]);

  return {
    generating,
    generateJobDescription,
    error,
  };
};

export default useAIGenerateJobDescription;
