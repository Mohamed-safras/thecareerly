import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Clock, Target } from "lucide-react";

const departmentData = [
  {
    department: "Engineering",
    openRoles: 12,
    applications: 456,
    hires: 8,
    avgTimeToHire: 22,
  },
  {
    department: "Design",
    openRoles: 4,
    applications: 189,
    hires: 3,
    avgTimeToHire: 18,
  },
  {
    department: "Product",
    openRoles: 3,
    applications: 134,
    hires: 2,
    avgTimeToHire: 25,
  },
  {
    department: "Marketing",
    openRoles: 5,
    applications: 278,
    hires: 4,
    avgTimeToHire: 16,
  },
  {
    department: "Sales",
    openRoles: 8,
    applications: 345,
    hires: 5,
    avgTimeToHire: 14,
  },
  {
    department: "Support",
    openRoles: 6,
    applications: 223,
    hires: 3,
    avgTimeToHire: 12,
  },
];

export default function DepartmentAnalyticWrapper() {
  const totalOpenRoles = departmentData.reduce(
    (acc, d) => acc + d.openRoles,
    0
  );
  const totalApplications = departmentData.reduce(
    (acc, d) => acc + d.applications,
    0
  );
  const totalHires = departmentData.reduce((acc, d) => acc + d.hires, 0);
  const avgTime = Math.round(
    departmentData.reduce((acc, d) => acc + d.avgTimeToHire, 0) /
      departmentData.length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Department Analytics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Hiring metrics by department
        </p>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-primary/10 text-center">
            <Target className="h-4 w-4 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">{totalOpenRoles}</p>
            <p className="text-[10px] text-muted-foreground">Open Roles</p>
          </div>
          <div className="p-3 rounded-lg bg-status-new/10 text-center">
            <Users className="h-4 w-4 mx-auto mb-1 text-status-new" />
            <p className="text-lg font-bold">{totalApplications}</p>
            <p className="text-[10px] text-muted-foreground">Applications</p>
          </div>
          <div className="p-3 rounded-lg bg-status-active/10 text-center">
            <Users className="h-4 w-4 mx-auto mb-1 text-status-active" />
            <p className="text-lg font-bold">{totalHires}</p>
            <p className="text-[10px] text-muted-foreground">Hires</p>
          </div>
          <div className="p-3 rounded-lg bg-status-hold/10 text-center">
            <Clock className="h-4 w-4 mx-auto mb-1 text-status-hold" />
            <p className="text-lg font-bold">{avgTime}d</p>
            <p className="text-[10px] text-muted-foreground">Avg Time</p>
          </div>
        </div>

        {/* Stacked Bar Chart */}
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="department"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                angle={-20}
                textAnchor="end"
                height={50}
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
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
              <Bar
                dataKey="applications"
                fill="var(--primary)"
                radius={[0, 0, 0, 0]}
                name="Applications"
                barSize={24}
              />
              <Bar
                dataKey="hires"
                fill="var(--status-active)"
                radius={[4, 4, 0, 0]}
                name="Hires"
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Fastest Hiring Department
            </p>
            <p className="font-semibold">Support</p>
          </div>
          <Badge className="bg-status-active/10 text-status-active border-status-active/20">
            12 days avg
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
