"use client";

import React, { useRef, useState } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Calendar,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { setLogoPreview as setLogoPreviewAction } from "@/features/jobs/jobs-slice";

import Platforms from "@/components/platforms";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setForm as setFormMerge,
  togglePlatform as togglePlatformAction,
} from "@/features/jobs/jobs-slice";
import { Switch } from "@/components/ui/switch";
import AIAssistPanel from "./AI-poster-generator";
import { useFileHandler } from "@/hooks/use-file-handler";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { putFile, removeFile } from "@/lib/common/uploadsvault";
// import Image from "next/image";

const SchedulePanel: React.FC = () => {
  // local UI state only (not in redux)
  const [posting, setPosting] = useState<
    "idle" | "queued" | "posting" | "done" | "error"
  >("idle");

  const logoFileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm); // has logoFileId, etc.

  const {
    files: logoFiles,
    previews: logoPreviews,
    onInputChange: onLogoInputChange,
    clearAll: clearLogoAll,
  } = useFileHandler({ multiple: false, maxFiles: 1 });

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

  // pure action (NO function payloads)
  function togglePlatform(key: string) {
    dispatch(togglePlatformAction(key));
  }

  function handleApproveAndQueue() {
    setPosting("queued");
    toast("Content approved and queued for publishing (demo)");
  }

  async function handlePostNow() {
    try {
      setPosting("posting");
      // simulate async work
      await new Promise((res) => setTimeout(res, 1200));
      setPosting("done");
      toast.success("Posted to selected platforms (demo)");
    } catch {
      setPosting("error");
      toast.error("Failed to post (demo)");
    }
  }

  function resetFlow() {
    setPosting("idle");
    clearLogo();
    dispatch(
      setFormMerge({
        title: "",
        platforms: [],
        includeMultimedia: false,
        schedule: "",
        logoFileId: null,
        logoPreview: null,

        description: "",
        posterNotes: "",
        posterVibe: "",
        brandColorHex: "",
        location: "",
        workArragement: "",
        salaryMax: "",
        salaryMin: "",
        currency: "",
        companyName: "",
        employmentType: "",
      })
    );
  }

  return (
    <div className="mt-4 space-y-4 border p-4 rounded">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
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

            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={clearLogo}
              aria-label="Remove logo"
              title="Remove logo"
              disabled={logoFiles.length === 0 && !form.logoFileId}
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>

          {/* preview */}
          {logoPreviews[0] && (
            <div className="mt-2 w-40">
              <AspectRatio ratio={16 / 9}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoPreviews[0]}
                  alt="Logo preview"
                  className="w-full h-auto border rounded"
                />
              </AspectRatio>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="include-multimedia">Include Multimedia</Label>
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

      {form.includeMultimedia && <AIAssistPanel />}

      <Platforms platforms={form.platforms} togglePlatform={togglePlatform} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule (optional)</Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              id="schedule"
              type="datetime-local"
              value={form.schedule}
              onChange={(e) =>
                dispatch(setFormMerge({ schedule: e.target.value }))
              }
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank to post immediately.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button className="gap-2" onClick={handleApproveAndQueue}>
          <CheckCircle2 className="h-4 w-4" /> Approve &amp; Queue
        </Button>

        <Button variant="outline" className="gap-2" onClick={handlePostNow}>
          {posting === "posting" ? (
            <>
              <PauseCircle className="h-4 w-4" /> Posting…
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" /> Post No w (demo)
            </>
          )}
        </Button>

        {posting !== "idle" && (
          <Button variant="secondary" onClick={resetFlow}>
            <RotateCcw />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default SchedulePanel;
