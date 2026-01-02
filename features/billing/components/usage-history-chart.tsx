import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { UsageHistoryPoint } from "@/interfaces/billing";

interface UsageHistoryChartProps {
  data: UsageHistoryPoint[];
}

export const UsageHistoryChart = ({ data }: UsageHistoryChartProps) => {
  return (
    <section>
      <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Usage History
      </h3>
      <Card className="border bg-card">
        <CardContent className="p-3">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  tickMargin={8}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--card-foreground)",
                    boxShadow: "0 4px 12px var(--foreground)/15",
                  }}
                  labelStyle={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: 16 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Line
                  type="monotone"
                  dataKey="apiCalls"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  name="API Calls (K)"
                />
                <Line
                  type="monotone"
                  dataKey="storage"
                  stroke="var(--muted-foreground)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  name="Storage (GB)"
                />
                <Line
                  type="monotone"
                  dataKey="seats"
                  stroke="var(--foreground)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  name="Team Seats"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
