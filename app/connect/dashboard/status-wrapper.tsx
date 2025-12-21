import React from "react";
import { Briefcase, Calendar, Send, Users } from "lucide-react";
import { StatusCard } from "@/features/dashboard/components/status-card";

const StatusWrapper = () => {
  const statsData = [
    {
      title: "Active Jobs",
      value: 24,
      change: "+3 this week",
      changeType: "positive" as const,
      iconColor: "text-primary",
      icon: Briefcase,
    },
    {
      title: "Interviews Scheduled",
      value: 38,
      change: "12 this week",
      changeType: "neutral" as const,
      iconColor: "text-status-active",
      icon: Calendar,
    },
    {
      title: "Total Candidates",
      value: 1847,
      change: "+127 this month",
      changeType: "positive" as const,
      iconColor: "text-status-new",
      icon: Users,
    },
    {
      title: "Offers Sent",
      value: 7,
      change: "+2 from last week",
      changeType: "positive" as const,
      iconColor: "text-status-hold",
      icon: Send,
    },
  ];
  return (
    <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-3">
      {statsData.map(
        ({ title, value, change, changeType, icon, iconColor }) => (
          <StatusCard
            key={title}
            title={title}
            value={value}
            change={change}
            changeType={changeType}
            icon={icon}
            iconColor={iconColor}
          />
        )
      )}
    </section>
  );
};

export default StatusWrapper;
