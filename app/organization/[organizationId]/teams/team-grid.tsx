"use client";
import { Layers3, Filter, ChevronDown, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreateTeamDialog } from "@/features/teams/components/create-team-dialog";
import TeamCard from "@/features/teams/components/team-card";
import { useTeamManager } from "@/hooks/use-team-manager";
import React from "react";
import SearchBar from "@/components/search-bar";

export function TeamGrid() {
  const {
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
  } = useTeamManager();

  const isEmpty = !loading && filteredTeams.length === 0;

  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row md:items-center py-4 gap-3">
        <SearchBar searchQuery={searchInput} setSearchQuery={onSearchChange} />

        <div className="flex flex-row gap-2 ml-auto max-sm:flex-wrap">
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-muted-foreground flex items-center justify-center max-sm:w-full hover:bg-muted/50 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter by Status
                {statusFilter.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    {statusFilter.length}
                  </span>
                )}
                <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueStatusTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag.toLowerCase()}
                  className="text-xs font-medium text-muted-foreground"
                  checked={statusFilter.includes(tag)}
                  onCheckedChange={(checked) => {
                    setStatusFilter((prev) =>
                      checked
                        ? [...prev, tag]
                        : prev.filter((filteredTag) => filteredTag !== tag)
                    );
                    // also reset page to 1 to keep behaviour consistent
                    setPage(1);
                  }}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  setStatusFilter([]);
                  setPage(1);
                }}
              >
                Clear All Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CreateTeamDialog />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {loading && teams.length === 0 ? (
          // initial loading full placeholder
          <div className="col-span-full h-80 flex flex-col items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-base font-medium mt-2">Loading teams...</p>
          </div>
        ) : !loading && isEmpty ? (
          <div className="col-span-full h-80 flex flex-col items-center justify-center rounded-xl">
            <Layers3 className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-lg font-medium">No teams found.</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          filteredTeams.map((team) => <TeamCard key={team.id} {...team} />)
        )}
      </div>

      {/* Load More */}
      <div className="flex items-center justify-center">
        {loadingMore ? (
          <Button
            variant="outline"
            className="w-full sm:w-auto my-4 text-sm rounded-full"
            disabled
          >
            <Loader className="h-4 w-4 mr-1 animate-spin" />
            Loading more...
          </Button>
        ) : page < totalPages ? (
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="w-full sm:w-auto my-4 text-sm rounded-full hover:bg-muted/50 hover:border-primary/50 transition-all duration-200"
          >
            Load more
          </Button>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default TeamGrid;
