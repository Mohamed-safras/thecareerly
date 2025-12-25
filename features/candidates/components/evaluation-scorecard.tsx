import { Plus, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/star-rating";

interface Evaluation {
  id: string;
  evaluator: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  overallRating: number;
  recommendation: "strong_yes" | "yes" | "neutral" | "no" | "strong_no";
  criteria: {
    name: string;
    score: number;
    maxScore: number;
  }[];
  strengths: string[];
  concerns: string[];
  notes: string;
}

const mockEvaluations: Evaluation[] = [
  {
    id: "1",
    evaluator: {
      name: "John Smith",
      role: "Engineering Manager",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    date: "Dec 16, 2024",
    overallRating: 4.5,
    recommendation: "strong_yes",
    criteria: [
      { name: "Technical Skills", score: 5, maxScore: 5 },
      { name: "Problem Solving", score: 4, maxScore: 5 },
      { name: "Communication", score: 5, maxScore: 5 },
      { name: "Culture Fit", score: 4, maxScore: 5 },
      { name: "Experience Relevance", score: 4, maxScore: 5 },
    ],
    strengths: [
      "Strong React expertise",
      "Excellent communication",
      "Leadership experience",
    ],
    concerns: ["Limited backend experience"],
    notes:
      "Excellent candidate with strong frontend skills. Would be a great addition to the team.",
  },
  {
    id: "2",
    evaluator: {
      name: "Sarah Johnson",
      role: "Senior Developer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    date: "Dec 14, 2024",
    overallRating: 4.0,
    recommendation: "yes",
    criteria: [
      { name: "Technical Skills", score: 4, maxScore: 5 },
      { name: "Problem Solving", score: 4, maxScore: 5 },
      { name: "Communication", score: 4, maxScore: 5 },
      { name: "Culture Fit", score: 4, maxScore: 5 },
      { name: "Experience Relevance", score: 4, maxScore: 5 },
    ],
    strengths: ["Clean code practices", "Good system design knowledge"],
    concerns: ["Could improve on testing strategies"],
    notes: "Solid technical skills and good team player mentality.",
  },
];

const recommendationConfig = {
  strong_yes: { label: "Strong Yes", color: "bg-green-500", icon: ThumbsUp },
  yes: { label: "Yes", color: "bg-green-400", icon: ThumbsUp },
  neutral: { label: "Neutral", color: "bg-yellow-500", icon: Minus },
  no: { label: "No", color: "bg-red-400", icon: ThumbsDown },
  strong_no: { label: "Strong No", color: "bg-red-500", icon: ThumbsDown },
};

export const EvaluationScorecard = () => {
  const averageScore =
    mockEvaluations.reduce((acc, e) => acc + e.overallRating, 0) /
    mockEvaluations.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="rounded-lg border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Evaluation Summary</h3>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Evaluation
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-primary">
              {averageScore.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Avg. Rating</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold">{mockEvaluations.length}</p>
            <p className="text-xs text-muted-foreground">Evaluations</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-green-100">
            <p className="text-3xl font-bold text-green-700">
              {
                mockEvaluations.filter((e) => e.recommendation.includes("yes"))
                  .length
              }
            </p>
            <p className="text-xs text-green-600">Positive</p>
          </div>
        </div>
      </div>

      {/* Individual Evaluations */}
      <div className="space-y-4">
        {mockEvaluations.map((evaluation) => {
          const recConfig = recommendationConfig[evaluation.recommendation];
          const RecIcon = recConfig.icon;

          return (
            <div
              key={evaluation.id}
              className="rounded-lg border bg-card p-4 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={evaluation.evaluator.avatar} />
                    <AvatarFallback>
                      {evaluation.evaluator.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{evaluation.evaluator.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {evaluation.evaluator.role} • {evaluation.date}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${recConfig.color} text-white border-none gap-1`}
                >
                  <RecIcon className="h-3 w-3" />
                  {recConfig.label}
                </Badge>
              </div>

              {/* Criteria Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {evaluation.criteria.map((criterion) => (
                  <div key={criterion.name} className="space-y-1 border-1 p-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span>{criterion.name}</span>
                      <span className="font-medium">
                        {criterion.score}/{criterion.maxScore}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <StarRating
                        rating={criterion.score}
                        maxLength={criterion.maxScore}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Strengths & Concerns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-status-active mb-2">
                    Strengths
                  </p>
                  <ul className="space-y-1">
                    {evaluation.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="text-status-active text-xl mt-1">
                          •
                        </span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-destructive mb-2">
                    Concerns
                  </p>
                  <ul className="space-y-1">
                    {evaluation.concerns.map((concern, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="text-destructive text-xl mt-1">•</span>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Notes */}
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  {evaluation.notes}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
