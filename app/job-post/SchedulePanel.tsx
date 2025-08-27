import Platforms, { platformMeta } from "@/components/Platforms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Calendar,
  CheckCircle2,
  Globe,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { toast } from "sonner";
import { JobForm } from "@/types/jobform";

export interface SchedulePanelProps {
  form: JobForm;
  setForm: React.Dispatch<React.SetStateAction<JobForm>>;
}

const SchedulePanel: React.FC<SchedulePanelProps> = ({ form, setForm }) => {
  const [posting, setPosting] = useState<
    "idle" | "queued" | "posting" | "done" | "error"
  >("idle");

  function togglePlatform(key: string) {
    setForm((prev) => {
      const has = prev.platforms.includes(key);
      return {
        ...prev,
        platforms: has
          ? prev.platforms.filter((k) => k !== key)
          : [...prev.platforms, key],
      };
    });
  }

  function handleApproveAndQueue() {
    setPosting("queued");
    toast("Content approved and queued for publishing (demo)");
  }

  async function handlePostNow() {
    try {
      setPosting("posting");
      // Simulate async work
      await new Promise((res) => setTimeout(res, 1200));
      setPosting("done");
      toast.success("Posted to selected platforms (demo)");
    } catch (e) {
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
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Leave blank to post immediately.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Destination</Label>
          <div className="flex flex-wrap gap-2">
            {form.platforms.length ? (
              form.platforms.map((p) => (
                <Badge key={p} variant="secondary" className="gap-1">
                  {platformMeta[p]?.icon}
                  <span>{platformMeta[p]?.label}</span>
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="gap-1">
                <Globe className="h-3.5 w-3.5" /> None selected
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div>
        <Platforms platforms={form.platforms} togglePlatform={togglePlatform} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button className="gap-2" onClick={handleApproveAndQueue}>
          <CheckCircle2 className="h-4 w-4" /> Approve & Queue
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
