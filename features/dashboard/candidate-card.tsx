import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  stage: string;
  stageColor: string;
  appliedDate: string;
  matchScore: number;
}

export function CandidateCard({
  name,
  role,
  avatar,
  rating,
  stage,
  stageColor,
  appliedDate,
  matchScore,
}: CandidateCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-lg border bg-card p-4 transition-all duration-200 hover:bg-muted/30">
      <Avatar className="h-12 w-12 ring-2 ring-background">
        <AvatarImage src={avatar} alt={name} className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium truncate">{name}</h4>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < rating
                    ? "fill-status-hold text-status-hold"
                    : "text-muted"
                )}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground truncate">{role}</p>
        <div className="flex items-center gap-3 mt-1">
          <Badge variant="outline" className={cn("text-xs", stageColor)}>
            {stage}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {appliedDate}
          </span>
        </div>
      </div>

      <div className="sm:flex flex-col items-end gap-2 hidden">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Match</p>
          <p
            className={cn(
              "text-lg font-bold",
              matchScore >= 85
                ? "text-status-active"
                : matchScore >= 70
                ? "text-status-archived"
                : matchScore >= 50
                ? "text-status-hold"
                : "text-muted-foreground"
            )}
          >
            {matchScore}%
          </p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-7 w-7">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
