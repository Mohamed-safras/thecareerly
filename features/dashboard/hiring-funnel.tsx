import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Workflow } from "lucide-react";

interface FunnelStage {
  name: string;
  count: number;
  percentage: number;
  conversionRate?: number;
}

interface HiringFunnelProps {
  stages: FunnelStage[];
}

export function HiringFunnel({ stages }: HiringFunnelProps) {
  const maxCount = Math.max(...stages.map((s) => s.count));

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Workflow className="h-4 w-4 text-primary" />
          Hiring Funnel
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track candidates through each stage of the recruitment journey
        </p>
      </CardHeader>
      <CardContent>
        {stages.map((stage, index) => (
          <div key={stage.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{stage.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-bold">
                  {stage.count}
                </span>
                {stage.conversionRate !== undefined && (
                  <span className="text-xs text-status-active font-medium">
                    {stage.conversionRate}%
                  </span>
                )}
              </div>
            </div>
            <div className="relative h-5 w-full overflow-hidden rounded-full bg-muted-foreground/70">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
                style={{ width: `${(stage.count / maxCount) * 100}%` }}
              />
              <div className="absolute inset-0 flex items-center px-3">
                <span className="text-xs font-medium text-primary-foreground">
                  {stage.percentage}% of total
                </span>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
