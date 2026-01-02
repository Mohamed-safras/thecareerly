import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { roleConfig } from "@/features/access/data/team-data";
import { BillingPermission } from "@/interfaces/billing";

interface BillingPermissionsProps {
  permissions: BillingPermission[];
}

const roles = ["owner", "admin", "member", "viewer"] as const;

export const BillingPermissions = ({
  permissions,
}: BillingPermissionsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          Billing Permissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                  Permission
                </th>
                {roles.map((role) => (
                  <th key={role} className="text-center py-2 px-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", roleConfig[role].color)}
                    >
                      {roleConfig[role].label}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-b last:border-0">
                  <td className="py-3 px-2">
                    <p className="font-medium text-foreground">
                      {permission.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </td>
                  {roles.map((role) => (
                    <td key={role} className="text-center py-3 px-2">
                      {permission.roles.includes(role) ? (
                        <Check className="h-4 w-4 text-status-active mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-3">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="p-3 rounded-lg bg-muted/30 border"
            >
              <p className="font-medium text-foreground text-sm">
                {permission.name}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {permission.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {permission.roles.map((role) => (
                  <Badge
                    key={role}
                    variant="outline"
                    className={cn("text-xs", roleConfig[role].color)}
                  >
                    {roleConfig[role].label}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
