import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, UserPlus, TrendingUp } from "lucide-react";
import { SeatAllocation } from "@/interfaces/access";

interface SeatUsageCardProps {
  allocation: SeatAllocation;
  onAddSeats?: () => void;
}

export const SeatUsageCard = ({
  allocation,
  onAddSeats,
}: SeatUsageCardProps) => {
  const usedPercentage =
    ((allocation.used + allocation.pending) / allocation.total) * 100;
  const available = allocation.total - allocation.used - allocation.pending;
  const monthlyTotal =
    (allocation.used + allocation.pending) * allocation.costPerSeat;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Team Seats
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddSeats}
            className="gap-1.5"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Seats</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              {allocation.used + allocation.pending} of {allocation.total} seats
              used
            </span>
            <span className="font-medium text-foreground">
              {available} available
            </span>
          </div>
          <Progress value={usedPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-lg font-semibold text-foreground">
              {allocation.used}
            </p>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-status-hold-bg/50">
            <p className="text-lg font-semibold text-status-hold">
              {allocation.pending}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-status-active-bg/50">
            <p className="text-lg font-semibold text-status-active">
              {available}
            </p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>${allocation.costPerSeat}/seat/month</span>
          </div>
          <p className="text-sm font-medium text-foreground">
            ${monthlyTotal}/mo total
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
