"use client";
import { Layers3, Filter, ChevronDown, Loader, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { CreateTeamDialog } from "@/features/teams/components/create-team-dialog";
import TeamCard from "@/features/teams/components/team-card";
import { useTeamManager } from "@/hooks/use-team-manager";

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
    <div className="w-full">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center py-4 gap-2">
        {/* Search Input */}
        <div className="flex relative items-center w-full md:max-w-md border rounded-lg px-2 py-0">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by team name, user, email, role..."
            value={searchInput}
            onChange={onSearchChange}
            className="w-full ml-7 border-none outline-none bg-transparent shadow-none p-0"
          />
        </div>

        <div className="flex flex-row gap-2 ml-auto max-sm:flex-wrap">
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-muted-foreground flex items-center justify-center max-sm:justify-start max-sm:w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter by Status
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
            <Loader className="h-5 w-5 animate-spin " />
            <p className="text-base font-medium mt-2">Loading teams...</p>
          </div>
        ) : !loading && isEmpty ? (
          <div className="col-span-full h-80 flex flex-col items-center justify-center rounded-xl ">
            <Layers3 className="h-8 w-8 mb-2" />
            <p className="text-lg font-medium">No teams found.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
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
            Loading more teams...
          </Button>
        ) : page < totalPages ? (
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="w-full sm:w-auto my-4 text-sm rounded-full"
          >
            Load more teams
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default TeamGrid;
