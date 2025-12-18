import { Button } from "@/components/ui/button";
import { JobPipelineCard } from "@/features/dashboard/job-pipeline-card";
import { ArrowRight } from "lucide-react";
import React from "react";

const ActiveJobWrapper = () => {
  const jobsData = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      applicants: 156,
      daysOpen: 12,
      isUrgent: true,
      stages: [
        { name: "Applied", count: 89, color: "bg-muted-foreground" },
        { name: "Screening", count: 34, color: "bg-primary" },
        { name: "Interview", count: 21, color: "bg-status-new" },
        { name: "Offer", count: 12, color: "bg-status-active" },
      ],
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "New York, NY",
      applicants: 89,
      daysOpen: 8,
      stages: [
        { name: "Applied", count: 45, color: "bg-muted-foreground" },
        { name: "Screening", count: 24, color: "bg-primary" },
        { name: "Interview", count: 15, color: "bg-status-new" },
        { name: "Offer", count: 5, color: "bg-status-active" },
      ],
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "San Francisco, CA",
      applicants: 67,
      daysOpen: 21,
      stages: [
        { name: "Applied", count: 32, color: "bg-muted-foreground" },
        { name: "Screening", count: 18, color: "bg-primary" },
        { name: "Interview", count: 12, color: "bg-status-new" },
        { name: "Offer", count: 5, color: "bg-status-active" },
      ],
    },
    {
      title: "Python Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      applicants: 7,
      daysOpen: 11,
      stages: [
        { name: "Applied", count: 2, color: "bg-muted-foreground" },
        { name: "Screening", count: 1, color: "bg-primary" },
        { name: "Interview", count: 3, color: "bg-status-new" },
        { name: "Offer", count: 1, color: "bg-status-active" },
      ],
    },
  ];
  return (
    <section className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-semibold">Active Job Pipelines</h2>
          <p className="text-sm text-muted-foreground">
            Track candidate progress across roles
          </p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jobsData.map((job) => (
          <JobPipelineCard key={job.title} {...job} />
        ))}
      </div>
    </section>
  );
};

export default ActiveJobWrapper;
