"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import MarkdownEditor from "@/components/markdowneditor";
import { AnimatedIconButton } from "@/components/animatediconbutton";
import CircleSpinner from "@/components/circlespinner";
import useAIGenerateJobDescription from "@/hooks/use-ai-generate-Job-description";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/store/slice/jobs-slice";
import { RotateCcw, RotateCw, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AIPosterGenerator from "./AI-poster-generator";
import { JobForm } from "@/types/job-form";

const JobDescription = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(({ jobForm }) => jobForm as JobForm);

  const { description } = form;

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
    history.record(description ?? "");
    generateJobDescription();
  }

  useEffect(() => {
    if (!generating && jobDescriptionOutput) {
      if (lastAppliedRef.current === jobDescriptionOutput) return; // avoid reapply
      lastAppliedRef.current = jobDescriptionOutput;
      dispatch(setFormMerge({ description: jobDescriptionOutput }));
    }
  }, [generating, jobDescriptionOutput, dispatch]);

  return (
    <ScrollArea className="max-h-[600px] overflow-y-scroll">
      <div className="relative space-y-2 border p-4 rounded-lg">
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
        </div>

        <div className="border p-4 space-y-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="include-multimedia">
                Want to generate poster
              </Label>
              <div id="include-multimedia" className="flex items-center gap-2">
                <Switch
                  checked={form.includeMultimedia}
                  onCheckedChange={(v) =>
                    dispatch(setFormMerge({ includeMultimedia: v }))
                  }
                />
                <span className="text-sm text-muted-foreground">
                  Logos, banners, videos
                </span>
              </div>
            </div>
          </div>

          {form.includeMultimedia && <AIPosterGenerator />}
        </div>
      </div>
    </ScrollArea>
  );
};

export default JobDescription;
