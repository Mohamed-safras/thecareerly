import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

export const InterviewScheduler = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const upcomingInterviews = mockInterviews.filter(
    (i) => i.status === "scheduled"
  );
  const pastInterviews = mockInterviews.filter((i) => i.status !== "scheduled");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Interview Schedule</h3>
          <p className="text-sm text-muted-foreground">
            {upcomingInterviews.length} upcoming, {pastInterviews.length}{" "}
            completed
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Interview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Interview Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">HR Screening</SelectItem>
                    <SelectItem value="technical">
                      Technical Interview
                    </SelectItem>
                    <SelectItem value="culture">Culture Fit</SelectItem>
                    <SelectItem value="final">Final Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add any notes or agenda items..." />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Schedule Interview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Interviews */}
      {upcomingInterviews.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Upcoming
          </h4>
          {upcomingInterviews.map((interview) => {
            const FormatIcon = formatIcons[interview.format];
            const StatusConfig = statusConfig[interview.status];

            return (
              <div
                key={interview.id}
                className="rounded-lg border bg-card p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FormatIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{interview.type}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {interview.date}
                        <Clock className="h-3 w-3 ml-1" />
                        {interview.time} ({interview.duration})
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {interview.interviewers.map((interviewer, i) => (
                      <Avatar
                        key={i}
                        className="h-7 w-7 border-2 border-background"
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
                  <span className="text-sm text-muted-foreground">
                    {interview.interviewers.map((i) => i.name).join(", ")}
                  </span>
                </div>

                {interview.meetingLink && (
                  <Button variant="outline" size="sm" className="w-full gap-2">
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
          <h4 className="text-sm font-medium text-muted-foreground">
            Past Interviews
          </h4>
          {pastInterviews.map((interview) => {
            const FormatIcon = formatIcons[interview.format];
            const StatusConfig = statusConfig[interview.status];
            const StatusIcon = StatusConfig.icon;

            return (
              <div
                key={interview.id}
                className="rounded-lg border bg-card p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <FormatIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{interview.type}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {interview.date}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={`${StatusConfig.color} text-white border-none gap-1`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {StatusConfig.label}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {interview.interviewers.map((interviewer, i) => (
                      <Avatar
                        key={i}
                        className="h-6 w-6 border-2 border-background"
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
                  <span className="text-sm text-muted-foreground">
                    {interview.interviewers.map((i) => i.name).join(", ")}
                  </span>
                </div>

                {interview.feedback && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      {interview.feedback}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
