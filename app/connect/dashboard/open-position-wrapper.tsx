import { OpenPositions } from "@/features/dashboard/components/open-positions";
import React from "react";

const OpenPositionsWrapper = () => {
  const openPositionsData = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      applicants: 156,
      daysOpen: 12,
      priority: "high" as const,
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      applicants: 89,
      daysOpen: 8,
      priority: "high" as const,
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "San Francisco, CA",
      applicants: 67,
      daysOpen: 21,
      priority: "medium" as const,
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      applicants: 45,
      daysOpen: 5,
      priority: "low" as const,
    },
  ];
  return <OpenPositions positions={openPositionsData} />;
};

export default OpenPositionsWrapper;
