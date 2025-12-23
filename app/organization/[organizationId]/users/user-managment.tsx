"use client";
import { UserTable } from "./user-table";

const UserManagement = () => {
  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl font-semibold">Your Users</h1>

      <UserTable />
    </section>
  );
};

export default UserManagement;
