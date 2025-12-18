import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, Users, FileCheck, Send } from "lucide-react";
import React from "react";

interface TrendData {
  day: string;
  applications: number;
  interviews: number;
  offers: number;
}

interface WeeklyTrendsProps {
  data: TrendData[];
}

export function WeeklyTrends({ data }: WeeklyTrendsProps) {
  const maxApplications = Math.max(...data.map((d) => d.applications));
  const totalApplications = data.reduce((acc, d) => acc + d.applications, 0);
  const totalInterviews = data.reduce((acc, d) => acc + d.interviews, 0);
  const totalOffers = data.reduce((acc, d) => acc + d.offers, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Weekly Trends
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track key recruitment metrics and patterns week over week.
        </p>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <SummaryStatusCard
            name="Applications"
            value={totalApplications}
            className=" bg-primary/5"
          />
          <SummaryStatusCard
            name="Interviews"
            value={totalInterviews}
            className="bg-status-new/10"
          />
          <SummaryStatusCard
            name="Offers"
            value={totalOffers}
            className="bg-status-active/10"
          />
        </div>

        {/* Bar Chart */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-3">
            Daily Applications
          </p>
          <div className="flex items-end justify-between gap-2 h-32">
            {data.map((day) => (
              <div
                key={day.day}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="relative w-full flex justify-center">
                  <div
                    className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all duration-300 hover:from-primary/90 hover:to-primary/50"
                    style={{
                      height: `${(day.applications / maxApplications) * 100}px`,
                      minHeight: "8px",
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Applications</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-status-new" />
            <span className="text-xs text-muted-foreground">Interviews</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-status-active" />
            <span className="text-xs text-muted-foreground">Offers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const SummaryStatusCard: React.FC<{
  name: string;
  value: number;
  className?: string;
}> = ({ name, value, className }) => {
  return (
    <div className={cn(className, "text-center p-3 rounded-lg")}>
      <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{name}</p>
    </div>
  );
};
