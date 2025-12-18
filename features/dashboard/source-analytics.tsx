"use client";

import { Progress } from "@/components/ui/progress";

interface Source {
  name: string;
  candidates: number;
  percentage: number;
  color?: string;
}

export function SourceAnalytics({
  sources,
  totalCandidates,
}: {
  sources: Source[];
  totalCandidates: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">{totalCandidates}</span>
        <span className="text-sm text-muted-foreground">total candidates</span>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{source.name}</span>
              <span className="text-muted-foreground">
                {source.candidates} ({source.percentage}%)
              </span>
            </div>

            <Progress
              value={source.percentage}
              indicatorClassName={source.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
