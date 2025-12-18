import { SourceAnalytics } from "@/features/dashboard/source-analytics";
import React from "react";

const SourceAnalyticsWrapper = () => {
  const sourcesData = [
    { name: "LinkedIn", candidates: 523, percentage: 30, color: "bg-primary" },
    {
      name: "Referrals",
      candidates: 298,
      percentage: 20,
      color: "bg-primary/75",
    },
    {
      name: "Company Website",
      candidates: 189,
      percentage: 23,
      color: "bg-primary/50",
    },
    {
      name: "Other",
      candidates: 89,
      percentage: 16,
      color: "bg-primary/25",
    },
  ];
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold mb-4">Top Sources</h2>
      <SourceAnalytics sources={sourcesData} totalCandidates={1486} />
    </section>
  );
};

export default SourceAnalyticsWrapper;
