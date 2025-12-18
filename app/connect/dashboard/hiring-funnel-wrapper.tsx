import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Workflow } from "lucide-react";
import { HiringFunnel } from "@/features/dashboard/hiring-funnel";

const funnelData = [
  { stage: "Applications", value: 1847, fill: "var(--muted-foreground)" },
  { stage: "Screened", value: 892, fill: "var(--primary)" },
  { stage: "Interviewed", value: 234, fill: "var(--status-new)" },
  { stage: "Offered", value: 47, fill: "var(--status-hold)" },
  { stage: "Hired", value: 23, fill: "var(--status-active)" },
];

const conversionRates = [
  { from: "Applications", to: "Screened", rate: 48.3 },
  { from: "Screened", to: "Interviewed", rate: 26.2 },
  { from: "Interviewed", to: "Offered", rate: 20.1 },
  { from: "Offered", to: "Hired", rate: 48.9 },
];

export default function HiringFunnelWrapper() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <Workflow className="w-4 h-4" />
          Hiring Funnel Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Candidate flow through recruitment stages (Last 30 days)
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-3">
          {/* Funnel Chart */}
          <div className="lg:col-span-2 border-1 rounded-lg  h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={funnelData}
                margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="stage"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--foreground)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Candidates",
                  ]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="right"
                    fill="var(--foreground)"
                    fontSize={12}
                    fontWeight={600}
                    formatter={(value: number) => value.toLocaleString()}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Rates */}
          <div className="space-y-3 border-1 rounded-lg p-3">
            <HiringFunnel conversionRates={conversionRates} />
          </div>

          <div className="mt-3 p-3 rounded-lg border border-status-active/20 bg-status-active/5">
            <p className="text-xs text-muted-foreground">Overall Conversion</p>
            <p className="text-2xl font-bold text-status-active">1.24%</p>
            <p className="text-xs text-status-active">+0.3% from last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
