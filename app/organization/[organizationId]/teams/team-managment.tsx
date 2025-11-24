import React from "react";
import TeamGrid from "./team-grid";

const TeamManagment = () => {
  return (
    <section className="py-2 px-6">
      <h1 className="text-3xl font-bold">Organizational Teams</h1>
      <p className="text-muted-foreground">
        Manage your teams and their user here.
      </p>
      <TeamGrid />
    </section>
  );
};

export default TeamManagment;
