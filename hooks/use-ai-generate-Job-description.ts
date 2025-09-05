import { axiosClient } from "@/lib/axios/axios-client";
import { AIPromptInput } from "@/types/gen-AI-types";
import { JobForm } from "@/types/job";
import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { extractStatusAndMessage } from "@/lib/error/error-message-extractor";

const useAIGenerateJobDescription = (form: JobForm) => {
  const [generating, setGenerating] = useState(false);
  const [jobDescriptionOutput, setJobDescriptionOutput] = useState<
    string | undefined
  >("");
  const [error, setError] = useState<string | null>(null);

  const aiPromptInputs: AIPromptInput = useMemo(
    () => ({
      title: form.title?.trim() || "",
      description: form.description?.trim() || "",
    }),
    [form.title, form.description]
  );

  async function generateJobDescription() {
    if (!aiPromptInputs.title) return;

    setGenerating(true);
    setError(null);

    try {
      const { data } = await axiosClient.post<{ type: string; text: string }>(
        "/generate-jd",
        { payload: aiPromptInputs }
      );

      setJobDescriptionOutput(data.text || "");
      toast.success("Job description generated successfully");
    } catch (err: unknown) {
      const { status, message } = extractStatusAndMessage(err);

      if (status === 429) {
        console.log("return 429");
        // Try to read Retry-After if present (Axios lower-cases headers)
        const retryAfter = axios.isAxiosError(err)
          ? Number(err.response?.headers?.["retry-after"])
          : NaN;

        if (Number.isFinite(retryAfter) && retryAfter > 0) {
          const msg = `Rate limit hit. Try again in ~${retryAfter} seconds.`;
          setError(msg);
          toast.error(msg);
        } else {
          const msg = "Rate limit hit. Please wait a bit and retry.";
          setError(msg);
          toast.error(msg);
        }
      } else if (status && status >= 400 && status < 500) {
        const msg = message || "Request failed.";
        setError(msg);
      } else {
        const msg = "Failed to generate job description";
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setGenerating(false);
    }
  }

  return {
    generating,
    jobDescriptionOutput,
    generateJobDescription,
    error,
  };
};

export default useAIGenerateJobDescription;
