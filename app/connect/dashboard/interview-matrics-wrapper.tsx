import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Video, MapPin, Phone, Calendar, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const interviewTypeData = [
  { type: "Phone Screen", completed: 45, scheduled: 52, passRate: 78 },
  { type: "Technical", completed: 38, scheduled: 42, passRate: 65 },
  { type: "Culture Fit", completed: 28, scheduled: 30, passRate: 85 },
  { type: "Final Round", completed: 18, scheduled: 20, passRate: 72 },
];

const radarData = [
  { subject: "Technical Skills", A: 85, fullMark: 100 },
  { subject: "Communication", A: 78, fullMark: 100 },
  { subject: "Problem Solving", A: 90, fullMark: 100 },
  { subject: "Culture Fit", A: 88, fullMark: 100 },
  { subject: "Leadership", A: 72, fullMark: 100 },
  { subject: "Experience", A: 82, fullMark: 100 },
];

const interviewModes = [
  { mode: "Video Call", icon: Video, count: 156, percentage: 62 },
  { mode: "On-site", icon: MapPin, count: 68, percentage: 27 },
  { mode: "Phone", icon: Phone, count: 28, percentage: 11 },
];

export function InterviewMetricsWrapper() {
  const totalScheduled = interviewTypeData.reduce(
    (acc, d) => acc + d.scheduled,
    0
  );
  const totalCompleted = interviewTypeData.reduce(
    (acc, d) => acc + d.completed,
    0
  );
  const completionRate = Math.round((totalCompleted / totalScheduled) * 100);

  return (
    <Card className="col-span-2 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Interview Metrics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comprehensive interview performance analysis
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Interview Types */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">By Interview Stage</span>
              <Badge variant="outline">{completionRate}% completion</Badge>
            </div>
            {interviewTypeData.map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.type}</span>
                  <span className="text-muted-foreground">
                    {item.completed}/{item.scheduled}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(item.completed / item.scheduled) * 100}
                    className="h-2"
                  />
                  <span className="text-xs font-medium text-status-active w-10">
                    {item.passRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Radar Chart */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium mb-2">Avg Candidate Scores</p>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={radarData}
                >
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 9 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 9 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    strokeWidth={2}
                    opacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interview Modes */}
          <div className="space-y-4">
            <p className="text-sm font-medium mb-2">Interview Modes</p>
            {interviewModes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.mode}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.mode}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.count} interviews
                    </p>
                  </div>
                  <Badge variant="secondary">{item.percentage}%</Badge>
                </div>
              );
            })}

            {/* Quick Stats */}
            <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Key Insight</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Video interviews have 23% higher show rate than on-site
                interviews this month.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
