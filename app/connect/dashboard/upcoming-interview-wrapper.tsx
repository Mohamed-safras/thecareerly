import { Badge } from "@/components/ui/badge";
import { UpcomingInterviews } from "@/features/dashboard/upcoming-interviews";
import { Calendar } from "lucide-react";
import React from "react";

const UpcomingInterviewsWrapper = () => {
  const interviewsData = [
    {
      id: "1",
      candidate: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      role: "Senior Frontend Engineer",
      time: "10:00 AM",
      duration: "1h",
      type: "video" as const,
      interviewers: [
        {
          name: "John Smith",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        },
        {
          name: "Anna Lee",
          avatar:
            "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
        },
        {
          name: "Lisa Wang",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
        },
      ],
    },
    {
      id: "2",
      candidate: "Marcus Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      role: "Product Designer",
      time: "2:30 PM",
      duration: "45m",
      type: "onsite" as const,
      interviewers: [
        {
          name: "Lisa Wang",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
        },
        {
          name: "Tom Davis",
          avatar:
            "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
        },
      ],
    },
    {
      id: "3",
      candidate: "Alex Turner",
      role: "Backend Developer",
      time: "4:00 PM",
      duration: "1h",
      type: "video" as const,
      interviewers: [
        { name: "Chris Wong" },
        {
          name: "Sam Miller",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
        },
      ],
    },
  ];
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Today&apos;s Interviews</h2>
          <p className="text-sm text-muted-foreground">
            {interviewsData.length} scheduled
          </p>
        </div>
        <Badge variant="outline" className="font-normal">
          <Calendar className="h-3 w-3 mr-1" />
          {new Date().toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Badge>
      </div>
      <UpcomingInterviews interviews={interviewsData} />
    </section>
  );
};

export default UpcomingInterviewsWrapper;
