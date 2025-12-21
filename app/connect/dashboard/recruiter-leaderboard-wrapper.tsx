import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Trophy, Medal, Award } from "lucide-react";
import RecruiterLeaderboard from "@/features/dashboard/components/recruiter-leaderboard";

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
  "text-amber-300",
  "text-muted-foreground",
];
const rankBg = [
  "bg-yellow-400/30",
  "bg-gray-400/30",
  "bg-amber-400/30",
  "bg-muted",
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
          This month&apos;s top performers
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recruiterData.map((recruiter, index) => {
          const rankIcon = rankIcons[index] || Award;
          const rankColor = rankColors[index];
          const rankBackground = rankBg[index];

          return (
            <RecruiterLeaderboard
              key={recruiter.name}
              recuiter={recruiter}
              icon={rankIcon}
              rankColor={rankColor}
              rankBackground={rankBackground}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
