import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface TeamMember {
  name: string;
  avatar?: string;
  role: string;
  hires: number;
  interviews: number;
  responseTime: string;
}

interface TeamPerformanceProps {
  members: TeamMember[];
}

const rankIcons = [Trophy, Medal, Award];
const rankColors = ["text-yellow-500", "text-gray-400", "text-amber-600"];

export function TeamPerformance({ members }: TeamPerformanceProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Team Performance
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          This month&apos;s hiring leaders
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {members.map((member, index) => {
          const RankIcon = rankIcons[index] || Award;
          return (
            <div
              key={member.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  {member.avatar && (
                    <AvatarImage src={member.avatar} alt={member.name} />
                  )}
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-background flex items-center justify-center shadow-sm border">
                    <RankIcon className={`h-3 w-3 ${rankColors[index]}`} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-status-active">
                    {member.hires}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Hires</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{member.interviews}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Interviews
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {member.responseTime}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
