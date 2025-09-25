import { JobPostingCard } from "@/features/jobs/components/job-posting-card";
import JobSkeleton from "@/features/jobs/components/JobSkeleton";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import React from "react";

const JobList = () => {
  const { jobs, loading, hasMore, ref } = useFetchJobs(10);
  console.log(jobs);
  return (
    <div className="mx-auto grid grid-cols-1 max-w-8xl gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job, index) => (
        <JobPostingCard key={job?.id + index} job={job} />
      ))}

      {loading &&
        Array.from({ length: 3 }).map((_, i) => <JobSkeleton key={i} />)}

      {/* sentinel element */}
      {hasMore && <div ref={ref} className="h-12" />}
    </div>
  );
};

export default JobList;
