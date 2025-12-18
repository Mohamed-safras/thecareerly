import { TimeToHire } from "@/features/dashboard/time-to-hire";
import React from "react";

const TimeToHireWrapper = () => {
  const timeToHireMetrics = [
    {
      label: "Screen to Interview",
      value: "4.2 days",
      change: -12,
      target: "5 days",
    },
    {
      label: "Interview to Offer",
      value: "8.7 days",
      change: -8,
      target: "10 days",
    },
    {
      label: "Offer to Acceptance",
      value: "3.1 days",
      change: 5,
      target: "3 days",
    },
  ];
  return <TimeToHire metrics={timeToHireMetrics} avgDays={18} trend="down" />;
};

export default TimeToHireWrapper;
