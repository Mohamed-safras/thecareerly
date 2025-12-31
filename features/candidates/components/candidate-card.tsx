import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { MatchResult } from "@/types/matching";

interface CandidateCardProps {
  result: MatchResult;
  onViewDetails: () => void;
  index?: number;
}

const recommendationConfig = {
  strong: {
    bg: "bg-gradient-to-br from-status-active-bg to-status-active-bg/50",
    text: "text-status-active",
    border: "border-l-status-active",
    ringColor: "ring-status-active/20",
    label: "Strong Match",
    icon: Star,
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  good: {
    bg: "bg-gradient-to-br from-status-new-bg to-status-new-bg/50",
    text: "text-status-new",
    border: "border-l-status-new",
    ringColor: "ring-status-new/20",
    label: "Good Match",
    icon: CheckCircle2,
    gradient: "from-sky-500/20 to-sky-500/5",
  },
  consider: {
    bg: "bg-gradient-to-br from-status-hold-bg to-status-hold-bg/50",
    text: "text-status-hold",
    border: "border-l-status-hold",
    ringColor: "ring-status-hold/20",
    label: "Consider",
    icon: AlertTriangle,
    gradient: "from-amber-500/20 to-amber-500/5",
  },
  weak: {
    bg: "bg-gradient-to-br from-status-archived-bg to-status-archived-bg/50",
    text: "text-status-archived",
    border: "border-l-status-archived",
    ringColor: "ring-status-archived/20",
    label: "Weak Match",
    icon: XCircle,
    gradient: "from-slate-500/20 to-slate-500/5",
  },
};

export function CandidateCard({ result, onViewDetails }: CandidateCardProps) {
  const config = recommendationConfig[result.recommendation];
  const Icon = config.icon;
  const initials = result.candidateName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      <Card
        className={`group cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 ${config.border} hover:-translate-y-1 overflow-hidden`}
        onClick={onViewDetails}
      >
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        <div className="relative p-5">
          <div className="flex items-start gap-5">
            {/* Score Circle with animation */}
            <div className="shrink-0">
              <div
                className={`relative w-20 h-20 rounded-2xl ${config.bg} flex items-center justify-center shadow-sm`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold ${config.text}`}>
                    {result.overallScore}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    score
                  </div>
                </div>
                {result.recommendation === "strong" && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-status-active flex items-center justify-center shadow-lg">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {result.candidateName}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={`${config.bg} ${config.text} mt-1 border-0`}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Score Breakdown with better visuals */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Skills", value: result.skillsMatch.score },
                  { label: "Experience", value: result.experienceMatch.score },
                  { label: "Education", value: result.educationMatch.score },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.value >= 90
                            ? "bg-status-active"
                            : item.value >= 75
                            ? "bg-status-new"
                            : item.value >= 60
                            ? "bg-status-hold"
                            : "bg-status-archived"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills with better styling */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {result.skillsMatch.matched.slice(0, 4).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs bg-status-active-bg/50 border-status-active/20 hover:bg-status-active-bg transition-colors"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 mr-1 text-status-active" />
                    {skill}
                  </Badge>
                ))}
                {result.skillsMatch.missing.slice(0, 2).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs bg-destructive/5 border-destructive/20"
                  >
                    <XCircle className="h-2.5 w-2.5 mr-1 text-destructive" />
                    {skill}
                  </Badge>
                ))}
                {result.skillsMatch.matched.length +
                  result.skillsMatch.missing.length >
                  6 && (
                  <Badge
                    variant="outline"
                    className="text-xs text-muted-foreground"
                  >
                    +
                    {result.skillsMatch.matched.length +
                      result.skillsMatch.missing.length -
                      6}{" "}
                    more
                  </Badge>
                )}
              </div>

              {/* Highlight */}
              {result.highlights.length > 0 && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  {result.highlights[0]}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
    // <Sheet open={isOpen} onOpenChange={onClose}>
    //   <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
    //     {initials}
    //   </SheetContent>
    // </Sheet>
  );
}
