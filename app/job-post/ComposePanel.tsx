"use client";

import React, { useEffect, useRef, useState } from "react";
import MarkdownEditor from "@/components/markdowneditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";
import { TabsContent } from "@radix-ui/react-tabs";
import { Sparkles, RotateCcw, RotateCw } from "lucide-react";

import { Combobox, type ComboItem } from "@/components/combobox";
import { localStoreGet, localStoreSet } from "@/lib/localstore";
import { slugify } from "@/lib/common/common";
import { jobTitleOptions } from "@/data/jobtitles";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/store/jobFormSlice";

import { AnimatedIconButton } from "@/components/animatediconbutton";
import { EMPLOYMENT_TYPES, employmentTypeValue } from "@/data/employmentTypes";
import {
  workArragementTypeValue,
  WORKARRANGMENTS_TYPES,
} from "@/data/workArrangments";
import useAIGenerateJobDescription from "@/hooks/useAIGenerateJobDescription";
import CircleSpinner from "@/components/circlespinner";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { FormErrors } from "@/types/formErrors";

const LOCAL_STORE_KEY = "job_title_options";

const ComposePanel: React.FC = () => {
  const [titleOptions, setTitleOptions] =
    useState<ComboItem[]>(jobTitleOptions);

  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const lastAppliedRef = useRef<string | null>(null); // avoid re-applying same text

  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm);
  const { generating, jobDescriptionOutput, generateJobDescription } =
    useAIGenerateJobDescription(form);
  const history = useUndoRedo<string>({ capacity: 100 });

  const {
    title,
    employmentType,
    workArragement,
    location,
    description,
    salaryMin,
    salaryMax,
    currency,
  } = form;

  function handleUndo() {
    const prev = history.undo(description ?? "");
    if (prev !== description) dispatch(setFormMerge({ description: prev }));
  }

  function handleRedo() {
    const next = history.redo(description ?? "");
    if (next !== description) dispatch(setFormMerge({ description: next }));
  }

  function onCreate(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;

    const existing = titleOptions.find(
      (o) => o.label.toLowerCase().trim() === trimmed.toLowerCase()
    );
    if (existing) {
      dispatch(setFormMerge({ title: existing.label }));
      return existing;
    }

    const newItem: ComboItem = {
      value: slugify(trimmed) || trimmed,
      label: trimmed,
    };
    setTitleOptions((prev) => [...prev, newItem]);
    dispatch(setFormMerge({ title: trimmed }));
    return newItem;
  }

  function validateForAI(): FormErrors {
    const e: FormErrors = {};
    if (!title?.trim()) e.title = "Job title is required to generate.";
    else if (title.trim().length < 2)
      e.title = "Title must be at least 2 characters.";
    return e;
  }

  function handleGenerateClick() {
    const e = validateForAI();
    setErrors(e);
    if (Object.keys(e).length) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);

    history.record(description ?? "");
    generateJobDescription();
  }

  // load & persist titles (localStorage)
  useEffect(() => {
    const stored = localStoreGet<ComboItem[]>(LOCAL_STORE_KEY, []);
    const safeStored = Array.isArray(stored) ? stored : [];
    const byLabel = new Map<string, ComboItem>();
    for (const it of jobTitleOptions) byLabel.set(it.label.toLowerCase(), it);
    for (const it of safeStored) {
      if (it && typeof it.label === "string" && typeof it.value === "string") {
        byLabel.set(it.label.toLowerCase(), it);
      }
    }
    setTitleOptions(Array.from(byLabel.values()));
  }, []);
  useEffect(() => {
    localStoreSet<ComboItem[]>(LOCAL_STORE_KEY, titleOptions);
  }, [titleOptions]);

  // Auto-apply AI output into Description (replace), with duplicate guard
  useEffect(() => {
    if (!generating && jobDescriptionOutput) {
      if (lastAppliedRef.current === jobDescriptionOutput) return; // avoid reapply
      lastAppliedRef.current = jobDescriptionOutput;
      dispatch(setFormMerge({ description: jobDescriptionOutput }));
    }
  }, [generating, jobDescriptionOutput, dispatch]);

  const hasError = (k: keyof FormErrors) => Boolean(errors[k]);
  const show = (k: keyof FormErrors) => showErrors && hasError(k);

  return (
    <TabsContent value="compose" className="mt-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="job-title">Job Title</Label>
          <Combobox
            id="job-title"
            items={titleOptions}
            value={titleOptions.find((o) => o.label === title)?.value ?? null}
            onChange={(_, item) =>
              dispatch(setFormMerge({ title: item?.label ?? "" }))
            }
            allowCreate
            onCreate={onCreate}
            placeholder="Select title..."
            inputPlaceholder="Search titles..."
            emptyMessage="No matching titles."
            createPrefix="Create"
            matchTriggerWidth
            className={`w-full ${
              show("title")
                ? "border-destructive ring-destructive/20 ring-[3px]"
                : ""
            }`}
            contentClassName="w-full"
          />
          {show("title") && (
            <p id="job-title-error" className="text-xs text-destructive mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) =>
              dispatch(setFormMerge({ location: e.target.value }))
            }
            placeholder="Add location..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 items-baseline md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="jobtype">Job Type</Label>
          <Select
            value={employmentType as employmentTypeValue | undefined}
            onValueChange={(v) =>
              dispatch(
                setFormMerge({ employmentType: v as employmentTypeValue })
              )
            }
          >
            <SelectTrigger id="jobtype" className="w-full">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_TYPES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="work-arragement">Work Arrangement</Label>
          <Select
            value={workArragement as workArragementTypeValue | undefined}
            onValueChange={(v) =>
              dispatch(
                setFormMerge({ workArragement: v as workArragementTypeValue })
              )
            }
          >
            <SelectTrigger id="work-arragement" className="w-full">
              <SelectValue placeholder="Select work arrangement..." />
            </SelectTrigger>
            <SelectContent>
              {WORKARRANGMENTS_TYPES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="salaryMin">Salary Range (optional)</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              id="salaryMin"
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={salaryMin}
              onChange={(e) =>
                dispatch(setFormMerge({ salaryMin: e.target.value }))
              }
            />
            <Input
              id="salaryMax"
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={salaryMax}
              onChange={(e) =>
                dispatch(setFormMerge({ salaryMax: e.target.value }))
              }
            />
            <Input
              id="currency"
              placeholder="Currency (e.g., USD)"
              value={currency}
              onChange={(e) =>
                dispatch(setFormMerge({ currency: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <div className="relative space-y-1.5">
        <div className="flex items-center justify-between">
          <Label id="description-label" htmlFor="description">
            Description
          </Label>
          <div className="flex items-center gap-1.5">
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
        </div>

        <div className="relative">
          <MarkdownEditor
            value={description}
            onChange={(v) => {
              if (!generating && (description ?? "") !== v) {
                history.record(description ?? "");
              }
              dispatch(setFormMerge({ description: v }));
            }}
            classNames="relative"
          />

          {generating && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <CircleSpinner size={56} />
            </div>
          )}
        </div>

        <div className="absolute right-12 bottom-14">
          <AnimatedIconButton
            label={generating ? "Generating…" : "Rewrite with AI"}
            icon={<Sparkles className="h-4 w-4" />}
            animation="bounce"
            scaleDelta={0.01}
            yDelta={1}
            tiltDeg={2}
            onClick={handleGenerateClick}
            disabled={generating}
            busy={generating}
          />
        </div>
      </div>

      <Separator className="my-2" />
    </TabsContent>
  );
};

export default ComposePanel;
