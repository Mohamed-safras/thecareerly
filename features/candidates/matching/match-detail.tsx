import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  Zap,
  Mail,
  FileText,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { MatchResult } from "@/types/matching";

interface MatchDetailDialogProps {
  result: MatchResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const recommendationStyles = {
  strong: {
    bg: "bg-status-active-bg",
    text: "text-status-active",
    label: "Strong Match",
    icon: Star,
  },
  good: {
    bg: "bg-status-new-bg",
    text: "text-status-new",
    label: "Good Match",
    icon: CheckCircle2,
  },
  consider: {
    bg: "bg-status-hold-bg",
    text: "text-status-hold",
    label: "Consider",
    icon: AlertTriangle,
  },
  weak: {
    bg: "bg-status-archived-bg",
    text: "text-status-archived",
    label: "Weak Match",
    icon: XCircle,
  },
};

export function MatchDetailDialog({
  result,
  open,
  onOpenChange,
}: MatchDetailDialogProps) {
  if (!result) return null;

  const initials = result.candidateName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const recommendation = recommendationStyles[result.recommendation];
  const RecommendationIcon = recommendation.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Match Details</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-start gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{result.candidateName}</h2>
            <p className="text-muted-foreground">
              Matched for {result.jobTitle}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={`${recommendation.bg} ${recommendation.text}`}>
                <RecommendationIcon className="h-3 w-3 mr-1" />
                {recommendation.label}
              </Badge>
              <span className="text-2xl font-bold text-foreground">
                {result.overallScore}%
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Score Breakdown */}
        <div className="py-4">
          <h3 className="font-semibold mb-4">Score Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Skills Match</span>
                <span className="text-sm font-semibold">
                  {result.skillsMatch.score}%
                </span>
              </div>
              <Progress value={result.skillsMatch.score} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Experience Match</span>
                <span className="text-sm font-semibold">
                  {result.experienceMatch.score}%
                </span>
              </div>
              <Progress value={result.experienceMatch.score} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Required: {result.experienceMatch.required} • Candidate:{" "}
                {result.experienceMatch.candidate}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Education Match</span>
                <span className="text-sm font-semibold">
                  {result.educationMatch.score}%
                </span>
              </div>
              <Progress value={result.educationMatch.score} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {result.educationMatch.notes}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Skills Analysis */}
        <div className="py-4">
          <h3 className="font-semibold mb-4">Skills Analysis</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Matched Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.skillsMatch.matched.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-status-active-bg/50"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1 text-status-active" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {result.skillsMatch.missing.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Missing Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.skillsMatch.missing.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-destructive/10"
                    >
                      <XCircle className="h-3 w-3 mr-1 text-destructive" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {result.skillsMatch.extra.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Additional Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.skillsMatch.extra.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-primary/10"
                    >
                      <Zap className="h-3 w-3 mr-1 text-primary" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Highlights & Concerns */}
        <div className="py-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="h-4 w-4 text-status-active" />
              <span className="font-semibold">Highlights</span>
            </div>
            <ul className="space-y-2">
              {result.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-status-active shrink-0 mt-0.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {result.concerns.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ThumbsDown className="h-4 w-4 text-status-hold" />
                <span className="font-semibold">Concerns</span>
              </div>
              <ul className="space-y-2">
                {result.concerns.map((concern, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-status-hold shrink-0 mt-0.5" />
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button size="sm">
              <ArrowRight className="h-4 w-4 mr-2" />
              Advance to Interview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
