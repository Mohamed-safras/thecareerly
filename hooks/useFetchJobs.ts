"use client";

import { useState, useEffect } from "react";
import { axiosClient } from "@/lib/http/axios-client";
import { useInView } from "react-intersection-observer";
import { JobPosting } from "@/features/jobs/components/job-posting-card";
import { ApiResponse } from "@/types/api-response";
import { da } from "date-fns/locale";

export function useFetchJobs(limit: number = 8) {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { ref, inView } = useInView({ threshold: 1 });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/employee/jobs", {
        params: { page, limit },
      });
      const { data, status, statusText } = response;
      console.log(data);
      console.log(data.data.jobs);

      console.log(data.jobs);

      setJobs((prev) => [...prev, ...data.data.jobs]);
      setHasMore(data.data.hasMore);
    } catch (err) {
      console.error("❌ Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return { jobs, loading, hasMore, ref };
}
