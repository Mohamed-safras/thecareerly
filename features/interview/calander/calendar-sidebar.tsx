import { useState } from "react";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CalendarSidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  selectedPositions: string[];
  onPositionToggle: (position: string) => void;
  positions: string[];
  selectedInterviewers: string[];
  onInterviewerToggle: (interviewer: string) => void;
  interviewers: { name: string; avatar?: string }[];
}

export function CalendarSidebar({
  currentDate,
  onDateChange,
  selectedPositions,
  onPositionToggle,
  positions,
  selectedInterviewers,
  onInterviewerToggle,
  interviewers,
}: CalendarSidebarProps) {
  const today = new Date(); // December 24, 2025
  const [miniCalendarDate, setMiniCalendarDate] = useState(currentDate);

  const monthStart = startOfMonth(miniCalendarDate);
  const monthEnd = endOfMonth(miniCalendarDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const handlePrevMonth = () => {
    setMiniCalendarDate(subMonths(miniCalendarDate, 1));
  };

  const handleNextMonth = () => {
    setMiniCalendarDate(addMonths(miniCalendarDate, 1));
  };

  const handleDayClick = (day: Date) => {
    onDateChange(day);
  };

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
      {/* Mini Calendar */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-foreground">
            {format(miniCalendarDate, "MMMM yyyy")}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Week header */}
        <div className="grid grid-cols-7 mb-1">
          {weekDays.map((day, i) => (
            <div
              key={i}
              className="h-7 flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, miniCalendarDate);
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, currentDate);

            return (
              <button
                key={i}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "h-7 w-7 flex items-center justify-center text-xs rounded-full transition-colors",
                  !isCurrentMonth && "text-muted-foreground/40",
                  isCurrentMonth && "text-foreground hover:bg-muted",
                  isToday &&
                    !isSelected &&
                    "bg-primary/10 text-primary font-semibold",
                  isSelected &&
                    "bg-primary text-primary-foreground font-semibold"
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Positions Filter */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Positions
        </h3>
        <div className="space-y-2">
          {positions.slice(0, 5).map((position) => (
            <label
              key={position}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={selectedPositions.includes(position)}
                onCheckedChange={() => onPositionToggle(position)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {position}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Interviewers Filter */}
      <div className="p-4 flex-1 overflow-auto">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Interviewers
        </h3>
        <div className="space-y-2">
          {interviewers.map((interviewer) => (
            <label
              key={interviewer.name}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={selectedInterviewers.includes(interviewer.name)}
                onCheckedChange={() => onInterviewerToggle(interviewer.name)}
                className="data-[state=checked]:bg-event-phone data-[state=checked]:border-event-phone"
              />
              <Avatar className="h-6 w-6">
                <AvatarImage src={interviewer.avatar} />
                <AvatarFallback className="text-[10px] bg-muted">
                  {interviewer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {interviewer.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
