"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
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

import { useSubmitJobForm } from "@/hooks/use-submit-form";
import { ACTIONS } from "@/constents/actions";
import { JobForm } from "@/types/job-form";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface SchedulePanelProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  jobForm: JobForm;
  setFormMerge: ActionCreatorWithPayload<Partial<JobForm>>;
  togglePlatformAction: ActionCreatorWithPayload<string>;
  formErrorType: string;
}

const SchedulePanel = ({
  setCurrentStep,
  jobForm,
  setFormMerge,
  togglePlatformAction,
  formErrorType,
}: SchedulePanelProps) => {
  const dispatch = useAppDispatch();
  const formErrors = useAppSelector(({ formErrors }) => formErrors);
  const { loading, submit, postingType } = useSubmitJobForm({
    jobForm,
    formErrorType,
  });

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

  function resetFlow() {
    setPosting("idle");
    dispatch(
      setFormMerge({
        title: "",
        platforms: [],
        includeMultimedia: false,
        scheduleDate: "",
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
        employmentType: "",
      })
    );
    setCurrentStep(1);
  }

  console.log(formErrors);

  return (
    <div className="space-y-4 border p-4 rounded">
      <Platforms
        platforms={jobForm.platforms}
        togglePlatform={togglePlatform}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule (optional)</Label>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              id="schedule"
              type="datetime-local"
              value={jobForm.scheduleDate}
              onChange={(e) =>
                dispatch(setFormMerge({ scheduleDate: e.target.value }))
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
            disabled={
              Object.keys(formErrors.byForm[`${formErrorType}_basic_info`])
                .length > 0 &&
              Object.keys(formErrors.byForm[`${formErrorType}_job_description`])
                .length > 0
            }
            variant="outline"
            onClick={() => submit(ACTIONS.DRAFT, ACTIONS.CREATE)}
          >
            {loading && postingType === ACTIONS.DRAFT
              ? "Saving..."
              : "Save Draft"}
          </Button>
          <Button
            disabled={
              Object.keys(formErrors.byForm[`${formErrorType}_basic_info`])
                .length > 0 &&
              Object.keys(formErrors.byForm[`${formErrorType}_job_description`])
                .length > 0
            }
            onClick={() => submit(ACTIONS.PUBLISH, ACTIONS.CREATE)}
          >
            {loading && postingType === ACTIONS.PUBLISH ? (
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
