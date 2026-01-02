import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Mail, UserMinus, Shield, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { TeamMember } from "@/interfaces/access";
import { roleConfig, statusConfig } from "../data/team-data";

interface MemberRowProps {
  member: TeamMember;
  onChangeRole?: (memberId: string, newRole: TeamMember["role"]) => void;
  onRemove?: (memberId: string) => void;
  onResendInvite?: (memberId: string) => void;
}

export const MemberRow = ({
  member,
  onChangeRole,
  onRemove,
  onResendInvite,
}: MemberRowProps) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">
              {member.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {member.email}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge
          variant="outline"
          className={cn("text-xs", roleConfig[member.role].color)}
        >
          {roleConfig[member.role].label}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge
          variant="secondary"
          className={cn("text-xs", statusConfig[member.status].color)}
        >
          {statusConfig[member.status].label}
        </Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
        {member.costPerMonth > 0 ? `$${member.costPerMonth}/mo` : "Free"}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onChangeRole?.(member.id, "admin")}
            >
              <Shield className="h-4 w-4 mr-2" />
              Change Role
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onChangeRole?.(member.id, "viewer")}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            {member.status === "pending" && (
              <DropdownMenuItem onClick={() => onResendInvite?.(member.id)}>
                <Mail className="h-4 w-4 mr-2" />
                Resend Invite
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onRemove?.(member.id)}
              className="text-destructive focus:text-destructive"
              disabled={member.role === "owner"}
            >
              <UserMinus className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
