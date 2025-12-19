import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

const offerData = [
  { month: "Jul", sent: 12, accepted: 10, declined: 2, pending: 0 },
  { month: "Aug", sent: 15, accepted: 12, declined: 2, pending: 1 },
  { month: "Sep", sent: 18, accepted: 15, declined: 2, pending: 1 },
  { month: "Oct", sent: 14, accepted: 11, declined: 2, pending: 1 },
  { month: "Nov", sent: 20, accepted: 17, declined: 2, pending: 1 },
  { month: "Dec", sent: 16, accepted: 14, declined: 1, pending: 1 },
];

const declineReasons = [
  { reason: "Compensation", count: 5, percentage: 45 },
  { reason: "Counter Offer", count: 3, percentage: 27 },
  { reason: "Location", count: 2, percentage: 18 },
  { reason: "Other", count: 1, percentage: 10 },
];

export function OfferAnalytics() {
  const totalSent = offerData.reduce((acc, d) => acc + d.sent, 0);
  const totalAccepted = offerData.reduce((acc, d) => acc + d.accepted, 0);
  const totalDeclined = offerData.reduce((acc, d) => acc + d.declined, 0);
  const acceptanceRate = Math.round((totalAccepted / totalSent) * 100);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          <BadgeCheck /> Offer Analytics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Offer acceptance trends and decline analysis
        </p>
      </CardHeader>
      <CardContent>
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-primary/70 text-center">
            <p className="text-lg font-bold text-muted">{totalSent}</p>
            <p className="text-xs text-muted">Offers Sent</p>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-status-active/70">
            <CheckCircle2 className="h-4 w-4 text-status-active" />
            <div>
              <p className="text-lg font-bold text-muted">{totalAccepted}</p>
              <p className="text-xs text-muted">Accepted</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/70">
            <XCircle className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-lg font-bold text-muted">{totalDeclined}</p>
              <p className="text-xs text-muted">Declined</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-status-hold/70">
            <Clock className="h-4 w-4 text-status-hold" />
            <div>
              <p className="text-lg font-bold text-muted">3</p>
              <p className="text-xs text-muted">Pending</p>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        <div className="h-[180px] mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={offerData}
              margin={{ top: 10, right: 0, left: -40, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="sent"
                stackId="1"
                stroke="var(--primary)"
                fill="var(--primary)"
                name="Sent"
                opacity="0.7"
              />
              <Area
                type="monotone"
                dataKey="accepted"
                stackId="2"
                stroke="var(--status-active)"
                fill="var(--status-active)"
                name="Accepted"
                opacity="0.7"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Acceptance Rate & Decline Reasons */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Acceptance Rate
              </span>
              <Badge className="bg-status-active/10 text-status-active border-status-active/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5%
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold">{acceptanceRate}%</div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-status-active/70 rounded-full"
                  style={{ width: `${acceptanceRate}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Decline Reasons
            </p>
            <div className="space-y-1.5">
              {declineReasons.slice(0, 3).map((item) => (
                <div
                  key={item.reason}
                  className="flex items-center justify-between text-xs"
                >
                  <span>{item.reason}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
