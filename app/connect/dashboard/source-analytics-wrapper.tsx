import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ExternalLink } from "lucide-react";

const sourceData = [
  {
    name: "LinkedIn",
    candidates: 523,
    hires: 12,
    cost: 2400,
    quality: 4.2,
    color: "var(--primary)",
  },
  {
    name: "Indeed",
    candidates: 387,
    hires: 6,
    cost: 1800,
    quality: 3.8,
    color: "var(--status-new)",
  },
  {
    name: "Referrals",
    candidates: 298,
    hires: 8,
    cost: 500,
    quality: 4.6,
    color: "var(--status-active)",
  },
  {
    name: "Website",
    candidates: 189,
    hires: 4,
    cost: 200,
    quality: 3.5,
    color: "var(--status-hold)",
  },
  {
    name: "Job Boards",
    candidates: 156,
    hires: 2,
    cost: 1200,
    quality: 3.2,
    color: "var(--muted-foreground)",
  },
];

const pieData = sourceData.map((item) => ({
  name: item.name,
  value: item.candidates,
  fill: item.color,
}));

export default function SourceAnalyticsWrapper() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Source Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Candidate quality and cost analysis by source
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            <ExternalLink className="h-3 w-3" />
            Export
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Distribution by Source
            </p>
          </div>

          {/* Bar Chart - Hires by Source */}
          <div className="lg:col-span-2">
            <p className="text-sm font-medium mb-3">Hires by Source</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sourceData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 11,
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => {
                      const labels: Record<string, string> = {
                        hires: "Hires",
                        candidates: "Candidates",
                      };
                      return [value, labels[name] || name];
                    }}
                  />
                  <Bar dataKey="hires" radius={[4, 4, 0, 0]} barSize={36}>
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Source Details Table */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-5 gap-4 text-xs text-muted-foreground font-medium pb-2 border-b">
            <span>Source</span>
            <span className="text-center">Candidates</span>
            <span className="text-center">Hires</span>
            <span className="text-center">Cost/Hire</span>
            <span className="text-center">Quality Score</span>
          </div>
          {sourceData.map((source, index) => (
            <div
              key={source.name}
              className="grid grid-cols-5 gap-4 py-3 items-center hover:bg-muted/30 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm font-medium">{source.name}</span>
              </div>
              <span className="text-center text-sm">{source.candidates}</span>
              <span className="text-center text-sm font-medium">
                {source.hires}
              </span>
              <span className="text-center text-sm">
                ${Math.round(source.cost / (source.hires || 1))}
              </span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-medium">{source.quality}</span>
                <TrendingUp className="h-3 w-3 text-status-active" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
