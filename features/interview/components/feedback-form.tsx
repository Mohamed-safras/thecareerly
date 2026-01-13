import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Send,
  Save,
  ThumbsUp,
  ThumbsDown,
  Minus,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoringCategory {
  id: string;
  name: string;
  description: string;
  weight: number;
}

const scoringCategories: ScoringCategory[] = [
  {
    id: "technical",
    name: "Technical Skills",
    description:
      "Proficiency in required technical competencies and problem-solving approach",
    weight: 30,
  },
  {
    id: "communication",
    name: "Communication",
    description:
      "Clarity of expression, active listening, and articulation of ideas",
    weight: 20,
  },
  {
    id: "problem_solving",
    name: "Problem Solving",
    description: "Analytical thinking, creativity, and approach to challenges",
    weight: 25,
  },
  {
    id: "culture_fit",
    name: "Culture Fit",
    description: "Alignment with company values, teamwork, and collaboration",
    weight: 15,
  },
  {
    id: "experience",
    name: "Relevant Experience",
    description: "Background relevance and applicable skills from past roles",
    weight: 10,
  },
];

const ratingLabels = [
  { value: 1, label: "Poor", color: "text-destructive" },
  { value: 2, label: "Below Average", color: "text-orange-500" },
  { value: 3, label: "Average", color: "text-yellow-500" },
  { value: 4, label: "Good", color: "text-emerald-500" },
  { value: 5, label: "Excellent", color: "text-primary" },
];

type Recommendation = "strong_yes" | "yes" | "neutral" | "no" | "strong_no";

const recommendationOptions: {
  value: Recommendation;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "strong_yes",
    label: "Strong Yes",
    icon: <ThumbsUp className="h-4 w-4" />,
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20",
  },
  {
    value: "yes",
    label: "Yes",
    icon: <ThumbsUp className="h-4 w-4" />,
    color:
      "bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20",
  },
  {
    value: "neutral",
    label: "Neutral",
    icon: <Minus className="h-4 w-4" />,
    color:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/30 hover:bg-yellow-500/20",
  },
  {
    value: "no",
    label: "No",
    icon: <ThumbsDown className="h-4 w-4" />,
    color:
      "bg-orange-500/10 text-orange-600 border-orange-500/30 hover:bg-orange-500/20",
  },
  {
    value: "strong_no",
    label: "Strong No",
    icon: <ThumbsDown className="h-4 w-4" />,
    color:
      "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  },
];

interface FeedbackFormProps {
  candidateName?: string;
  interviewType?: string;
  onSubmit?: (feedback: FeedbackData) => void;
  onSaveDraft?: (feedback: FeedbackData) => void;
}

export interface FeedbackData {
  scores: Record<string, number>;
  comments: Record<string, string>;
  strengths: string;
  concerns: string;
  recommendation: Recommendation | null;
  overallNotes: string;
}

export function FeedbackForm({
  candidateName = "Candidate",
  interviewType = "Technical Interview",
  onSubmit,
  onSaveDraft,
}: FeedbackFormProps) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [strengths, setStrengths] = useState("");
  const [concerns, setConcerns] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [overallNotes, setOverallNotes] = useState("");

  const calculateOverallScore = () => {
    let totalWeight = 0;
    let weightedSum = 0;

    scoringCategories.forEach((category) => {
      if (scores[category.id]) {
        weightedSum += scores[category.id] * category.weight;
        totalWeight += category.weight;
      }
    });

    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : null;
  };

  const completedCategories = Object.keys(scores).length;
  const isComplete =
    completedCategories === scoringCategories.length && recommendation !== null;

  const getFeedbackData = (): FeedbackData => ({
    scores,
    comments,
    strengths,
    concerns,
    recommendation,
    overallNotes,
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(getFeedbackData());
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(getFeedbackData());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{candidateName}</h3>
          <p className="text-sm text-muted-foreground">{interviewType}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {completedCategories}/{scoringCategories.length} completed
          </Badge>
          {calculateOverallScore() && (
            <Badge className="bg-primary/10 text-primary border-primary/30">
              <Star className="h-3 w-3 mr-1 fill-primary" />
              {calculateOverallScore()} avg
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      {/* Scoring Categories */}
      <div className="space-y-6">
        <h4 className="font-medium flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          Scoring Rubric
        </h4>

        <div className="grid gap-4">
          {scoringCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="pb-3 bg-muted/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {category.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs w-fit">
                    Weight: {category.weight}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Rating Selection */}
                <div className="flex flex-wrap gap-2">
                  {ratingLabels.map((rating) => (
                    <button
                      key={rating.value}
                      onClick={() =>
                        setScores((prev) => ({
                          ...prev,
                          [category.id]: rating.value,
                        }))
                      }
                      className={cn(
                        "flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 transition-all min-w-[60px] sm:min-w-[80px]",
                        scores[category.id] === rating.value
                          ? "border-primary bg-primary/5"
                          : "border-transparent bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <div className="flex gap-0.5 mb-1">
                        {Array.from({ length: rating.value }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3 w-3 sm:h-4 sm:w-4",
                              scores[category.id] === rating.value
                                ? "fill-primary text-primary"
                                : "fill-muted-foreground/30 text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs font-medium",
                          scores[category.id] === rating.value
                            ? rating.color
                            : "text-muted-foreground"
                        )}
                      >
                        {rating.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Category Comment */}
                <Textarea
                  placeholder={`Notes on ${category.name.toLowerCase()}...`}
                  value={comments[category.id] || ""}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      [category.id]: e.target.value,
                    }))
                  }
                  className="min-h-[60px] text-sm resize-none"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Strengths & Concerns */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-emerald-600">
            <ThumbsUp className="h-4 w-4" />
            Key Strengths
          </Label>
          <Textarea
            placeholder="What stood out positively about this candidate?"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-orange-600">
            <AlertCircle className="h-4 w-4" />
            Concerns / Areas for Growth
          </Label>
          <Textarea
            placeholder="Any concerns or areas where the candidate could improve?"
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
      </div>

      <Separator />

      {/* Overall Recommendation */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Overall Recommendation</Label>
        <div className="flex flex-wrap gap-2">
          {recommendationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRecommendation(option.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
                recommendation === option.value
                  ? option.color + " border-current"
                  : "border-transparent bg-muted/50 hover:bg-muted text-muted-foreground"
              )}
            >
              {option.icon}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label>Additional Notes</Label>
        <Textarea
          placeholder="Any other observations or context for the hiring team..."
          value={overallNotes}
          onChange={(e) => setOverallNotes(e.target.value)}
          className="min-h-[80px] resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={handleSaveDraft}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          disabled={!isComplete}
          onClick={handleSubmit}
        >
          <Send className="h-4 w-4 mr-2" />
          Submit Feedback
        </Button>
      </div>

      {!isComplete && (
        <p className="text-xs text-muted-foreground text-center">
          Complete all scoring categories and select a recommendation to submit
        </p>
      )}
    </div>
  );
}
