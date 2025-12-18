import { TeamPerformance } from "@/features/dashboard/team-performance";
import React from "react";

const TeamPerformanceWrapper = () => {
  const teamPerformanceData = [
    {
      name: "Sarah Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      role: "Senior Recruiter",
      hires: 8,
      interviews: 24,
      responseTime: "2h avg",
    },
    {
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      role: "Technical Recruiter",
      hires: 6,
      interviews: 31,
      responseTime: "1.5h avg",
    },
    {
      name: "Emily Chen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      role: "Recruiter",
      hires: 5,
      interviews: 19,
      responseTime: "3h avg",
    },
    {
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "HR Manager",
      hires: 4,
      interviews: 12,
      responseTime: "4h avg",
    },
  ];
  return <TeamPerformance members={teamPerformanceData} />;
};

export default TeamPerformanceWrapper;
