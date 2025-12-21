import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  Calendar,
  FileText,
  Star,
} from "lucide-react";

type ActivityType =
  | "applied"
  | "interview"
  | "hired"
  | "rejected"
  | "reviewed"
  | "offer";

interface Activity {
  id: string;
  type: ActivityType;
  candidate: string;
  avatar?: string;
  job: string;
  time: string;
  description?: string;
}

const activityConfig: Record<
  ActivityType,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  applied: { icon: UserPlus, color: "text-primary", bgColor: "bg-primary/10" },
  interview: {
    icon: Calendar,
    color: "text-status-new",
    bgColor: "bg-status-new-bg", //need to change
  },
  hired: {
    icon: CheckCircle2,
    color: "text-status-active",
    bgColor: "bg-status-active-bg", //need to change
  },
  rejected: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10", //need to change
  },
  reviewed: {
    icon: Star,
    color: "text-status-hold",
    bgColor: "bg-status-hold-bg", //need to change
  },
  offer: { icon: FileText, color: "text-primary", bgColor: "bg-primary/10" },
};

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const config = activityConfig[activity.type];
        const Icon = config.icon;

        return (
          <div
            key={activity.id}
            className="group relative flex gap-4 py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="absolute left-[23px] top-14 h-[calc(100%-2rem)] w-px bg-border" />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                config.bgColor
              )}
            >
              <Icon className={cn("h-4 w-4", config.color)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={activity.avatar} className="object-cover" />
                  <AvatarFallback className="text-[10px]">
                    {activity.candidate
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm truncate">
                  {activity.candidate}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {activity.type === "applied" && "applied for"}
                {activity.type === "interview" && "scheduled interview for"}
                {activity.type === "hired" && "was hired for"}
                {activity.type === "rejected" && "was rejected for"}
                {activity.type === "reviewed" && "was reviewed for"}
                {activity.type === "offer" && "received offer for"}{" "}
                <span className="font-medium text-foreground">
                  {activity.job}
                </span>
              </p>
              {activity.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.description}
                </p>
              )}
            </div>

            {/* Time */}
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}
