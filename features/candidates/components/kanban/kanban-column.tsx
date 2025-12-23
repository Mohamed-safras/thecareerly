import { useState } from "react";
import { Plus, MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Candidate } from "@/features/candidates/data/mock-data";
import { KanbanCard } from "./kanban-card";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  stage: string;
  candidates: Candidate[];
  onViewDetails: (candidate: Candidate) => void;
  onMoveCandidate: (candidateId: string, newStage: string) => void;
  colorScheme: {
    bg: string;
    border: string;
    badge: string;
    text: string;
    glow: string;
  };
}

export const KanbanColumn = ({
  stage,
  candidates,
  onViewDetails,
  onMoveCandidate,
  colorScheme,
}: KanbanColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const candidateId = e.dataTransfer.getData("candidateId");
    if (candidateId) {
      onMoveCandidate(candidateId, stage);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col min-w-[240px] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px] max-w-[360px] h-full border-1 rounded-lg transition-all duration-300",
        // colorScheme.bg,
        isDragOver &&
          `ring-2 ring-offset-2 ring-offset-background ${colorScheme.glow}`
      )}
    >
      {/* Column Header */}
      <div className={cn("p-3 rounded-t-2xl border-b")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-sm">{stage}</h3>
              <p className="text-xs text-muted-foreground">
                {candidates.length} candidate
                {candidates.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Sort by Rating</DropdownMenuItem>
                <DropdownMenuItem>Sort by Match Score</DropdownMenuItem>
                <DropdownMenuItem>Sort by Date Applied</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-3 pb-3">
          {candidates.map((candidate) => (
            <KanbanCard
              key={candidate.id}
              candidate={candidate}
              onViewDetails={onViewDetails}
            />
          ))}

          {candidates.length === 0 && (
            <div
              className={cn(
                "flex flex-col items-center justify-center py-12 px-4 rounded-xl border-2 border-dashed transition-colors",
                isDragOver ? colorScheme.border : "border-muted-foreground/20"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                  colorScheme.badge
                )}
              >
                <Users className={cn("h-6 w-6", colorScheme.text)} />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {isDragOver
                  ? "Drop candidate here"
                  : "No candidates in this stage"}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Drag and drop to add
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
