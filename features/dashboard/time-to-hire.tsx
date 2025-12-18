import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Clock, Target, Zap } from "lucide-react";

interface TimeMetric {
  label: string;
  value: string;
  change: number;
  target?: string;
}

interface TimeToHireProps {
  metrics: TimeMetric[];
  avgDays: number;
  trend: "up" | "down";
}

export function TimeToHire({ metrics, avgDays, trend }: TimeToHireProps) {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Time To Hire
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Measure how long it takes to fill a role from start to finish
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="text-4xl font-bold">{avgDays}</div>
            <p className="text-sm text-muted-foreground">Average days</p>
          </div>
          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
              trend === "down"
                ? "bg-status-active/10 text-status-active"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend === "down" ? (
              <TrendingDown className="h-4 w-4" />
            ) : (
              <TrendingUp className="h-4 w-4" />
            )}
            {trend === "down" ? "3 days faster" : "2 days slower"}
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {metric.label.includes("Screen") ? (
                    <Zap className="h-4 w-4 text-primary" />
                  ) : (
                    <Target className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{metric.label}</p>
                  {metric.target && (
                    <p className="text-xs text-muted-foreground">
                      Target: {metric.target}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{metric.value}</p>
                <p
                  className={`text-xs ${
                    metric.change < 0
                      ? "text-status-active"
                      : "text-destructive"
                  }`}
                >
                  {metric.change < 0 ? "" : "+"}
                  {metric.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
