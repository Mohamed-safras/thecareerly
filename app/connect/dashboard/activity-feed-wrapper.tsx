import React from "react";
import { Activity } from "lucide-react";
import { ActivityFeed } from "@/features/dashboard/activity-feed";
import { Button } from "@/components/ui/button";

const ActivityFeedWrapper = () => {
  const activitiesData = [
    {
      id: "1",
      type: "hired" as const,
      candidate: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      job: "DevOps Engineer",
      time: "2h ago",
    },
    {
      id: "2",
      type: "interview" as const,
      candidate: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      job: "Senior Frontend Engineer",
      time: "4h ago",
      description: "Final round with CTO scheduled for tomorrow",
    },
    {
      id: "3",
      type: "applied" as const,
      candidate: "James Wilson",
      job: "Product Manager",
      time: "5h ago",
    },
    {
      id: "4",
      type: "offer" as const,
      candidate: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      job: "UX Researcher",
      time: "1d ago",
    },
    {
      id: "5",
      type: "reviewed" as const,
      candidate: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      job: "Backend Developer",
      time: "1d ago",
    },
    {
      id: "6",
      type: "offer" as const,
      candidate: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      job: "Backend Developer",
      time: "1d ago",
    },
    {
      id: "7",
      type: "offer" as const,
      candidate: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      job: "UX Researcher",
      time: "1d ago",
    },
  ];

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Activity className="w-4 h-4 text-primary" /> Recent Activity
        </h2>
        <Button variant="ghost" size="sm" className="text-xs">
          See all
        </Button>
      </div>
      <ActivityFeed activities={activitiesData} />
    </section>
  );
};

export default ActivityFeedWrapper;
