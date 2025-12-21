import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Clock, LucideIcon } from "lucide-react";

export type Recruiter = {
  name: string;
  avatar: string;
  role: string;
  hires: number;
  target: number;
  interviews: number;
  responseTime: string;
  satisfaction: number;
  trend: string;
};
export interface RecruiterLeaderboardProps {
  recuiter: Recruiter;
  icon: LucideIcon;
  rankColor: string;
  rankBackground: string;
}

const RecruiterLeaderboard: React.FC<RecruiterLeaderboardProps> = ({
  recuiter,
  icon: Icon,
  rankColor,
  rankBackground,
}) => {
  return (
    <div
      className={`p-4 rounded-xl ${rankBackground} transition-all hover:scale-[1.01]`}
    >
      <div className="flex items-start gap-3">
        {/* Rank & Avatar */}
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-border">
            <AvatarImage src={recuiter.avatar} alt={recuiter.name} />
            <AvatarFallback>
              {recuiter.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute -top-1 -right-1 h-6 w-6 rounded-full bg-background flex items-center justify-center shadow-sm border`}
          >
            <Icon className={`h-3 w-3 ${rankColor}`} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{recuiter.name}</p>
              <p className="text-xs text-muted-foreground">{recuiter.role}</p>
            </div>
            <Badge className="bg-status-active/10 text-status-active border-status-active/20 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              {recuiter.trend}
            </Badge>
          </div>
        </div>
      </div>
      <div>
        {/* Progress to Target */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Target className="h-3 w-3" />
              Hires Target
            </span>
            <span className="font-medium">
              {recuiter.hires}/{recuiter.target}
            </span>
          </div>
          <Progress
            value={(recuiter.hires / recuiter.target) * 100}
            className="h-2"
          />
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Interviews:</span>
            <span className="font-medium">{recuiter.interviews}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">{recuiter.responseTime} avg</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Rating:</span>
            <span className="font-medium text-status-active">
              {recuiter.satisfaction}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLeaderboard;
