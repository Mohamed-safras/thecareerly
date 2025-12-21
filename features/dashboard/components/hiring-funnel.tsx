import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

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
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{item.from}</span>
            <ArrowRight className="h-3 w-3 " />
            <span>{item.to}</span>
          </div>

          <div className="flex items-center justify-between ">
            <Progress value={item.rate} indicatorClassName="bg-primary" />
            <span className="ml-3 text-sm font-semibold text-primary">
              {item.rate}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
