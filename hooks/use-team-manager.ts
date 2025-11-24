import { debounce } from "@/lib/rate-limit/debounce";
import { UserProfile } from "@/types/user-profile";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ITEMS_PER_PAGE = 12;

export type TeamStatus = "ACTIVE" | "HOLD" | "ARCHIVED" | "NEW";

export type Team = {
  id: string;
  teamName: string;
  teamUser: UserProfile[];
  useravatar?: string;
  jobCount: number;
  status: TeamStatus;
  createdDate: string;
  lastActivity: string;
};

export const useTeamManager = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // debounced
  const [statusFilter, setStatusFilter] = useState<TeamStatus[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  // Debounce: only accepts a string
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        // update searchQuery (debounced)
        setSearchQuery(value.trim());
        setPage(1); // reset to first page when search changes
      }, 200),
    []
  );

  // Build request params
  const fetchFromServer = useCallback(
    async (requestedPage: number, requestedSearch: string, append = false) => {
      // Cancel any in-flight request
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const params = new URLSearchParams({
          page: String(requestedPage),
          limit: String(ITEMS_PER_PAGE),
          search: requestedSearch,
        });

        const res = await fetch(`/api/teams?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data: {
          teams: Team[];
          totalPages: number;
        } = await res.json();

        setTotalPages(data.totalPages ?? 1);

        if (append) {
          setTeams((prev) => [...prev, ...data.teams]);
        } else {
          setTeams(data.teams);
        }
      } catch (err) {
        if (err instanceof Error) {
          // ignore AbortError silently
          if (err.name === "AbortError") return;
          // log otherwise (or set an error state if you want)
          // console.error(err);
        }
      } finally {
        if (append) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    []
  );

  // Fetch on mount and when page or searchQuery changes
  useEffect(() => {
    const append = page > 1;
    void fetchFromServer(page, searchQuery, append);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]); // fetchFromServer is stable due to useCallback

  // Derived unique status tags from current teams (client-side)
  const uniqueStatusTags = useMemo(() => {
    const set = new Set<TeamStatus>();
    teams.forEach((t) => set.add(t.status));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [teams]);

  // Global matching across team + user fields
  const filteredTeams = useMemo(() => {
    const search = searchQuery.toLowerCase();

    return teams.filter((team) => {
      // if no search, accept everything (status filter will still apply)
      const globalMatch =
        !search ||
        team.teamName.toLowerCase().includes(search) ||
        team.status.toLowerCase().includes(search) ||
        team.createdDate.toLowerCase().includes(search) ||
        team.lastActivity.toLowerCase().includes(search) ||
        team.teamUser.some((user) => {
          const nameMatch = user.name?.toLowerCase().includes(search) ?? false;
          const emailMatch =
            user.email?.toLowerCase().includes(search) ?? false;
          const roleMatch =
            (user.roles ?? []).some((r) => r.toLowerCase().includes(search)) ??
            false;
          const lastActiveMatch =
            user.lastActive?.toLowerCase().includes(search) ?? false;
          const dateAddedMatch =
            user.dateAdded?.toLowerCase().includes(search) ?? false;

          return (
            nameMatch ||
            emailMatch ||
            roleMatch ||
            lastActiveMatch ||
            dateAddedMatch
          );
        });

      const statusMatch =
        statusFilter.length === 0 || statusFilter.includes(team.status);

      return globalMatch && statusMatch;
    });
  }, [teams, searchQuery, statusFilter]);

  // Load more handler (pagination)
  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !loadingMore) {
      setPage((p) => p + 1);
    }
  }, [page, totalPages, loadingMore]);

  // Input change handler
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return {
    page,
    totalPages,
    loading,
    loadingMore,
    teams,
    filteredTeams,
    searchInput,
    uniqueStatusTags,
    statusFilter,
    setStatusFilter,
    onSearchChange,
    setPage,
    handleLoadMore,
  };
};
