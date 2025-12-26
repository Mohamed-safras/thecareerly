import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import { InterviewEvent, InterviewType, typeConfig } from "@/types/interviews";
import {
  DateInput,
  EventClickArg,
  EventDropArg,
  EventSourceInput,
} from "@fullcalendar/core";
import { format } from "date-fns";

interface FullCalendarWrapperProps {
  currentDate: DateInput | undefined;
  calendarRef: React.RefObject<FullCalendar | null>;
  calendarEvents: EventSourceInput | undefined;
  setCurrentDate: (value: React.SetStateAction<Date>) => void;
  setSelectedPositions: React.Dispatch<React.SetStateAction<string[]>>;
  handleEventDrop: (info: EventDropArg) => void;
  handleEventClick: (info: EventClickArg) => void;
}

const FullCalendarWrapper: React.FC<FullCalendarWrapperProps> = ({
  currentDate,
  calendarRef,
  calendarEvents,
  setCurrentDate,
  handleEventDrop,
  handleEventClick,
}) => {
  // Filter events

  return (
    <div className="flex-1 overflow-auto rounded-r-lg border-t border-r sm:border-l  sm:rounded-l-lg md:rounded-l-none border-border">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        initialDate={currentDate}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth,dayGridYear,listWeek",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          year: "Year",
          list: "Agenda",
        }}
        events={calendarEvents}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        datesSet={(arg) => setCurrentDate(arg.start)}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={3}
        weekends={true}
        nowIndicator={true}
        height="100%"
        eventContent={renderEventContent}
        eventDisplay="block"
        slotMinTime="07:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        slotDuration="01:00:00"
        slotLabelInterval="01:00:00"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        dayHeaderFormat={{
          weekday: "short",
          day: "numeric",
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
      />
    </div>
  );
};

export default FullCalendarWrapper;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderEventContent = (eventInfo: any) => {
  console.log(eventInfo);

  const event = eventInfo.event.extendedProps as InterviewEvent;
  const type = event.type as InterviewType;
  const config = typeConfig[type];
  const isTimeGrid = eventInfo.view.type.includes("timeGridDay");
  console.log(eventInfo.view.type);

  const bgClass = getRandomBackgroundColorHSL();
  const style = {
    backgroundColor: bgClass,
  };

  if (isTimeGrid) {
    return (
      <div className="styled-event h-full w-full" style={style}>
        <div className="flex flex-col justify-between p-3">
          <div className="flex items-center gap-3">
            <div
              className="text-xs font-semibold px-1.5 py-0.5 rounded inline-block mb-1"
              style={{ backgroundColor: config.color, color: "white" }}
            >
              {format(eventInfo.event.start, "h:mm a")} -{" "}
              {format(eventInfo.event.end, "h:mm a")}
            </div>
            <div className="font-semibold text-xs text-secondary leading-tight">
              {event.title.split(" - ")[1] || event.position}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <span style={{ color: "white" }}>■</span>
              {event.position.split(" ")[0]}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Month/other views - simpler display
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded-md overflow-hidden"
      style={{ backgroundColor: style.backgroundColor }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: "white" }}
      />
      <span className="truncate font-medium text-xs" style={{ color: "white" }}>
        {eventInfo.event.title}
      </span>
    </div>
  );
};

export function getRandomBackgroundColorHSL(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50; // %
  const lightness = 30; // %
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
