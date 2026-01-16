import { useState } from "react";
import {
  Check,
  Copy,
  Clock,
  ListChecks,
  Calendar,
  Mail,
  Slack,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface InterviewShareCardProps {
  interviewLink?: string;
  duration?: string;
  questions?: number;
  expiresDate?: string;
  validDays?: number;
}

const InterviewShareCard = ({
  interviewLink = "https://alcruiter.ai/interview/j8k9m2n3p4",
  duration = "30 Minutes",
  questions = 10,
  expiresDate = "Nov 20, 2025",
  validDays = 30,
}: InterviewShareCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(interviewLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: string) => {
    const encodedLink = encodeURIComponent(interviewLink);
    const message = encodeURIComponent(
      "You're invited to an AI Interview. Click the link to get started:"
    );

    switch (platform) {
      case "email":
        window.open(
          `mailto:?subject=AI Interview Invitation&body=${message}%0A%0A${encodedLink}`
        );
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${message}%20${encodedLink}`);
        break;
      case "slack":
        toast.info("Slack integration coming soon!");
        break;
    }
  };

  return (
    <Card className="border-border/50 shadow-none rounded-lg">
      {/* Success Header */}
      <div
        className="pt-8 pb-6 px-3 text-center"
        style={{
          background:
            "linear-gradient(to bottom, hsl(152 69% 95%), hsl(var(--card)))",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "hsl(152 69% 45%)" }}
        >
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
        <h2 className="text-xl font-semibold text-card-foreground mb-3">
          Your Interview is Ready!
        </h2>
        <p className="text-muted-foreground text-sm">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {/* Interview Link Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">
              Interview Link
            </label>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                color: "hsl(217 91% 50%)",
                backgroundColor: "hsl(217 91% 95%)",
              }}
            >
              Valid for {validDays} days
            </span>
          </div>

          <div className="flex items-center gap-3 p-1 bg-muted rounded-lg border border-border">
            <div className="flex-1 px-3 py-2 text-sm text-muted-foreground truncate">
              {interviewLink}
            </div>
            <Button
              onClick={handleCopyLink}
              className="shrink-0 gap-2"
              size="sm"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ListChecks className="w-3.5 h-3.5" />
              <span>{questions} Questions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Expires: {expiresDate}</span>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="space-y-3 pt-3">
          <label className="text-sm font-medium text-card-foreground">
            Share via
          </label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-11 gap-2 text-sm font-medium"
              onClick={() => handleShare("email")}
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button
              variant="outline"
              className="h-11 gap-1.5 text-sm font-medium"
              onClick={() => handleShare("slack")}
            >
              <Slack className="w-4 h-4" />
              Slack
            </Button>
            <Button
              variant="outline"
              className="h-11 gap-2 text-sm font-medium"
              onClick={() => handleShare("whatsapp")}
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Custom WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default InterviewShareCard;
