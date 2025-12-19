import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Clock } from "lucide-react";

const timeToHireData = [
  {
    month: "Jul",
    avgDays: 28,
    screenToInterview: 6,
    interviewToOffer: 14,
    offerToHire: 8,
  },
  {
    month: "Aug",
    avgDays: 26,
    screenToInterview: 5.5,
    interviewToOffer: 13,
    offerToHire: 7.5,
  },
  {
    month: "Sep",
    avgDays: 24,
    screenToInterview: 5,
    interviewToOffer: 12,
    offerToHire: 7,
  },
  {
    month: "Oct",
    avgDays: 22,
    screenToInterview: 4.5,
    interviewToOffer: 11,
    offerToHire: 6.5,
  },
  {
    month: "Nov",
    avgDays: 20,
    screenToInterview: 4,
    interviewToOffer: 10,
    offerToHire: 6,
  },
  {
    month: "Dec",
    avgDays: 18,
    screenToInterview: 4.2,
    interviewToOffer: 8.7,
    offerToHire: 5.1,
  },
];

export default function TimeToHireWrapper() {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time to Hire Trends
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            6-month hiring velocity
          </p>
        </div>
        <Badge className="bg-status-active/10 text-status-active border-status-active/20">
          <TrendingDown className="h-3 w-3 mr-1" />
          36% faster
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] border-1 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeToHireData}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) => `${value}d`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = {
                    avgDays: "Avg Total",
                    screenToInterview: "Screen → Interview",
                    interviewToOffer: "Interview → Offer",
                    offerToHire: "Offer → Hire",
                  };
                  return [`${value} days`, labels[name] || name];
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    avgDays: "Avg Total",
                    screenToInterview: "Screen → Interview",
                    interviewToOffer: "Interview → Offer",
                    offerToHire: "Offer → Hire",
                  };
                  return (
                    <span className="text-xs">{labels[value] || value}</span>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="avgDays"
                stroke="var(--primary)"
                strokeWidth={3}
                opacity="0.7"
                dot={{ fill: "var(--primary)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="screenToInterview"
                stroke="var(--status-new)"
                strokeWidth={2}
                opacity="0.7"
                strokeDasharray="5 5"
                dot={{ fill: "var(--status-new)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="interviewToOffer"
                stroke="var(--status-hold)"
                strokeWidth={2}
                opacity="0.7"
                strokeDasharray="5 5"
                dot={{ fill: "var(--status-hold)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="offerToHire"
                stroke="var(--status-active)"
                strokeWidth={2}
                opacity="0.7"
                strokeDasharray="5 5"
                dot={{
                  fill: "var(--status-active)",
                  strokeWidth: 3,
                  r: 3,
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
          <div className="text-center p-2 rounded-lg bg-status-new/70">
            <p className="text-lg font-bold text-muted">4 Day</p>
            <p className="text-xs font-semibold  text-muted">
              Screen → Interview
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-status-hold/70">
            <p className="text-lg font-bold text-muted">8 Day</p>
            <p className="text-xs font-semibold  text-muted">
              Interview → Offer
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-status-active/70">
            <p className="text-lg font-bold text-muted">5 Day</p>
            <p className="text-xs font-semibold  text-muted">Offer → Hire</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
