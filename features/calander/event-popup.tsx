import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MapPin,
  Users,
  Mail,
  Video,
  Phone,
  Edit3,
  Bell,
  ExternalLink,
  Briefcase,
  CheckCircle2,
  MessageSquare,
  FileText,
  Star,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { InterviewEvent, typeConfig } from "@/types/interviews";

interface EventPopupProps {
  event: InterviewEvent | null;
  onClose: () => void;
}

export function EventPopup({ event, onClose }: EventPopupProps) {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours} hour${hours > 1 ? "s" : ""}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(event.email);
    toast.success("Email copied to clipboard");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-background/90"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl max-h-[90vh] bg-card rounded-lg  overflow-hidden border flex flex-col"
        >
          {/* Fixed Header */}
          <div
            className="relative px-6 py-5 shrink-0"
            style={{
              background: `linear-gradient(135deg, ${config.color}15 0%, ${config.color}05 100%)`,
              borderBottom: `1px solid ${config.color}20`,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-background/80 transition-colors z-10"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>

            <div className="flex items-center gap-4">
              <div
                className="h-14 w-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0 shadow-md"
                style={{ backgroundColor: config.color }}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge
                    className="text-xs font-medium px-2 py-0.5"
                    style={{
                      backgroundColor: config.bgColor,
                      color: config.color,
                    }}
                  >
                    {config.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {event.status}
                  </Badge>
                </div>

                <h2 className="text-xl font-bold text-foreground truncate">
                  {event.candidate}
                </h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {event.position}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date & Time */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <Clock className="h-4 w-4" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Date & Time
                  </p>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {formatDate(event.start)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(event.start)} - {formatTime(event.end)}
                    <span className="ml-1" style={{ color: config.color }}>
                      ({getDuration(event.start, event.end)})
                    </span>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <span style={{ color: config.color }}>
                    {getLocationIcon()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Location
                  </p>
                  <p className="text-sm font-medium text-foreground mt-0.5 truncate">
                    {event.location}
                  </p>
                  {isVideoCall && (
                    <button
                      className="text-xs font-medium mt-0.5 flex items-center gap-1 hover:underline"
                      style={{ color: config.color }}
                    >
                      Join meeting <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Interviewer */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <Users className="h-4 w-4" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Interviewer(s)
                  </p>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {event.interviewer}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${config.color}15` }}
                >
                  <Mail className="h-4 w-4" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    Contact
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-sm font-medium text-foreground truncate flex-1">
                      {event.email}
                    </p>
                    <button
                      onClick={copyEmail}
                      className="p-1 hover:bg-background rounded transition-colors shrink-0"
                    >
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8"
              >
                <FileText className="h-3.5 w-3.5" />
                View Resume
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Send Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs h-8"
              >
                <Star className="h-3.5 w-3.5" />
                Add Notes
              </Button>
            </div>

            {/* Notes Section */}
            {event.notes && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-1.5">
                  Notes
                </h3>
                <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                  {event.notes}
                </p>
              </div>
            )}
          </div>

          {/* Fixed Footer */}
          <div className="shrink-0 p-4 border-t bg-card/95 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                className="flex-1 gap-2 h-9 text-sm font-medium"
                style={{ backgroundColor: config.color }}
              >
                {isVideoCall ? (
                  <>
                    <Video className="h-4 w-4" />
                    Join Video Call
                  </>
                ) : isPhoneCall ? (
                  <>
                    <Phone className="h-4 w-4" />
                    Start Call
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    View Details
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1 gap-2 h-9 text-sm">
                <Edit3 className="h-4 w-4" />
                Reschedule
              </Button>
              <Button
                variant="ghost"
                className="sm:flex-none gap-2 h-9 text-sm"
              >
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
