"use client";

import React, { useState } from "react";
import JobsOpeningHeader from "@/features/jobs/components/jobs-header";
import JobFiltersBar from "@/features/jobs/components/job-filters-bar";
import JobList from "./job-list";

import { Metadata } from "next";
import JobDetailsSidebar from "@/features/jobs/job-details-sidebar";
import { Job } from "@/features/jobs/components/job-posting-card";
import JobsStatusBar from "@/features/jobs/components/jobs-status";

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
    <div className="mx-auto max-w-8xl p-3">
      <JobsOpeningHeader />
      <JobFiltersBar />
      <JobsStatusBar />
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
