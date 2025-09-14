"use client";

import React, { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import Platforms from "@/components/platforms";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setForm as setFormMerge,
  togglePlatform as togglePlatformAction,
} from "@/store/slice/jobs-slice";

const SchedulePanel: React.FC = () => {
  // local UI state only (not in redux)
  const [posting, setPosting] = useState<
    "idle" | "queued" | "posting" | "done" | "error"
  >("idle");

  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm); // has logoFileId, etc.

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
        workPreference: "",
        salary: {
          min: "",
          max: "",
          currency: "",
          payPeriod: "",
        },
        companyName: "",
        employmentType: "",
      })
    );
  }

  return (
    <div className="space-y-4 border p-4 rounded">
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

        {posting !== "idle" && (
          <Button variant="secondary" onClick={resetFlow}>
            <RotateCcw />
            Reset
          </Button>
        )}

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => toast.success("Draft saved")}
          >
            Save Draft
          </Button>
          <Button onClick={handlePostNow}>
            {posting === "posting" ? (
              <>
                <PauseCircle className="h-4 w-4" /> Publishing...
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" /> Publish Now
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePanel;
