import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, Target, TrendingUp, Clock } from "lucide-react";

const recruiterData = [
  {
    name: "Sarah Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Senior Recruiter",
    hires: 8,
    target: 10,
    interviews: 24,
    responseTime: "2h",
    satisfaction: 4.8,
    trend: "+15%",
  },
  {
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "Technical Recruiter",
    hires: 6,
    target: 8,
    interviews: 31,
    responseTime: "1.5h",
    satisfaction: 4.6,
    trend: "+12%",
  },
  {
    name: "Emily Chen",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "Recruiter",
    hires: 5,
    target: 7,
    interviews: 19,
    responseTime: "3h",
    satisfaction: 4.5,
    trend: "+8%",
  },
  {
    name: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    role: "HR Manager",
    hires: 4,
    target: 6,
    interviews: 12,
    responseTime: "4h",
    satisfaction: 4.3,
    trend: "+5%",
  },
];

const rankIcons = [Trophy, Medal, Award];
const rankColors = [
  "text-yellow-500",
  "text-gray-400",
  "text-amber-600",
  "text-muted-foreground",
];
const rankBg = [
  "bg-yellow-500/10",
  "bg-gray-400/10",
  "bg-amber-600/10",
  "bg-muted/30",
];

export default function RecruiterLeaderboardWrapper() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Recruiter Leaderboard
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          This month's top performers
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recruiterData.map((recruiter, index) => {
          const RankIcon = rankIcons[index] || Award;
          const progressValue = (recruiter.hires / recruiter.target) * 100;

          return (
            <div
              key={recruiter.name}
              className={`p-4 rounded-xl ${rankBg[index]} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                {/* Rank & Avatar */}
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
                    <AvatarFallback>
                      {recruiter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -top-1 -right-1 h-6 w-6 rounded-full bg-background flex items-center justify-center shadow-sm border`}
                  >
                    <RankIcon className={`h-3.5 w-3.5 ${rankColors[index]}`} />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{recruiter.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {recruiter.role}
                      </p>
                    </div>
                    <Badge className="bg-status-active/10 text-status-active border-status-active/20 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {recruiter.trend}
                    </Badge>
                  </div>

                  {/* Progress to Target */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Target className="h-3 w-3" />
                        Hires Target
                      </span>
                      <span className="font-medium">
                        {recruiter.hires}/{recruiter.target}
                      </span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Interviews:</span>
                      <span className="font-medium">
                        {recruiter.interviews}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">
                        {recruiter.responseTime} avg
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="font-medium text-status-active">
                        {recruiter.satisfaction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
