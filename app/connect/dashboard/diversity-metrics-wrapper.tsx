import { DiversityMetrics } from "@/features/dashboard/diversity-metrics";
import React from "react";

const DiversityMetricsWrapper = () => {
  const diversityData = [
    { category: "Women", percentage: 42, change: 5, color: "stroke-primary" },
    {
      category: "Underrepresented",
      percentage: 28,
      change: 3,
      color: "stroke-status-new",
    },
    {
      category: "Veterans",
      percentage: 8,
      change: 1,
      color: "stroke-status-active",
    },
    {
      category: "Other",
      percentage: 22,
      change: -2,
      color: "stroke-muted-foreground",
    },
  ];
  return <DiversityMetrics data={diversityData} />;
};

export default DiversityMetricsWrapper;
