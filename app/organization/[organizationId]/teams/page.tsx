import React from "react";
import TeamManagment from "./team-managment";
import HeaderShell from "@/features/jobs/components/hiring-shell";

const TeamPage = () => {
  return (
    <HeaderShell
      breadCrumbPage="Teams"
      breadCrumbsItems={[{ label: "Organization", link: "#" }]}
    >
      <TeamManagment />
    </HeaderShell>
  );
};

export default TeamPage;
