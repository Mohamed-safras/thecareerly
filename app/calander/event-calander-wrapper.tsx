"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Clock, SidebarIcon } from "lucide-react";

import { InterviewEvent, typeConfig, InterviewType } from "@/types/interviews";
import { initialEvents } from "../../features/interview/data/interviews";
import { EventPopup } from "../../features/calander/event-popup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MiniCalendarEvents } from "../../features/calander/mini-calendar";

export function EventCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<InterviewEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<InterviewEvent | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>(
    []
  );
  const [rescheduleData, setRescheduleData] = useState<{
    event: InterviewEvent;
    newStart: Date;
    newEnd: Date;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get unique positions
  const positions = useMemo(() => {
    const unique = [...new Set(events.map((e) => e.position))];
    return unique.sort();
  }, [events]);

  // Get unique interviewers
  const interviewers = useMemo(() => {
    const unique = [
      ...new Set(events.flatMap((e) => e.interviewer.split(", "))),
    ];
    return unique.map((name) => ({ name, avatar: undefined }));
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (
        selectedPositions.length > 0 &&
        !selectedPositions.includes(event.position)
      ) {
        return false;
      }
      if (selectedInterviewers.length > 0) {
        const eventInterviewers = event.interviewer.split(", ");
        if (!eventInterviewers.some((i) => selectedInterviewers.includes(i))) {
          return false;
        }
      }
      return true;
    });
  }, [events, selectedPositions, selectedInterviewers]);

  // Convert to FullCalendar format
  const calendarEvents = useMemo(() => {
    return filteredEvents.map((event) => ({
      id: event.id,
      title: event.candidate,
      start: event.start,
      end: event.end,
      backgroundColor: typeConfig[event.type].bgColor,
      borderColor: typeConfig[event.type].color,
      extendedProps: { ...event },
    }));
  }, [filteredEvents]);

  // Handle event click
  const handleEventClick = useCallback((info: EventClickArg) => {
    const event = info.event.extendedProps as InterviewEvent;
    setSelectedEvent({
      ...event,
      id: info.event.id,
      start: info.event.start!,
      end: info.event.end!,
    });
  }, []);

  // Handle drag and drop
  const handleEventDrop = useCallback(
    (info: EventDropArg) => {
      const event = events.find((e) => e.id === info.event.id);
      if (event) {
        setRescheduleData({
          event,
          newStart: info.event.start!,
          newEnd: info.event.end!,
        });
      }
    },
    [events]
  );

  // Confirm reschedule
  const confirmReschedule = useCallback(() => {
    if (!rescheduleData) return;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === rescheduleData.event.id
          ? {
              ...ev,
              start: rescheduleData.newStart,
              end: rescheduleData.newEnd,
            }
          : ev
      )
    );

    toast.success("Interview rescheduled", {
      description: `${rescheduleData.event.candidate}'s interview has been moved.`,
    });

    setRescheduleData(null);
  }, [rescheduleData]);

  // Cancel reschedule
  const cancelReschedule = useCallback(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
    }
    setRescheduleData(null);
  }, []);

  // Handle date change from sidebar
  const handleDateChange = useCallback((date: Date) => {
    setCurrentDate(date);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date);
    }
  }, []);

  // Toggle position filter
  const handlePositionToggle = useCallback((position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    );
  }, []);

  // Toggle interviewer filter
  const handleInterviewerToggle = useCallback((interviewer: string) => {
    setSelectedInterviewers((prev) =>
      prev.includes(interviewer)
        ? prev.filter((i) => i !== interviewer)
        : [...prev, interviewer]
    );
  }, []);

  // Custom event content with styled card
  const renderEventContent = (eventInfo: any) => {
    const event = eventInfo.event.extendedProps as InterviewEvent;
    const type = event.type as InterviewType;
    const config = typeConfig[type];
    const isTimeGrid = eventInfo.view.type.includes("timeGrid");

    if (isTimeGrid) {
      return (
        <div
          className="styled-event h-full w-full"
          style={{
            backgroundColor: config.bgColor,
            borderLeftColor: config.color,
          }}
        >
          <div className="flex flex-col h-full justify-between p-2">
            <div>
              <div
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded inline-block mb-1"
                style={{ backgroundColor: config.color, color: "white" }}
              >
                {format(eventInfo.event.start, "h:mm a")}
              </div>
              <div className="font-semibold text-xs text-foreground leading-tight">
                {event.title.split(" - ")[1] || event.position}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <span style={{ color: config.color }}>■</span>
                {event.position.split(" ")[0]}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Avatar className="h-5 w-5 border border-background">
                <AvatarFallback
                  className="text-[8px]"
                  style={{
                    backgroundColor: config.bgColor,
                    color: config.color,
                  }}
                >
                  {event.interviewer
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      );
    }

    // Month/other views - simpler display
    return (
      <div
        className="flex items-center gap-1.5 px-2 py-1 rounded-md overflow-hidden"
        style={{ backgroundColor: config.bgColor }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: config.color }}
        />
        <span
          className="truncate font-medium text-xs"
          style={{ color: config.color }}
        >
          {eventInfo.event.title}
        </span>
      </div>
    );
  };

  const MiniCalendarEventsContent = (
    <MiniCalendarEvents
      currentDate={currentDate}
      onDateChange={handleDateChange}
      selectedPositions={selectedPositions}
      onPositionToggle={handlePositionToggle}
      positions={positions}
      selectedInterviewers={selectedInterviewers}
      onInterviewerToggle={handleInterviewerToggle}
      interviewers={interviewers}
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-5.1rem)] flex bg-background"
    >
      {/* Desktop MiniCalendarEvents */}
      {!sidebarOpen && (
        <div className="hidden xl:block">{MiniCalendarEventsContent}</div>
      )}

      {/* Mobile MiniCalendarEvents */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="right" className="p-0 w-64">
          {MiniCalendarEventsContent}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="xl:hidden flex items-center justify-end gap-3 py-3">
          <Button
            className="h-8 w-8"
            variant="ghost"
            onClick={() => setSidebarOpen(true)}
          >
            <SidebarIcon className="h-4 w-4" />
          </Button>
        </div>
        {/* Calendar */}
        <div className="flex-1 overflow-auto rounded-r-lg border-t border-r sm:border-l  sm:rounded-l-lg md:rounded-l-none border-border">
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="timeGridWeek"
            initialDate={currentDate}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right:
                "timeGridDay,timeGridWeek,dayGridMonth,dayGridYear,listWeek",
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
      </div>

      {/* Event Popup */}
      <EventPopup
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Reschedule Confirmation Dialog */}
      <Dialog open={!!rescheduleData} onOpenChange={() => cancelReschedule()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Confirm Reschedule
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to move this interview?
            </DialogDescription>
          </DialogHeader>
          {rescheduleData && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="font-semibold text-foreground">
                  {rescheduleData.event.candidate}
                </p>
                <p className="text-sm text-muted-foreground">
                  {rescheduleData.event.position}
                </p>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">
                    {format(rescheduleData.newStart, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(rescheduleData.newStart, "h:mm a")} -{" "}
                    {format(rescheduleData.newEnd, "h:mm a")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={cancelReschedule}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={confirmReschedule}>
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default EventCalendar;
