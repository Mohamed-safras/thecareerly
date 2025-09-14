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
import { FieldError } from "@/types/form-errors";
import {
  RotateCcw,
  RotateCw,
  Sparkles,
  AlertCircle,
  Upload,
  X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setFieldErrors } from "@/store/slice/form-error-slice";
import { useSelector } from "react-redux";
import { selectFormFieldError } from "@/store/form-errors/form-error-selectors";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AIPosterGenerator from "./AI-poster-generator";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFileHandler } from "@/hooks/use-file-handler";
import { putFile, removeFile } from "@/lib/common/uploadsvault";
import { setLogoPreview as setLogoPreviewAction } from "@/store/slice/jobs-slice";
import { JobForm } from "@/types/job-form";
import { FORM_ID } from "@/constents/job-form";

const JobDescription = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(({ jobForm }) => jobForm as JobForm);

  const { title, description, companySite } = form;

  const lastAppliedRef = useRef<string | null>(null); // avoid re-applying same text

  const { generating, jobDescriptionOutput, generateJobDescription } =
    useAIGenerateJobDescription(form);
  const {
    files: logoFiles,
    previews: logoPreviews,
    onInputChange: onLogoInputChange,
    clearAll: clearLogoAll,
  } = useFileHandler({ multiple: false, maxFiles: 1 });

  const titleError = useSelector(selectFormFieldError(FORM_ID, "title"));

  const history = useUndoRedo<string>({ capacity: 100 });
  const logoFileRef = useRef<HTMLInputElement | null>(null);

  function handleUndo() {
    const prev = history.undo(description ?? "");
    if (prev !== description) dispatch(setFormMerge({ description: prev }));
  }

  function handleRedo() {
    const next = history.redo(description ?? "");
    if (next !== description) dispatch(setFormMerge({ description: next }));
  }

  function handleGenerateClick() {
    const fieldErrors: FieldError[] = [];
    if (!title && title.trim().length < 2) {
      dispatch(
        setFieldErrors({
          formId: FORM_ID,
          errors: [
            ...fieldErrors,
            {
              path: "title",
              message:
                "Job title is required and must be at least 2 characters.",
            },
          ],
        })
      );
    }

    history.record(description ?? "");
    generateJobDescription();
  }

  function clearLogo() {
    // clear hook state (previews & files)
    clearLogoAll();

    // clear vault + redux
    if (form.logoFileId) removeFile(form.logoFileId);
    dispatch(setFormMerge({ logoFileId: null }));
    dispatch(setLogoPreviewAction(null));

    // reset the file input so the same file can be chosen again
    if (logoFileRef.current) logoFileRef.current.value = "";
  }

  function handleLogoFilesChosen(list: FileList | null) {
    // update the generic hook (previews + internal files)
    onLogoInputChange(list);

    // always clear any previously stored vault file
    if (form.logoFileId) {
      removeFile(form.logoFileId);
      dispatch(setFormMerge({ logoFileId: null }));
      dispatch(setLogoPreviewAction(null));
    }

    // if a new file was chosen, store it in vault and set preview
    const file = list?.[0] ?? null;
    if (file) {
      const id = putFile(file); // keep File out of Redux
      const preview = URL.createObjectURL(file); // preview for other parts of UI if needed
      dispatch(setFormMerge({ logoFileId: id }));
      dispatch(setLogoPreviewAction(preview));
    }

    // IMPORTANT: allow re-selecting the same file again
    if (logoFileRef.current) logoFileRef.current.value = "";
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

          {titleError && (
            <Alert variant="destructive" className="text-sm">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {/* Render all validation messages */}

                <div>{titleError}</div>
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

        <div className="border p-4 space-y-2">
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={form.companyName || ""}
                  onChange={(e) =>
                    dispatch(setFormMerge({ companyName: e.target.value }))
                  }
                  placeholder="Your Company"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="site-link">Company Career Site Link</Label>
                <Input
                  id="site-link"
                  value={form.companySite || ""}
                  onChange={(e) =>
                    dispatch(setFormMerge({ companySite: e.target.value }))
                  }
                  placeholder="Your Company"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3">
                <Input
                  id="logo-upload"
                  ref={logoFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoFilesChosen(e.target.files)}
                />
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => logoFileRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {logoFiles.length
                    ? "Change Company Profile"
                    : "Add Company Profile"}
                </Button>
              </div>

              {/* preview */}
              {logoPreviews[0] && (
                <div className="relative my-2 w-40">
                  <AspectRatio ratio={16 / 9}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoPreviews[0]}
                      alt="Logo preview"
                      className="w-full h-auto border rounded"
                    />
                  </AspectRatio>
                  <Button
                    className="absolute top-1 right-1 rounded-full border shadow opacity-50 group-hover:opacity-100 transition cursor-pointer  w-6 h-6"
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={clearLogo}
                    aria-label="Remove logo"
                    title="Remove logo"
                    disabled={logoFiles.length === 0 && !form.logoFileId}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default JobDescription;
