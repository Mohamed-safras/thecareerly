import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  X,
  Clock,
  MapPin,
  Users,
  Mail,
  Video,
  Phone,
  Calendar,
  Edit3,
  Bell,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InterviewEvent, typeConfig } from "@/types/interviews";

interface EventPopupProps {
  event: InterviewEvent | null;
  onClose: () => void;
  position?: { x: number; y: number };
}

export function EventPopup({ event, onClose, position }: EventPopupProps) {
  if (!event) return null;

  const config = typeConfig[event.type];
  const initials = event.candidate
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-card rounded-xl shadow-xl overflow-hidden border"
        >
          {/* Header with color band */}
          <div className="h-2" style={{ backgroundColor: config.color }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Type badge and status */}
            <div className="flex items-center gap-2 mb-4">
              <Badge
                style={{
                  backgroundColor: config.bgColor,
                  color: config.color,
                }}
                className="font-medium"
              >
                {config.label}
              </Badge>
              <Badge
                variant={event.status === "confirmed" ? "default" : "secondary"}
                className="capitalize"
              >
                {event.status}
              </Badge>
            </div>

            {/* Candidate info */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                style={{
                  backgroundColor: config.color,
                  color: "white",
                }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-foreground truncate">
                  {event.candidate}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {event.position}
                </p>
              </div>
            </div>

            <Separator className="mb-4" />

            {/* Details grid */}
            <div className="space-y-3">
              {/* Date & Time */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {format(event.start, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(event.start, "h:mm a")} -{" "}
                    {format(event.end, "h:mm a")}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {getLocationIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {event.location}
                  </p>
                  {isVideoCall && (
                    <p className="text-sm text-primary hover:underline cursor-pointer flex items-center gap-1">
                      Join meeting <ExternalLink className="h-3 w-3" />
                    </p>
                  )}
                </div>
              </div>

              {/* Interviewer */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    Interviewer
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.interviewer}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Contact</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {event.email}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {event.notes && (
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm text-foreground">{event.notes}</p>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button className="flex-1 gap-2" size="sm">
                {isVideoCall ? (
                  <>
                    <Video className="h-4 w-4" />
                    Join Call
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    Open Details
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit3 className="h-4 w-4" />
                Reschedule
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Remind
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
