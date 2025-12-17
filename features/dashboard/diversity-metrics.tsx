import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, TrendingUp } from "lucide-react";
import { JSX } from "react";

interface DiversityData {
  category: string;
  percentage: number;
  change: number;
  color: string;
}

interface DiversityMetricsProps {
  data: DiversityData[];
}

export function DiversityMetrics({ data }: DiversityMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users2 className="h-4 w-4 text-primary" />
          Diversity & Inclusion
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Donut-style visual */}
        <div className="mb-4">
          <div className="flex items-center justify-center ">
            <div className="relative h-24 w-24 flex-shrink-0">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                {
                  data.reduce(
                    (acc, item) => {
                      const circumference = 2 * Math.PI * 40;
                      const strokeDasharray =
                        (item.percentage / 100) * circumference;
                      const strokeDashoffset = -acc.offset;

                      acc.elements.push(
                        <circle
                          key={item.category}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          strokeWidth="12"
                          className={item.color}
                          strokeDasharray={`${strokeDasharray} ${circumference}`}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      );
                      acc.offset += strokeDasharray;
                      return acc;
                    },
                    { elements: [] as JSX.Element[], offset: 0 }
                  ).elements
                }
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold">87%</p>
                  <p className="text-[10px] text-muted-foreground">Goal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {data.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {/* <div className={`h-3 w-3 rounded-full ${item.color}`} /> */}
                  <span className="text-sm">{item.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.percentage}%</span>
                  <span
                    className={`text-xs ${
                      item.change >= 0
                        ? "text-status-active"
                        : "text-destructive"
                    }`}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-status-active/10 text-status-active text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>Pipeline diversity up 12% from last quarter</span>
        </div>
      </CardContent>
    </Card>
  );
}
