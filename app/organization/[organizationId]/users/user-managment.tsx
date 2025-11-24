"use client";
import React from "react";
import { UserTable } from "./user-table";

const UserManagement = () => {
  return (
    <section className="py-2 px-6">
      <h1 className="text-2xl font-semibold mb-2">User Management</h1>
      <p className="text-muted-foreground">
        Manage your team members and their account permissions here.
      </p>

      <UserTable />
    </section>
  );
};

export default UserManagement;
