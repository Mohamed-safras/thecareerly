"use client";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreateTeamDialog } from "@/features/teams/components/create-team-dialog";

const Page = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Organization ID: {user.organizationId}</p>
          <p>Team ID: {user.teamId}</p>
          <p>
            Roles: [
            {[
              ...(user.teamUsers?.map((u) => u.role).filter(Boolean) ?? []),
              ...(user.organizationUsers?.map((u) => u.role).filter(Boolean) ??
                []),
            ].join(", ")}
            ]
          </p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}

      <CreateTeamDialog />
    </div>
  );
};

export default Page;
