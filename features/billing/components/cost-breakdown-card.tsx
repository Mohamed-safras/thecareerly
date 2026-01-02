import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamMember } from "@/interfaces/access";
import { roleConfig } from "@/features/access/data/team-data";

interface CostBreakdownProps {
  members: TeamMember[];
  basePlanCost?: number;
}

export const CostBreakdown = ({
  members,
  basePlanCost = 99,
}: CostBreakdownProps) => {
  const activeMembers = members.filter((m) => m.status === "active");
  const memberCosts = activeMembers.reduce((sum, m) => sum + m.costPerMonth, 0);
  const totalCost = basePlanCost + memberCosts;
  const averageCostPerMember =
    activeMembers.length > 0 ? memberCosts / activeMembers.length : 0;

  // Group by role
  const costByRole = members.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = { count: 0, cost: 0 };
    }
    acc[member.role].count += 1;
    acc[member.role].cost += member.costPerMonth;
    return acc;
  }, {} as Record<string, { count: number; cost: number }>);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground">Monthly Total</p>
            <p className="text-xl font-bold text-foreground">${totalCost}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Base: ${basePlanCost} + Team: ${memberCosts}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">Avg. per Member</p>
            <p className="text-xl font-bold text-foreground">
              ${averageCostPerMember.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {activeMembers.length} active members
            </p>
          </div>
        </div>

        {/* Cost by role */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">By Role</p>
          {Object.entries(costByRole).map(([role, data]) => (
            <div
              key={role}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    roleConfig[role as keyof typeof roleConfig].color
                  )}
                >
                  {roleConfig[role as keyof typeof roleConfig].label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  × {data.count}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                ${data.cost}/mo
              </span>
            </div>
          ))}
        </div>

        {/* Individual breakdown */}
        <div className="space-y-2 pt-2 border-t">
          <p className="text-sm font-medium text-muted-foreground">
            Per Member
          </p>
          <div className="max-h-40 overflow-y-auto space-y-1.5">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between text-sm py-1.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-foreground truncate">
                    {member.name}
                  </span>
                  {member.status === "pending" && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-status-hold-bg text-status-hold"
                    >
                      Pending
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium shrink-0",
                    member.costPerMonth === 0
                      ? "text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  {member.costPerMonth > 0 ? `$${member.costPerMonth}` : "Free"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings tip */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-status-active-bg/50 border border-status-active/10">
          <TrendingDown className="h-4 w-4 text-status-active shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Save with annual billing
            </p>
            <p className="text-xs text-muted-foreground">
              Switch to annual and save up to 20% on your total costs
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
