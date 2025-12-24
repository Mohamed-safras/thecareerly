import { Calendar, Filter, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InterviewType, typeConfig } from "@/types/interviews";

interface CalendarHeaderProps {
  totalEvents: number;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedPosition: string;
  onPositionChange: (position: string) => void;
  positions: string[];
  onAddClick?: () => void;
}

export function CalendarHeader({
  totalEvents,
  selectedType,
  onTypeChange,
  selectedPosition,
  onPositionChange,
  positions,
  onAddClick,
}: CalendarHeaderProps) {
  const hasFilters = selectedType !== "all" || selectedPosition !== "all";

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Title row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Recruitment Calendar
            </h1>
            <p className="text-muted-foreground text-sm">
              {totalEvents} scheduled interviews
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {hasFilters && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {(selectedType !== "all" ? 1 : 0) +
                      (selectedPosition !== "all" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {hasFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onTypeChange("all");
                        onPositionChange("all");
                      }}
                      className="h-auto px-2 py-1 text-xs"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Interview Type
                  </label>
                  <Select value={selectedType} onValueChange={onTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {Object.entries(typeConfig).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Position
                  </label>
                  <Select
                    value={selectedPosition}
                    onValueChange={onPositionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Positions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button size="sm" className="gap-2" onClick={onAddClick}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule Interview</span>
          </Button>
        </div>
      </div>

      {/* Active filter badges */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedType !== "all" && (
            <Badge variant="secondary" className="gap-1 pl-3">
              {typeConfig[selectedType as InterviewType]?.label}
              <button
                onClick={() => onTypeChange("all")}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedPosition !== "all" && (
            <Badge variant="secondary" className="gap-1 pl-3">
              {selectedPosition}
              <button
                onClick={() => onPositionChange("all")}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
