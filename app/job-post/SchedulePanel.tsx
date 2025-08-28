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
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import Platforms from "@/components/platforms";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setForm as setFormMerge,
  togglePlatform as togglePlatformAction,
} from "@/store/jobFormSlice";
import { Switch } from "@/components/ui/switch";
import useFileHandler from "@/hooks/useFileHandler";

const SchedulePanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm);
  const { handleFileChange } = useFileHandler(form.logoFileId);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // local UI state only (not in redux)
  const [posting, setPosting] = useState<
    "idle" | "queued" | "posting" | "done" | "error"
  >("idle");

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
  }

  return (
    <TabsContent value="schedule" className="mt-4 space-y-4">
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

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="company-logo">Company Logo</Label>
          <div id="company-logo" className="flex items-center gap-3">
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-4 w-4" /> Upload
            </Button>
          </div>
        </div>
      </div>

      <Platforms platforms={form.platforms} togglePlatform={togglePlatform} />

      <div className="flex flex-wrap gap-2">
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
              <PlayCircle className="h-4 w-4" /> Post Now (demo)
            </>
          )}
        </Button>

        {posting !== "idle" && (
          <Button variant="ghost" onClick={resetFlow}>
            Reset
          </Button>
        )}
      </div>
    </TabsContent>
  );
};

export default SchedulePanel;
