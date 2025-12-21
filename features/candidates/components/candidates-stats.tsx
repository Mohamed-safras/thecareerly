"use client";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Candidates",
    value: "1,284",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
    iconColor: "text-blue-500 bg-blue-100",
  },
  {
    title: "Active Applications",
    value: "342",
    change: "+8.2%",
    changeType: "positive",
    icon: Clock,
    iconColor: "text-yellow-500 bg-yellow-100",
  },
  {
    title: "Interviews This Week",
    value: "28",
    change: "+15.3%",
    changeType: "positive",
    icon: UserCheck,
    iconColor: "text-green-500 bg-green-100",
  },
  {
    title: "Conversion Rate",
    value: "24.8%",
    change: "+3.1%",
    changeType: "positive",
    icon: TrendingUp,
    iconColor: "text-purple-500 bg-purple-100",
  },
];

export const CandidatesStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.iconColor}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
