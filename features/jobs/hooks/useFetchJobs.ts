"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearError,
  fetchJobs,
  resetJobs,
  addPrefetchedPage,
} from "@/store/slice/jobs-slice";

export function useFetchJobs(limit: number = 8) {
  const dispatch = useAppDispatch();
  const {
    jobs,
    loading,
    hasMore,
    currentPage,
    error,
    initialized,
    total,
    prefetchedPages,
    requestInProgress,
  } = useAppSelector(({ jobs }) => jobs);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "50px",
  });

  // Use refs to track state without causing re-renders
  const isInitialLoad = useRef(true);
  const loadingRef = useRef(false);
  const prefetchRef = useRef(false);

  // Prefetch next page when user scrolls close to bottom
  const prefetchNextPage = useCallback(() => {
    if (!hasMore || prefetchRef.current || loading || requestInProgress) {
      return;
    }

    const nextPage = currentPage + 1;

    // Check if already prefetched using array instead of Set
    if (prefetchedPages.includes(nextPage)) {
      return;
    }

    prefetchRef.current = true;

    dispatch(fetchJobs({ page: nextPage, limit, prefetch: true }))
      .unwrap()
      .then(() => {
        dispatch(addPrefetchedPage(nextPage));
      })
      .finally(() => {
        prefetchRef.current = false;
      });
  }, [
    dispatch,
    hasMore,
    loading,
    requestInProgress,
    currentPage,
    limit,
    prefetchedPages,
  ]);

  // Initial load
  useEffect(() => {
    if (
      isInitialLoad.current &&
      !initialized &&
      !loading &&
      !requestInProgress
    ) {
      isInitialLoad.current = false;
      dispatch(resetJobs());
      dispatch(fetchJobs({ page: 1, limit }));
    }
  }, [dispatch, limit, initialized, loading, requestInProgress]);

  // Infinite scroll effect
  useEffect(() => {
    const shouldLoadMore =
      inView &&
      hasMore &&
      !loading &&
      !requestInProgress &&
      initialized &&
      !loadingRef.current;

    if (shouldLoadMore) {
      loadingRef.current = true;
      const nextPage = currentPage + 1;

      dispatch(fetchJobs({ page: nextPage, limit })).finally(() => {
        loadingRef.current = false;
      });
    }
  }, [
    inView,
    hasMore,
    loading,
    requestInProgress,
    initialized,
    currentPage,
    limit,
    dispatch,
  ]);

  // Prefetch when user scrolls to 70% of loaded content
  useEffect(() => {
    if (inView && initialized && jobs.length > 0) {
      // Simple prefetch trigger - when user sees the load more area
      const shouldPrefetch = jobs.length >= currentPage * limit * 0.7;
      if (shouldPrefetch) {
        prefetchNextPage();
      }
    }
  }, [inView, initialized, jobs.length, currentPage, limit, prefetchNextPage]);

  // Manual refresh
  const refresh = useCallback(() => {
    if (requestInProgress) return;

    isInitialLoad.current = true;
    dispatch(resetJobs());
    dispatch(fetchJobs({ page: 1, limit }));
  }, [dispatch, limit, requestInProgress]);

  // Retry function
  const retry = useCallback(() => {
    if (requestInProgress) return;

    dispatch(clearError());
    if (currentPage === 0) {
      dispatch(fetchJobs({ page: 1, limit }));
    } else {
      dispatch(fetchJobs({ page: currentPage + 1, limit }));
    }
  }, [dispatch, currentPage, limit, requestInProgress]);

  const jobStatusCount = {
    OPEN: jobs.filter((job) => job.status === "OPEN").length,
    CLOSED: jobs.filter((job) => job.status === "CLOSED").length,
    DRAFT: jobs.filter((job) => job.status === "DRAFT").length,
    HOLD: jobs.filter((job) => job.status === "HOLD").length,
  };

  return {
    jobs,
    loading,
    hasMore,
    currentPage,
    total,
    error,
    initialized,
    ref,
    refresh,
    retry,
    // Additional performance info
    prefetchedCount: prefetchedPages.length,
    isRequesting: requestInProgress,
    numberOfPages: Math.ceil(total / limit),
    jobStatusCount,
  };
}
