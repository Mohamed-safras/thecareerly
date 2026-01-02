import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { TrialInfo } from "@/interfaces/billing";

interface TrialStatusCardProps {
  trial: TrialInfo;
  onUpgrade: () => void;
}

export const TrialStatusCard = ({ trial, onUpgrade }: TrialStatusCardProps) => {
  if (!trial.isActive) return null;

  const totalDays = 14;
  const usedDays = totalDays - trial.daysRemaining;
  const progressPercent = (usedDays / totalDays) * 100;
  const isUrgent = trial.daysRemaining <= 3;

  return (
    <Card
      className={`p-0 ${
        isUrgent
          ? "border-destructive/50 bg-destructive/5"
          : "border-primary/30 bg-primary/5"
      }`}
    >
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div
            className={`p-3 rounded-full ${
              isUrgent ? "bg-destructive/10" : "bg-primary/10"
            } shrink-0 self-start sm:self-center`}
          >
            {isUrgent ? (
              <Clock className="h-5 w-5 text-destructive" />
            ) : (
              <Sparkles className="h-5 w-5 text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">
                  {trial.plan} Trial
                </h3>
                <p className="text-sm text-muted-foreground">
                  {trial.daysRemaining} day
                  {trial.daysRemaining !== 1 ? "s" : ""} remaining • Ends{" "}
                  {format(trial.endDate, "MMM d, yyyy")}
                </p>
              </div>
              <Button
                onClick={onUpgrade}
                size="sm"
                className="w-full sm:w-auto"
              >
                Upgrade Now
              </Button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Trial progress</span>
                <span>
                  {usedDays} of {totalDays} days used
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
