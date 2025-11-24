"use client";
import React from "react";
import { useAppSelector } from "@/store/hooks";

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
    </div>
  );
};

export default Page;
