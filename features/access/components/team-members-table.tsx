import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, UserPlus, Search } from "lucide-react";
import { TeamMember } from "@/interfaces/access";
import { MemberRow } from "./member-row";

interface TeamMembersTableProps {
  members: TeamMember[];
  onInvite?: () => void;
  onChangeRole?: (memberId: string, newRole: TeamMember["role"]) => void;
  onRemove?: (memberId: string) => void;
  onResendInvite?: (memberId: string) => void;
}

export const TeamMembersTable = ({
  members,
  onInvite,
  onChangeRole,
  onRemove,
  onResendInvite,
}: TeamMembersTableProps) => {
  const [search, setSearch] = React.useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base font-medium flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            Team Members
            <span className="text-muted-foreground font-normal">
              ({members.length})
            </span>
          </CardTitle>
          <Button
            onClick={onInvite}
            size="sm"
            className="gap-1.5 w-full sm:w-auto"
          >
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Cost</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No members found
                  </td>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    onChangeRole={onChangeRole}
                    onRemove={onRemove}
                    onResendInvite={onResendInvite}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
