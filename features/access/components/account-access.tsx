import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Shield, DollarSign } from "lucide-react";
import {
  billingPermissions,
  seatAllocation,
  teamMembers,
} from "../data/team-data";
import { SeatUsageCard } from "./seat-usage";
import { TeamMembersTable } from "./team-members-table";
import { BillingPermissions } from "@/features/billing/components/billing-permissions-card";
import { CostBreakdown } from "@/features/billing/components/cost-breakdown-card";

interface AccountAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccountAccess = ({
  open,
  onOpenChange,
}: AccountAccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-0 max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">Account & Access</DialogTitle>
              <DialogDescription>
                Manage team seats, permissions, and billing access
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="seats"
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="p-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="seats" className="gap-1.5 text-xs sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span> Seats
              </TabsTrigger>
              <TabsTrigger
                value="permissions"
                className="gap-1.5 text-xs sm:text-sm"
              >
                <Shield className="h-4 w-4" />
                Permissions
              </TabsTrigger>
              <TabsTrigger value="costs" className="gap-1.5 text-xs sm:text-sm">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Cost</span> Breakdown
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 px-3 py-3">
            <TabsContent value="seats" className="mt-0 space-y-3">
              <SeatUsageCard allocation={seatAllocation} />
              <TeamMembersTable members={teamMembers} />
            </TabsContent>

            <TabsContent value="permissions" className="mt-0">
              <BillingPermissions permissions={billingPermissions} />
            </TabsContent>

            <TabsContent value="costs" className="mt-0">
              <CostBreakdown members={teamMembers} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
