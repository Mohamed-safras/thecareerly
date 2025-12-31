import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MapPin,
  Mail,
  Video,
  Phone,
  Edit3,
  Bell,
  CheckCircle2,
  MessageSquare,
  Copy,
  Calendar,
  Link2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { InterviewEvent, typeConfig } from "@/types/interviews";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EventPopupProps {
  event: InterviewEvent | null;
  onClose: () => void;
}

export function EventPopup({ event, onClose }: EventPopupProps) {
  if (!event) return null;

  const config = typeConfig[event.type];

  const interviewerInitials = event.interviewer
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const candidateInitials = event.candidate
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isVideoCall = event.location.toLowerCase().includes("video");
  const isPhoneCall = event.location.toLowerCase().includes("phone");

  const getLocationIcon = () => {
    if (isVideoCall) return <Video className="h-4 w-4" />;
    if (isPhoneCall) return <Phone className="h-4 w-4" />;
    return <MapPin className="h-4 w-4" />;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(event.email);
    toast.success("Email copied to clipboard");
  };

  const copyMeetingLink = () => {
    toast.success("Meeting link copied to clipboard");
  };

  // Mock attendees
  const attendees = [
    {
      name: event.interviewer,
      role: "Interviewer",
      status: "accepted" as const,
    },
    { name: event.candidate, role: "Candidate", status: "pending" as const },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[85vh] bg-card rounded-lg overflow-hidden border flex flex-col"
        >
          {/* Header Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30 shrink-0">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
              <Separator orientation="vertical" className="h-4 mx-1" />

              <Separator orientation="vertical" className="h-4 mx-1" />
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                <Calendar className="h-4 w-4" />
                Reschedule
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                <Bell className="h-4 w-4" />
                Remind
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Panel - Event Details */}
            <div className="flex-1 overflow-y-auto">
              {/* Title Section */}
              <div className="p-3 border-b">
                <div className="flex gap-3 flex-col items-start sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-14 rounded-full shrink-0"
                      style={{ backgroundColor: config.color }}
                    />{" "}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <Badge
                          className="text-xs font-medium"
                          style={{
                            backgroundColor: config.bgColor,
                            color: config.color,
                          }}
                        >
                          {config.label}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs gap-1 capitalize"
                        >
                          <CheckCircle2 className="h-4 w-4 text-status-active" />
                          {event.status}
                        </Badge>
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">
                        {event.candidate} - {event.position}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isVideoCall && (
                      <Button size="sm" className="h-8 gap-1.5 text-xs">
                        <Video className="h-4 w-4" />
                        Join
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-xs"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Chat
                    </Button>

                    {/* Quick Actions */}

                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-xs h-8"
                    >
                      <Link2 className="h-4 w-4" />
                      Copy Meeting Link
                    </Button>
                  </div>
                </div>
              </div>

              {/* Date, Time & Location */}
              <div className="p-3 space-y-3 border-b">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">
                    {formatDate(event.start)} {formatTime(event.start)} -{" "}
                    {formatTime(event.end)}
                  </span>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs"
                  >
                    View series
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs"
                  >
                    Show all instances
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground shrink-0">
                    {getLocationIcon()}
                  </span>
                  <span className="text-foreground">{event.location}</span>
                </div>
              </div>

              {/* Meeting Details */}
              {isVideoCall && (
                <div className="p-3 border-b">
                  <h3 className="font-semibold text-foreground mb-3">
                    Meeting Details
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary font-medium text-sm"
                    >
                      Join the meeting now
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Meeting ID: 487 582 884 496 0
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Passcode: YT9sg72P
                    </p>
                    <div className="pt-3">
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs text-primary"
                      >
                        Meeting options
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Section */}
              {event.notes && (
                <div className="p-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Notes
                  </h4>
                  <p className="text-sm text-foreground">{event.notes}</p>
                </div>
              )}
            </div>

            {/* Right Panel - Tracking & Attendees */}
            <div className="w-64 border-l bg-muted/20 overflow-y-auto shrink-0 hidden md:block">
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm text-foreground">
                    Tracking
                  </h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Organizer */}
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-3">
                    Organizer
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className="text-xs font-medium text-white"
                        style={{ backgroundColor: config.color }}
                      >
                        {interviewerInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {event.interviewer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Scheduled today
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Attendees */}
                <div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Attendees
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    You didn&apos;t respond
                  </p>

                  {/* Accepted */}
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                      <span className="text-status-active">✓</span>
                      Accepted:{" "}
                      {attendees.filter((a) => a.status === "accepted").length}
                    </p>
                    <div className="space-y-3">
                      {attendees
                        .filter((a) => a.status === "accepted")
                        .map((attendee, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                                {attendee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-foreground truncate">
                                {attendee.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {attendee.role}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Pending */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-status-hold" />
                      Pending:{" "}
                      {attendees.filter((a) => a.status === "pending").length}
                    </p>
                    <div className="space-y-3">
                      {attendees
                        .filter((a) => a.status === "pending")
                        .map((attendee, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                                {attendee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-foreground truncate">
                                {attendee.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {attendee.role}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Contact */}
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Contact</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-foreground truncate flex-1">
                      {event.email}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={copyEmail}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
