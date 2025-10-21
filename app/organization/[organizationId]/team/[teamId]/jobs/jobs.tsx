"use client";

import React, { useState } from "react";
import { EMPLOYEE } from "@/constents/router-links";
import JobsOpeningHeader from "@/features/jobs/components/jobs-header";
import JobFiltersBar from "@/features/jobs/components/job-filters-bar";
import HeaderShell from "@/features/jobs/components/hiring-shell";
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
    <HeaderShell
      breadCrumpPage="Jobs"
      breadCrumbsItems={[{ label: "Employee", link: EMPLOYEE }]}
    >
      <div className="mx-auto max-w-8xl p-4">
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
    </HeaderShell>
  );
};

export default Jobs;
