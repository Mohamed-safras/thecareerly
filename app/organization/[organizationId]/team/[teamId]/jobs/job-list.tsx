import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Job,
  JobPostingCard,
} from "@/features/jobs/components/job-posting-card";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import { Loader } from "lucide-react";
import React from "react";

interface JobListProps {
  onJobClick: (job: Job) => void;
}

const JobList = ({ onJobClick }: JobListProps) => {
  const { jobs, loading, hasMore, error, initialized, ref, refresh, retry } =
    useFetchJobs();

  if (!initialized && loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="w-5 h-5 motion-safe:animate-spin" />
        <p className="text-muted-foreground">Loading jobs...</p>
      </div>
    );
  }

  if (error && !initialized) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-destructive mb-4 text-center">
          <p className="font-semibold">Error loading jobs</p>
          <p className="text-sm">{error}</p>
        </div>
        <Button
          onClick={retry}
          variant="outline"
          className="px-4 py-2 rounded-lg  transition-colors"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (jobs.length === 0 && initialized && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-muted-foreground mb-4 text-center">
          <p className="text-lg font-semibold">No jobs found</p>
          <p className="text-sm">There are no job postings at the moment.</p>
        </div>
        <Button
          onClick={refresh}
          variant="outline"
          className="px-4 py-2 rounded-lg transition-colors"
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="mx-auto grid xs:grid-cols-1 max-w-8xl gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {jobs.map((job, index) => (
          <JobPostingCard
            key={job?.id + index}
            job={job}
            onJobClick={onJobClick}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center items-center py-8">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader className="w-5 h-5 motion-safe:animate-spin" />
              <span className="text-muted-foreground">
                Loading more jobs...
              </span>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">
              Scroll down to load more
            </div>
          )}
        </div>
      )}

      {!hasMore && jobs.length > 0 && (
        <div className="flex justify-center items-center py-4">
          <div className="text-gray-400 text-sm">
            You&apos;ve reached the end of the list
          </div>
        </div>
      )}

      {/* sentinel element */}
      {hasMore && <div ref={ref} className="h-5" />}

      {/* Error during pagination */}
      {error && initialized && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-destructive mb-2 text-sm text-center">
            Failed to load more jobs: {error}
          </div>
          <Button
            variant="outline"
            onClick={retry}
            className="px-3 py-1 text-sm text-destructive rounded transition-colors"
          >
            Retry
          </Button>
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </React.Fragment>
  );
};

export default JobList;
