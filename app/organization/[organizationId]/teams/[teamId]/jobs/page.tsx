import React from "react";
import Jobs from "./jobs";

import type { Metadata } from "next";
import HeaderShell from "@/features/jobs/components/hiring-shell";

export const metadata: Metadata = {
  title: "thecareerly | jobs",
};

const page = () => {
  return (
    <HeaderShell breadCrumbPage="Jobs">
      <Jobs />
    </HeaderShell>
  );
};

export default page;
