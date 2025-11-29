"use client";
import React from "react";
import { UserTable } from "./user-table";

const UserManagement = () => {
  return (
    <section className="py-2 px-6">
      <h1 className="text-2xl font-semibold">Your Users</h1>

      <UserTable />
    </section>
  );
};

export default UserManagement;
