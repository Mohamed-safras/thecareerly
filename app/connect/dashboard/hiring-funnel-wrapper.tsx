import { HiringFunnel } from "@/features/dashboard/hiring-funnel";
import React from "react";

const HiringFunnelWrapper = () => {
  const funnelData = [
    {
      name: "Applications",
      count: 847,
      percentage: 10,
      conversionRate: undefined,
    },
    { name: "Screened", count: 892, percentage: 48, conversionRate: 48 },
    { name: "Interviewed", count: 234, percentage: 13, conversionRate: 26 },
    { name: "Offered", count: 47, percentage: 3, conversionRate: 20 },
    { name: "Hired", count: 333, percentage: 26, conversionRate: 49 },
  ];
  return <HiringFunnel stages={funnelData} />;
};

export default HiringFunnelWrapper;
