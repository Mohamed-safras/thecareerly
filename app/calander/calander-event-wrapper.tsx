"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Clock, SidebarIcon } from "lucide-react";

import { InterviewEvent, typeConfig } from "@/types/interviews";
import { initialEvents } from "../../features/interview/data/interviews";
import { EventPopup } from "./event-detail-wrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import FullCalendarWrapper from "./full-calander-wrapper";
import MiniCalanderWrapper from "./mini-calander-wrapper";
import EventsWrapper from "./events-wrapper";

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

  const MiniCalendarEventsContent = (
    <aside className="w-full h-[calc(100vh-5.1rem)] shrink-0 xl:border-t xl:border-l xl:border-b xl:rounded-l-lg xl:border-border flex flex-col">
      <MiniCalanderWrapper
        currentDate={currentDate}
        onDateChange={handleDateChange}
        // selectedPositions={selectedPositions}
        // onPositionToggle={handlePositionToggle}
        // positions={positions}
        // selectedInterviewers={selectedInterviewers}
        // onInterviewerToggle={handleInterviewerToggle}
        // interviewers={interviewers}
      />
      <EventsWrapper />
    </aside>
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
        <SheetContent side="right" className="p-0 gap-0 w-64">
          <SheetTitle className="p-3">Calander</SheetTitle>
          {MiniCalendarEventsContent}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="xl:hidden flex items-center justify-end gap-3 mb-3">
          <Button
            className="h-8 w-8"
            variant="ghost"
            onClick={() => setSidebarOpen(true)}
          >
            <SidebarIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar */}
        <FullCalendarWrapper
          currentDate={currentDate}
          calendarRef={calendarRef}
          setCurrentDate={setCurrentDate}
          calendarEvents={calendarEvents}
          setSelectedPositions={setSelectedPositions}
          handleEventDrop={handleEventDrop}
          handleEventClick={handleEventClick}
        />
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
