import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Activity, HardDrive, Users, Zap } from "lucide-react";
import { UsageMetric } from "@/interfaces/billing";

const iconMap: Record<string, React.ElementType> = {
  api: Activity,
  storage: HardDrive,
  seats: Users,
  credits: Zap,
};

interface UsageMetricsCardProps {
  metric: UsageMetric;
}

export const UsageMetricsCard = ({ metric }: UsageMetricsCardProps) => {
  const percentage = (metric.used / metric.limit) * 100;
  const isWarning = percentage >= 75 && percentage < 90;
  const isCritical = percentage >= 90;

  const Icon = iconMap[metric.icon] || Activity;

  return (
    <Card
      className={cn(
        "border p-0 transition-all duration-200",
        isCritical && "border-destructive/30",
        isWarning && "border-primary/30"
      )}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-3 rounded-xl transition-colors",
                isCritical
                  ? "bg-destructive/10 text-destructive"
                  : isWarning
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-medium block">{metric.name}</span>
              <span className="text-xs text-muted-foreground">
                {metric.unit}
              </span>
            </div>
          </div>
          {(isWarning || isCritical) && (
            <span
              className={cn(
                "text-xs px-2.5 py-1 rounded-full font-medium",
                isCritical
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              )}
            >
              {isCritical ? "Critical" : "Warning"}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight">
              {metric.used.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              / {metric.limit.toLocaleString()}
            </span>
          </div>

          <div className="space-y-1.5">
            <Progress
              value={percentage}
              className={cn(
                "h-2 bg-muted",
                isCritical
                  ? "[&>div]:bg-destructive"
                  : isWarning
                  ? "[&>div]:bg-primary"
                  : "[&>div]:bg-primary/60"
              )}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {percentage.toFixed(0)}% used
              </p>
              <p className="text-xs text-muted-foreground">
                {(metric.limit - metric.used).toLocaleString()} remaining
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
