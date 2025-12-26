import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

interface MiniCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export function MiniCalendar({ currentDate, onDateChange }: MiniCalendarProps) {
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
    <div className="p-3 border-b">
      <div className="flex items-center justify-between mb-3">
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
                isSelected && "bg-primary text-primary-foreground font-semibold"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
