import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FeedbackDialog } from "@/features/interview/feedback-dialog";
import InterviewSchedulerPopup from "./interview-scheduler-popup";

interface Interview {
  id: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  format: "video" | "in-person" | "phone";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  interviewers: {
    name: string;
    role: string;
    avatar: string;
  }[];
  location?: string;
  meetingLink?: string;
  feedback?: string;
}

const mockInterviews: Interview[] = [
  {
    id: "1",
    type: "Technical Interview",
    date: "Dec 18, 2024",
    time: "10:00 AM",
    duration: "1 hour",
    format: "video",
    status: "scheduled",
    interviewers: [
      {
        name: "John Smith",
        role: "Engineering Manager",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      {
        name: "Sarah Johnson",
        role: "Senior Developer",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      },
    ],
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    type: "HR Screening",
    date: "Dec 14, 2024",
    time: "2:00 PM",
    duration: "30 mins",
    format: "phone",
    status: "completed",
    interviewers: [
      {
        name: "Emily Davis",
        role: "HR Manager",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    ],
    feedback:
      "Positive conversation. Candidate is enthusiastic and has relevant experience.",
  },
  {
    id: "3",
    type: "Culture Fit",
    date: "Dec 12, 2024",
    time: "11:00 AM",
    duration: "45 mins",
    format: "video",
    status: "completed",
    interviewers: [
      {
        name: "Mike Chen",
        role: "Team Lead",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
    ],
    meetingLink: "https://zoom.us/j/123456789",
    feedback: "Great cultural fit. Aligns well with team values.",
  },
];

const formatIcons = {
  video: Video,
  "in-person": MapPin,
  phone: Phone,
};

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", icon: Calendar },
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500", icon: XCircle },
  "no-show": { label: "No Show", color: "bg-orange-500", icon: AlertCircle },
};

// Interviewers component
const InterviewersList = ({
  interviewers,
}: {
  interviewers: Interview["interviewers"];
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex -space-x-2">
        {interviewers.map((interviewer, i) => (
          <Avatar
            key={i}
            className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-background"
          >
            <AvatarImage src={interviewer.avatar} />
            <AvatarFallback className="text-xs">
              {interviewer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground truncate">
        {interviewers.map((i) => i.name).join(", ")}
      </span>
    </div>
  );
};

// Interview card header component
const InterviewCardHeader = ({
  interview,
  FormatIcon,
  isPast = false,
}: {
  interview: Interview;
  FormatIcon: React.ElementType;
  isPast?: boolean;
}) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <div
          className={`p-2 rounded-lg flex-shrink-0 ${
            isPast ? "bg-muted" : "bg-primary/10"
          }`}
        >
          <FormatIcon
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              isPast ? "text-muted-foreground" : "text-primary"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-base truncate">
            {interview.type}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>{interview.date}</span>
            </div>
            {interview.time && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span>
                  {interview.time} ({interview.duration})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isPast && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Reschedule</DropdownMenuItem>
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Cancel Interview
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {isPast && (
        <Badge
          className={`${
            statusConfig[interview.status].color
          } text-white border-none gap-1 flex-shrink-0 text-xs`}
        >
          {React.createElement(statusConfig[interview.status].icon, {
            className: "h-3 w-3",
          })}
          <span className="hidden sm:inline">
            {statusConfig[interview.status].label}
          </span>
        </Badge>
      )}
    </div>
  );
};

interface InterviewSchedulerProps {
  candidateName?: string;
}

export const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  candidateName,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );

  const handleOpenFeedback = (interview: Interview) => {
    setSelectedInterview(interview);
    setFeedbackOpen(true);
  };

  const upcomingInterviews = mockInterviews.filter(
    (i) => i.status === "scheduled"
  );
  const pastInterviews = mockInterviews.filter((i) => i.status !== "scheduled");

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base sm:text-lg">
            Interview Schedule
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {upcomingInterviews.length} upcoming, {pastInterviews.length}{" "}
            completed
          </p>
        </div>
        <InterviewSchedulerPopup
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>

      {/* Upcoming Interviews */}
      {upcomingInterviews.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">
            Upcoming
          </h4>
          {upcomingInterviews.map((interview) => {
            const FormatIcon = formatIcons[interview.format];

            return (
              <div
                key={interview.id}
                className="rounded-lg border bg-card p-3 sm:p-4 space-y-3"
              >
                <InterviewCardHeader
                  interview={interview}
                  FormatIcon={FormatIcon}
                />
                <InterviewersList interviewers={interview.interviewers} />

                {interview.meetingLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-xs sm:text-sm"
                  >
                    <Video className="h-4 w-4" />
                    Join Meeting
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Past Interviews */}
      {pastInterviews.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">
            Past Interviews
          </h4>
          {pastInterviews.map((interview) => {
            const FormatIcon = formatIcons[interview.format];

            return (
              <div
                key={interview.id}
                className="rounded-lg border bg-card p-3 sm:p-4 space-y-3"
              >
                <InterviewCardHeader
                  interview={interview}
                  FormatIcon={FormatIcon}
                  isPast={true}
                />
                <InterviewersList interviewers={interview.interviewers} />

                {interview.feedback && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {interview.feedback}
                    </p>
                  </div>
                )}

                {interview.status === "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleOpenFeedback(interview)}
                  >
                    <ClipboardList className="h-4 w-4" />
                    {interview.feedback ? "Update Feedback" : "Submit Feedback"}
                  </Button>
                )}
              </div>
            );
          })}

          <FeedbackDialog
            open={feedbackOpen}
            onOpenChange={setFeedbackOpen}
            candidateName={candidateName}
            interviewType={selectedInterview?.type || "Interview"}
          />
        </div>
      )}
    </div>
  );
};
