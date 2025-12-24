"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { CalendarHeader } from "./calendar-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { initialEvents } from "../data/interviews";
import { EventPopup } from "./event-popup";
import { InterviewEvent, InterviewType, typeConfig } from "@/types/interviews";

export function EventCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<InterviewEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<InterviewEvent | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [rescheduleData, setRescheduleData] = useState<{
    event: InterviewEvent;
    newStart: Date;
    newEnd: Date;
  } | null>(null);

  // Get unique positions
  const positions = useMemo(() => {
    const unique = [...new Set(events.map((e) => e.position))];
    return unique.sort();
  }, [events]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedType !== "all" && event.type !== selectedType) return false;
      if (selectedPosition !== "all" && event.position !== selectedPosition)
        return false;
      return true;
    });
  }, [events, selectedType, selectedPosition]);

  // Convert to FullCalendar format
  const calendarEvents = useMemo(() => {
    return filteredEvents.map((event) => ({
      id: event.id,
      title: event.candidate,
      start: event.start,
      end: event.end,
      backgroundColor: typeConfig[event.type].color,
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

  // Custom event content
  const renderEventContent = (eventInfo: any) => {
    const type = eventInfo.event.extendedProps.type as InterviewType;
    return (
      <div className="flex items-center gap-1.5 px-1 py-0.5 overflow-hidden">
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: "white" }}
        />
        <span className="truncate font-medium text-xs">
          {eventInfo.event.title}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background p-4"
    >
      <div className="max-w-[1600px] mx-auto">
        <CalendarHeader
          totalEvents={filteredEvents.length}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
          positions={positions}
        />

        {/* Calendar Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="calendar-wrapper"
        >
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            initialDate={new Date(2025, 11, 1)}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={3}
            weekends={true}
            nowIndicator={true}
            height="auto"
            contentHeight={650}
            eventContent={renderEventContent}
            eventDisplay="block"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: "09:00",
              endTime: "18:00",
            }}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
          />
        </motion.div>

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
      </div>
    </motion.div>
  );
}

export default EventCalendar;
