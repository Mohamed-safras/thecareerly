"use client";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MarkdownEditor from "@/components/markdowneditor";
import { AnimatedIconButton } from "@/components/animatediconbutton";
import CircleSpinner from "@/components/circlespinner";
import useAIGenerateJobDescription from "@/hooks/use-ai-generate-Job-description";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/features/jobs/jobs-slice";
import { FormErrors } from "@/types/form-errors";
import { RotateCcw, RotateCw, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const JobDescription = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm);

  const { title, description } = form;

  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const lastAppliedRef = useRef<string | null>(null); // avoid re-applying same text

  const { generating, jobDescriptionOutput, generateJobDescription } =
    useAIGenerateJobDescription(form);

  const history = useUndoRedo<string>({ capacity: 100 });

  function handleUndo() {
    const prev = history.undo(description ?? "");
    if (prev !== description) dispatch(setFormMerge({ description: prev }));
  }

  function handleRedo() {
    const next = history.redo(description ?? "");
    if (next !== description) dispatch(setFormMerge({ description: next }));
  }

  function handleGenerateClick() {
    console.log("Generate clicked");
    const e = validateForAI();
    setErrors(e);

    console.log("Validation errors:", e);
    if (Object.keys(e).length) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);

    history.record(description ?? "");
    generateJobDescription();
  }

  function validateForAI(): FormErrors {
    const e: FormErrors = {};
    if (!title?.trim()) e.title = "Job title is required to generate.";
    else if (title.trim().length < 2)
      e.title = "Title must be at least 2 characters.";
    return e;
  }

  useEffect(() => {
    if (!generating && jobDescriptionOutput) {
      if (lastAppliedRef.current === jobDescriptionOutput) return; // avoid reapply
      lastAppliedRef.current = jobDescriptionOutput;
      dispatch(setFormMerge({ description: jobDescriptionOutput }));
    }
  }, [generating, jobDescriptionOutput, dispatch]);

  const hasBlockingErrors = showErrors && Object.keys(errors).length > 0;
  console.log(generating);
  return (
    <div className="relative space-y-1.5 border p-4 rounded-lg">
      <fieldset id="description-label">Job Brief</fieldset>

      <div className="flex justify-end items-center gap-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Undo"
          onClick={handleUndo}
          disabled={!history.canUndo || generating}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Redo"
          onClick={handleRedo}
          disabled={!history.canRedo || generating}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      {/* ✅ Error alert (shadcn) */}
      {hasBlockingErrors && (
        <Alert variant="destructive" className="text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Can’t generate description</AlertTitle>
          <AlertDescription>
            {/* Render all validation messages */}
            {Object.values(errors).map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="relative" id="description">
        <MarkdownEditor
          value={description}
          onChange={(v) => {
            if (!generating && (description ?? "") !== v) {
              history.record(description ?? "");
            }
            dispatch(setFormMerge({ description: v }));
          }}
          classNames="relative bg-transparent"
        />

        {generating && (
          <div className="absolute inset-0 backdrop-blur-xs flex items-center justify-center rounded-lg">
            <CircleSpinner size={56} />
          </div>
        )}
      </div>

      <div className="absolute right-12 bottom-18">
        <AnimatedIconButton
          label={generating ? "Generating…" : "Rewrite with AI"}
          icon={<Sparkles className="h-4 w-4" />}
          animation="bounce"
          scaleDelta={0.01}
          yDelta={1}
          tiltDeg={2}
          onClick={handleGenerateClick}
          disabled={generating}
        />
      </div>
    </div>
  );
};

export default JobDescription;
