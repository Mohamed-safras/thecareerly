import { ArrowDown, ArrowRight } from "lucide-react";

interface FunnelStage {
  from: string;
  to: string;
  rate?: number;
}

interface HiringFunnelProps {
  conversionRates: FunnelStage[];
}

export function HiringFunnel({ conversionRates }: HiringFunnelProps) {
  return (
    <div>
      {conversionRates.map((item, index) => (
        <div
          key={index}
          className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>{item.from}</span>
            <ArrowRight className="h-3 w-3 " />
            <span>{item.to}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${item.rate}%` }}
              />
            </div>
            <span className="ml-3 text-sm font-semibold text-primary">
              {item.rate}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
