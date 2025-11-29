import React from "react";
import UserManagement from "./user-managment";
import HeaderShell from "@/features/jobs/components/hiring-shell";

const page = () => {
  return (
    <HeaderShell
      breadCrumbPage="Users"
      breadCrumbsItems={[{ label: "Organization", link: "#" }]}
    >
      <UserManagement />
    </HeaderShell>
  );
};

export default page;
