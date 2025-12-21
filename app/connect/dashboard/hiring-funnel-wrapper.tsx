import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Workflow } from "lucide-react";
import { HiringFunnel } from "@/features/dashboard/components/hiring-funnel";
import FunnelChart from "@/features/dashboard/components/funnel-chart";

export default function HiringFunnelWrapper() {
  const funnelData = [
    { stage: "Applications", value: 1847, fill: "var(--muted-foreground)" },
    { stage: "Screened", value: 892, fill: "var(--primary)" },
    { stage: "Interviewed", value: 234, fill: "var(--status-new)" },
    { stage: "Offered", value: 47, fill: "var(--status-hold)" },
    { stage: "Hired", value: 20, fill: "var(--status-active)" },
  ];

  const conversionRates = [
    { from: "Applications", to: "Screened", rate: 12 },
    { from: "Screened", to: "Interviewed", rate: 13 },
    { from: "Interviewed", to: "Offered", rate: 25 },
    { from: "Offered", to: "Hired", rate: 50 },
  ];

  return (
    <Card className="col-span-2 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <Workflow className="w-5 h-5" />
          Hiring Funnel Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Candidate flow through recruitment stages (Last 30 days)
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-3">
          {/* Funnel Chart */}
          <FunnelChart funnelData={funnelData} />
          {/* Conversion Rates */}
          <div className="space-y-3 border-1 rounded-lg p-3">
            <HiringFunnel conversionRates={conversionRates} />
          </div>

          <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
            <p className="text-sm text-muted-foreground">Overall Conversion</p>
            <p className="text-2xl font-bold text-primary">1.24%</p>
            <p className="text-sm text-primary">+0.3% from last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
