import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, MapPin, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Interview {
  id: string;
  candidate: string;
  avatar?: string;
  role: string;
  time: string;
  duration: string;
  type: "video" | "onsite";
  interviewers: { name: string; avatar?: string }[];
}

interface UpcomingInterviewsProps {
  interviews: Interview[];
}

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  return (
    <div className="space-y-3">
      {interviews.map((interview) => (
        <div
          key={interview.id}
          className="group rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={interview.avatar} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {interview.candidate
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{interview.candidate}</h4>
                <p className="text-sm text-muted-foreground">
                  {interview.role}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="flex text-xs items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {interview.time}
              </span>
              <Badge variant="outline" className="font-normal">
                {interview.duration}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "font-normal",
                  interview.type === "video"
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {interview.type === "video" ? (
                  <>
                    <Video className="h-3 w-3 mr-1" /> Video
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3 mr-1" /> On-site
                  </>
                )}
              </Badge>
            </div>

            {/* Interviewers */}
            <div className="flex -space-x-2">
              {interview.interviewers.slice(0, 3).map((interviewer, i) => (
                <Avatar key={i} className="h-7 w-7 ring-2 ring-background">
                  <AvatarImage
                    src={interviewer.avatar}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-[10px] bg-muted">
                    {interviewer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {interview.interviewers.length > 3 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-medium ring-2 ring-background">
                  +{interview.interviewers.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
