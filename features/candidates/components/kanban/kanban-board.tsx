import { useState, useMemo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Candidate, stageOptions } from "@/features/candidates/data/mock-data";
import { CandidateDetailDrawer } from "@/app/candidates/candidate-detail-drawer";
import { KanbanColumn } from "./kanban-column";
import { toast } from "sonner";

// Filter out "All Stages" for the Kanban view
const kanbanStages = stageOptions.filter((stage) => stage !== "All Stages");

interface KanbanBoardProps {
  candidates: Candidate[];
  onCandidatesChange: (candidates: Candidate[]) => void;
}

const stageColorSchemes: Record<
  string,
  {
    bg: string;
    border: string;
    badge: string;
    text: string;
    glow: string;
  }
> = {
  "Application Review": {
    bg: "bg-slate-50/50 dark:bg-slate-900/30",
    border: "border-slate-200 dark:border-slate-700",
    badge: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-300",
    glow: "ring-slate-400",
  },
  "HR Screening": {
    bg: "bg-blue-50/50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-600 dark:text-blue-400",
    glow: "ring-blue-400",
  },
  "Technical Interview": {
    bg: "bg-violet-50/50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    badge: "bg-violet-100 dark:bg-violet-900/50",
    text: "text-violet-600 dark:text-violet-400",
    glow: "ring-violet-400",
  },
  "Final Round": {
    bg: "bg-amber-50/50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 dark:bg-amber-900/50",
    text: "text-amber-600 dark:text-amber-400",
    glow: "ring-amber-400",
  },
  "Offer Extended": {
    bg: "bg-emerald-50/50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 dark:bg-emerald-900/50",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "ring-emerald-400",
  },
  Hired: {
    bg: "bg-teal-50/50 dark:bg-teal-950/30",
    border: "border-teal-200 dark:border-teal-800",
    badge: "bg-teal-100 dark:bg-teal-900/50",
    text: "text-teal-600 dark:text-teal-400",
    glow: "ring-teal-400",
  },
  Rejected: {
    bg: "bg-rose-50/50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
    badge: "bg-rose-100 dark:bg-rose-900/50",
    text: "text-rose-600 dark:text-rose-400",
    glow: "ring-rose-400",
  },
};

const defaultColorScheme = {
  bg: "bg-muted/30",
  border: "border-border",
  badge: "bg-muted",
  text: "text-muted-foreground",
  glow: "ring-primary",
};

export const KanbanBoard = ({
  candidates,
  onCandidatesChange,
}: KanbanBoardProps) => {
  const [detailCandidate, setDetailCandidate] = useState<Candidate | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const candidatesByStage = useMemo(() => {
    const grouped: Record<string, Candidate[]> = {};
    kanbanStages.forEach((stage) => {
      grouped[stage] = [];
    });
    candidates.forEach((candidate) => {
      if (grouped[candidate.stage]) {
        grouped[candidate.stage].push(candidate);
      }
    });
    return grouped;
  }, [candidates]);

  const handleViewDetails = (candidate: Candidate) => {
    setDetailCandidate(candidate);
    setIsDrawerOpen(true);
  };

  const handleMoveCandidate = (candidateId: string, newStage: string) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate || candidate.stage === newStage) return;

    const updatedCandidates = candidates.map((c) =>
      c.id === candidateId ? { ...c, stage: newStage } : c
    );
    onCandidatesChange(updatedCandidates);

    toast.success(`${candidate.name} moved to ${newStage}`);
  };

  return (
    <>
      <div className="h-[calc(100vh-380px)] min-h-[500px]">
        <ScrollArea className="h-full w-full">
          <div className="flex gap-4 p-1 pb-4 min-w-max">
            {kanbanStages.map((stage) => (
              <KanbanColumn
                key={stage}
                stage={stage}
                candidates={candidatesByStage[stage] || []}
                onViewDetails={handleViewDetails}
                onMoveCandidate={handleMoveCandidate}
                colorScheme={stageColorSchemes[stage] || defaultColorScheme}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <CandidateDetailDrawer
        candidate={detailCandidate}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
