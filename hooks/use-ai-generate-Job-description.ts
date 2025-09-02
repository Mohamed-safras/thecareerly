import { AIPromptInput } from "@/types/GenAITypes";
import { JobForm } from "@/types/job";
import { useMemo, useState } from "react";

const useAIGenerateJobDescription = (form: JobForm) => {
  const [generating, setGenerating] = useState(false);
  const [jobDescriptionOutput, setJobDescriptionOutput] = useState("");

  const aiPromptInputs: AIPromptInput = useMemo(
    () => ({
      title: form.title?.trim() || "",
      description: form.description?.trim() || "",
    }),
    [form.title, form.description]
  );

  async function generateJobDescription() {
    if (!aiPromptInputs.title) {
      return;
    }

    setGenerating(true);
    setJobDescriptionOutput("Generating job description...");

    try {
      const res = await fetch("/api/gen-ai-description", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: "jd", payload: aiPromptInputs }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setJobDescriptionOutput(`Error: ${data?.error || "Request failed"}`);
        return;
      }
      setJobDescriptionOutput(data.text || "");
    } catch {
      setJobDescriptionOutput("Error: network/server");
    } finally {
      setGenerating(false);
    }
  }

  return {
    generating,
    jobDescriptionOutput,
    generateJobDescription,
  };
};

export default useAIGenerateJobDescription;
