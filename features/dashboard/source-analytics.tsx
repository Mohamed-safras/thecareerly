import { cn } from "@/lib/utils";

interface Source {
  name: string;
  candidates: number;
  percentage: number;
  color: string;
}

interface SourceAnalyticsProps {
  sources: Source[];
  totalCandidates: number;
}

export function SourceAnalytics({
  sources,
  totalCandidates,
}: SourceAnalyticsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">{totalCandidates}</span>
        <span className="text-sm text-muted-foreground">total candidates</span>
      </div>

      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{source.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{source.candidates}</span>
                <span className="text-xs">({source.percentage}%)</span>
              </div>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  source.color
                )}
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
