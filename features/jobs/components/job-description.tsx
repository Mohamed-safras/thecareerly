"use client";

import { Button } from "@/components/ui/button";
import { AnimatedIconButton } from "@/components/animatediconbutton";
import CircleSpinner from "@/components/circlespinner";
import useAIGenerateJobDescription from "@/features/jobs/hooks/use-ai-generate-Job-description";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlertCircle, RotateCcw, RotateCw, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AIPosterGenerator from "./AI-poster-generator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setFieldErrors } from "@/store/slice/form-error-slice";
import { JobFormData } from "@/interfaces/job";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import MarkdownEditor from "@/components/mark-down-editor";

export interface JobDescriptionProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
  formErrorType: string;
}

const JobDescription = ({
  jobForm,
  setFormMerge,
  formErrorType,
}: JobDescriptionProps) => {
  const dispatch = useAppDispatch();
  const { byForm } = useAppSelector(({ formErrors }) => formErrors);

  const { description } = jobForm;

  const { generating, generateJobDescription } = useAIGenerateJobDescription({
    jobForm,
    setFormMerge,
  });

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
    dispatch(setFormMerge({ description: "" }));
    generateJobDescription();
  }

  return (
    <ScrollArea className="max-h-[600px] overflow-y-auto">
      <div className="relative space-y-3 border p-3 rounded-lg">
        <h2 className="text-lg font-semibold">
          Job Description & Poster Generation
        </h2>
        <Separator />

        <div>
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

          <div className="relative mb-2" id="description">
            <MarkdownEditor
              value={description}
              onChange={(v) => {
                if (!v) {
                  dispatch(
                    setFieldErrors({
                      // need to change this to a constant
                      formId: "create_job_description",
                      errors: [
                        {
                          path: "description",
                          message: "description is required",
                        },
                      ],
                    }),
                  );
                }
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

            {!generating && (
              <div className="absolute right-12 bottom-18 z-10">
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
            )}
          </div>

          {byForm?.[`${formErrorType}_job_description`]?.description && (
            <Alert variant="destructive" className="h-fit text-sm  p-2">
              <AlertCircle className="h-4 w-4" />

              <AlertDescription>
                {byForm[`${formErrorType}_job_description`].description}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="border p-4 space-y-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="include-multimedia">
                Want to generate poster
              </Label>
              <div id="include-multimedia" className="flex items-center gap-2">
                <Switch
                  checked={jobForm.includeMultimedia}
                  onCheckedChange={(v) =>
                    dispatch(setFormMerge({ includeMultimedia: v }))
                  }
                />
                <span className="text-sm text-muted-foreground">
                  Logos, banners
                </span>
              </div>
            </div>
          </div>

          {jobForm.includeMultimedia && (
            <AIPosterGenerator jobForm={jobForm} setFormMerge={setFormMerge} />
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default JobDescription;
