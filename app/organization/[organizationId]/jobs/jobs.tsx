"use client";

import React, { useState } from "react";
import JobsOpeningHeader from "@/features/jobs/components/jobs-header";
import JobFiltersBar from "@/features/jobs/components/job-filters-bar";
import JobList from "./job-list";

import { Metadata } from "next";
import JobDetailsSidebar from "@/features/jobs/job-details-sidebar";
import { Job } from "@/features/jobs/components/job-posting-card";
import JobsStatusBar from "@/features/jobs/components/jobs-status";
import { JobStatsCards } from "@/features/jobs/components/job-stats-cards";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `thecareerly ${params.id} | Jobs`,
  };
}

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsSidebarOpen(true);
  };

  return (
    <div className="mx-auto max-w-8xl p-3 space-y-3">
      <JobsOpeningHeader />
      <JobStatsCards
        stats={{
          totalApplications: 10,
          totalViews: 1,
          draft: 1,
          total: 1,
          paused: 1,
          published: 3,
          closed: 1,
        }}
      />

      <JobFiltersBar />

      <JobList onJobClick={handleJobClick} />

      {selectedJob && (
        <JobDetailsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          job={selectedJob}
        />
      )}
    </div>
  );
};

export default Jobs;
