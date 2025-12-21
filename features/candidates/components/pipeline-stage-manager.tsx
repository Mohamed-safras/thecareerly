import { useState } from "react";
import {
  ChevronRight,
  Check,
  Clock,
  AlertCircle,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stage {
  id: string;
  name: string;
  status: "completed" | "current" | "upcoming" | "skipped";
  completedAt?: string;
  duration?: string;
}

const pipelineStages: Stage[] = [
  {
    id: "1",
    name: "Application Review",
    status: "completed",
    completedAt: "Dec 10, 2024",
    duration: "2 days",
  },
  {
    id: "2",
    name: "HR Screening",
    status: "completed",
    completedAt: "Dec 14, 2024",
    duration: "4 days",
  },
  {
    id: "3",
    name: "Technical Interview",
    status: "current",
  },
  {
    id: "4",
    name: "Final Round",
    status: "upcoming",
  },
  {
    id: "5",
    name: "Offer",
    status: "upcoming",
  },
  {
    id: "6",
    name: "Hired",
    status: "upcoming",
  },
];

const rejectionReasons = [
  "Not enough experience",
  "Skill mismatch",
  "Cultural fit concerns",
  "Compensation expectations too high",
  "Better candidates in pipeline",
  "Failed technical assessment",
  "Candidate withdrew",
  "Other",
];

export const PipelineStageManager = () => {
  const [stages, setStages] = useState(pipelineStages);
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const currentStageIndex = stages.findIndex((s) => s.status === "current");
  const currentStage = stages[currentStageIndex];
  const nextStage = stages[currentStageIndex + 1];

  const handleMoveToNext = () => {
    setIsMoveDialogOpen(false);
    // Logic to move candidate to next stage
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Pipeline Progress</h3>
          <p className="text-sm text-muted-foreground">
            Currently in:{" "}
            <span className="font-medium text-primary">
              {currentStage?.name}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => setIsRejectDialogOpen(true)}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
          <Button
            size="sm"
            onClick={() => setIsMoveDialogOpen(true)}
            disabled={!nextStage}
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            Move to {nextStage?.name || "Hired"}
          </Button>
        </div>
      </div>

      {/* Pipeline Visual */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${
                ((currentStageIndex + 0.5) / (stages.length - 1)) * 100
              }%`,
            }}
          />
        </div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = stage.status === "completed";
            const isCurrent = stage.status === "current";
            const isUpcoming = stage.status === "upcoming";

            return (
              <div
                key={stage.id}
                className="flex flex-col items-center"
                style={{ width: `${100 / stages.length}%` }}
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-background border-primary text-primary"
                      : "bg-muted border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <p
                  className={`text-xs mt-2 text-center font-medium ${
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {stage.name}
                </p>

                {/* Duration */}
                {stage.duration && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {stage.duration}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage History */}
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <h4 className="font-medium text-sm">Stage History</h4>
        <div className="space-y-2">
          {stages
            .filter((s) => s.status === "completed" || s.status === "current")
            .map((stage, index) => (
              <div
                key={stage.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      stage.status === "completed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{stage.name}</p>
                    {stage.completedAt && (
                      <p className="text-xs text-muted-foreground">
                        Completed on {stage.completedAt}
                      </p>
                    )}
                    {stage.status === "current" && (
                      <p className="text-xs text-blue-500">In Progress</p>
                    )}
                  </div>
                </div>
                {stage.duration && (
                  <Badge variant="secondary" className="text-xs">
                    {stage.duration}
                  </Badge>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold text-primary">6</p>
          <p className="text-xs text-muted-foreground">Days in Pipeline</p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs text-muted-foreground">Stages Completed</p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-2xl font-bold text-green-600">2</p>
          <p className="text-xs text-muted-foreground">Days Avg. per Stage</p>
        </div>
      </div>

      {/* Move Dialog */}
      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move to {nextStage?.name}</DialogTitle>
            <DialogDescription>
              Confirm moving this candidate to the next stage in the pipeline.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <Badge variant="secondary">{currentStage?.name}</Badge>
                <p className="text-xs text-muted-foreground mt-1">Current</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <Badge className="bg-primary">{nextStage?.name}</Badge>
                <p className="text-xs text-muted-foreground mt-1">Next</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Add a note (optional)</Label>
              <Textarea placeholder="Add any notes about this stage transition..." />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleMoveToNext}>
                Confirm Move
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsMoveDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Candidate</DialogTitle>
            <DialogDescription>
              This action will mark the candidate as rejected. Please provide a
              reason.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {rejectionReasons.map((reason) => (
                    <SelectItem
                      key={reason}
                      value={reason.toLowerCase().replace(/ /g, "_")}
                    >
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea placeholder="Add any additional details..." />
            </div>
            <div className="space-y-2">
              <Label>Send rejection email?</Label>
              <Select defaultValue="yes">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">
                    Yes, send standard rejection email
                  </SelectItem>
                  <SelectItem value="custom">
                    Yes, customize rejection email
                  </SelectItem>
                  <SelectItem value="no">No, don't send email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setIsRejectDialogOpen(false)}
              >
                Reject Candidate
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsRejectDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
