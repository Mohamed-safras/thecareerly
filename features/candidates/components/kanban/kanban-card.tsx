import { useState } from "react";
import {
  GripVertical,
  Mail,
  Calendar,
  Star,
  MoreHorizontal,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Candidate } from "@/interfaces/candidate";

interface KanbanCardProps {
  candidate: Candidate;
  onViewDetails: (candidate: Candidate) => void;
  isDragging?: boolean;
}

export const KanbanCard = ({
  candidate,
  onViewDetails,
  isDragging,
}: KanbanCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("candidateId", candidate.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(candidate)}
      className={cn(
        "group relative bg-card rounded-xl border shadow-sm cursor-grab active:cursor-grabbing transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/30",
        isDragging && "opacity-50 scale-105 shadow-2xl rotate-2"
      )}
    >
      <div className="p-3 pt-5">
        {/* Header with Drag Handle and Actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity cursor-grab",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-background shadow-md">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h4 className="font-semibold text-sm truncate leading-tight">
                {candidate.name}
              </h4>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {candidate.role}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(candidate);
                }}
              >
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={(e) => e.stopPropagation()}
              >
                Reject Candidate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {candidate.skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-[10px] px-2 py-0.5 font-medium bg-muted/80"
            >
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-dashed">
          <div className="flex items-center gap-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium">
                {candidate.rating.toFixed(1)}
              </span>
            </div>

            {/* Location */}
            {candidate.location && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="text-xs truncate max-w-[80px]">
                  {candidate.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
