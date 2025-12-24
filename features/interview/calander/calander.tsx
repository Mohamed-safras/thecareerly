// "use client";
// import React, { useState } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import {
//   Users,
//   Phone,
//   MapPin,
//   Clock,
//   Plus,
//   Filter,
//   Download,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const RecruitmentCalendar = () => {
//   const [view, setView] = useState(Views.MONTH);
//   const [date, setDate] = useState(new Date());
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const events = [
//     {
//       id: 1,
//       title: "Sarah Chen - Technical Interview",
//       start: new Date(2024, 11, 5, 10, 0),
//       end: new Date(2024, 11, 5, 11, 0),
//       candidate: "Sarah Chen",
//       position: "Senior Frontend Developer",
//       interviewer: "Mike Johnson",
//       location: "Video Call",
//       type: "technical",
//       status: "scheduled",
//       email: "sarah.chen@email.com",
//     },
//     {
//       id: 2,
//       title: "John Doe - Phone Screen",
//       start: new Date(2024, 11, 5, 14, 0),
//       end: new Date(2024, 11, 5, 14, 30),
//       candidate: "John Doe",
//       position: "Product Manager",
//       interviewer: "Emily Davis",
//       location: "Phone",
//       type: "phone-screen",
//       status: "scheduled",
//       email: "john.doe@email.com",
//     },
//     {
//       id: 3,
//       title: "Alex Rivera - System Design",
//       start: new Date(2024, 11, 6, 15, 0),
//       end: new Date(2024, 11, 6, 16, 30),
//       candidate: "Alex Rivera",
//       position: "Backend Engineer",
//       interviewer: "Tom Wilson",
//       location: "Conference Room A",
//       type: "technical",
//       status: "scheduled",
//       email: "alex.rivera@email.com",
//     },
//     {
//       id: 4,
//       title: "Maria Garcia - Final Round",
//       start: new Date(2024, 11, 8, 10, 0),
//       end: new Date(2024, 11, 8, 12, 0),
//       candidate: "Maria Garcia",
//       position: "UX Designer",
//       interviewer: "Sarah Lee, Mike Johnson",
//       location: "Video Call",
//       type: "final",
//       status: "scheduled",
//       email: "maria.garcia@email.com",
//     },
//     {
//       id: 5,
//       title: "David Kim - HR Interview",
//       start: new Date(2024, 11, 10, 13, 0),
//       end: new Date(2024, 11, 10, 14, 0),
//       candidate: "David Kim",
//       position: "Data Analyst",
//       interviewer: "HR Team",
//       location: "Office - Room 301",
//       type: "hr",
//       status: "scheduled",
//       email: "david.kim@email.com",
//     },
//     {
//       id: 6,
//       title: "Lisa Wang - Coding Challenge",
//       start: new Date(2024, 11, 12, 11, 0),
//       end: new Date(2024, 11, 12, 13, 0),
//       candidate: "Lisa Wang",
//       position: "Full Stack Developer",
//       interviewer: "Dev Team",
//       location: "Video Call",
//       type: "technical",
//       status: "scheduled",
//       email: "lisa.wang@email.com",
//     },
//     {
//       id: 7,
//       title: "James Brown - Culture Fit",
//       start: new Date(2024, 11, 15, 16, 0),
//       end: new Date(2024, 11, 15, 17, 0),
//       candidate: "James Brown",
//       position: "Marketing Manager",
//       interviewer: "Team Leads",
//       location: "Conference Room B",
//       type: "culture",
//       status: "scheduled",
//       email: "james.brown@email.com",
//     },
//     {
//       id: 8,
//       title: "Emma Wilson - Initial Screen",
//       start: new Date(2024, 11, 18, 9, 0),
//       end: new Date(2024, 11, 18, 9, 30),
//       candidate: "Emma Wilson",
//       position: "DevOps Engineer",
//       interviewer: "Chris Anderson",
//       location: "Phone",
//       type: "phone-screen",
//       status: "scheduled",
//       email: "emma.wilson@email.com",
//     },
//   ];

//   const eventStyleGetter = (event) => {
//     const eventColors = {
//       technical: { bg: "#3b82f6", border: "#2563eb" },
//       "phone-screen": { bg: "#10b981", border: "#059669" },
//       final: { bg: "#8b5cf6", border: "#7c3aed" },
//       hr: { bg: "#f59e0b", border: "#d97706" },
//       culture: { bg: "#ec4899", border: "#db2777" },
//     };

//     const colors = eventColors[event.type] || {
//       bg: "#6b7280",
//       border: "#4b5563",
//     };

//     return {
//       style: {
//         backgroundColor: colors.bg,
//         borderLeft: `4px solid ${colors.border}`,
//         borderRadius: "6px",
//         opacity: 0.95,
//         color: "white",
//         border: "none",
//         display: "block",
//         fontSize: "13px",
//         padding: "4px 8px",
//       },
//     };
//   };

//   const CustomToolbar = ({ label, onNavigate, onView, view }) => {
//     return (
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-1">Recruitment Calendar</h1>
//             <p className="text-blue-100">Team Interview Schedule</p>
//           </div>
//           <div className="flex gap-3">
//             <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
//               <Filter size={18} />
//               Filter
//             </button>
//             <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
//               <Download size={18} />
//               Export
//             </button>
//             <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
//               <Plus size={18} />
//               Schedule
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => onNavigate("PREV")}
//               className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <h2 className="text-2xl font-semibold min-w-[250px] text-center">
//               {label}
//             </h2>
//             <button
//               onClick={() => onNavigate("NEXT")}
//               className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
//             >
//               <ChevronRight size={24} />
//             </button>
//             <button
//               onClick={() => onNavigate("TODAY")}
//               className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-medium"
//             >
//               Today
//             </button>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => onView(Views.MONTH)}
//               className={`px-4 py-2 rounded-lg transition-colors font-medium ${
//                 view === Views.MONTH
//                   ? "bg-blue-500"
//                   : "bg-blue-700 hover:bg-blue-600"
//               }`}
//             >
//               Month
//             </button>
//             <button
//               onClick={() => onView(Views.WEEK)}
//               className={`px-4 py-2 rounded-lg transition-colors font-medium ${
//                 view === Views.WEEK
//                   ? "bg-blue-500"
//                   : "bg-blue-700 hover:bg-blue-600"
//               }`}
//             >
//               Week
//             </button>
//             <button
//               onClick={() => onView(Views.DAY)}
//               className={`px-4 py-2 rounded-lg transition-colors font-medium ${
//                 view === Views.DAY
//                   ? "bg-blue-500"
//                   : "bg-blue-700 hover:bg-blue-600"
//               }`}
//             >
//               Day
//             </button>
//             <button
//               onClick={() => onView(Views.AGENDA)}
//               className={`px-4 py-2 rounded-lg transition-colors font-medium ${
//                 view === Views.AGENDA
//                   ? "bg-blue-500"
//                   : "bg-blue-700 hover:bg-blue-600"
//               }`}
//             >
//               Agenda
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const EventComponent = ({ event }) => {
//     const icons = {
//       technical: Users,
//       "phone-screen": Phone,
//       final: Users,
//       hr: Users,
//       culture: Users,
//     };
//     const Icon = icons[event.type] || Users;

//     return (
//       <div className="flex items-center gap-1">
//         <Icon size={12} />
//         <span className="truncate font-medium">{event.title}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full h-screen bg-gray-50 flex flex-col">
//       <style>{`
//         .rbc-calendar {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//         }
//         .rbc-header {
//           padding: 12px 4px;
//           font-weight: 600;
//           color: #374151;
//           background: #f9fafb;
//           border-bottom: 2px solid #e5e7eb;
//         }
//         .rbc-today {
//           background-color: #eff6ff;
//         }
//         .rbc-off-range-bg {
//           background: #f9fafb;
//         }
//         .rbc-month-view {
//           border: 1px solid #e5e7eb;
//           border-radius: 8px;
//           overflow: hidden;
//         }
//         .rbc-day-bg {
//           border-left: 1px solid #e5e7eb;
//         }
//         .rbc-month-row {
//           border-top: 1px solid #e5e7eb;
//           min-height: 120px;
//         }
//         .rbc-event {
//           padding: 4px 8px;
//           cursor: pointer;
//         }
//         .rbc-event:hover {
//           opacity: 1 !important;
//           transform: scale(1.02);
//           transition: all 0.2s;
//         }
//         .rbc-date-cell {
//           padding: 8px;
//           font-weight: 500;
//           color: #1f2937;
//         }
//         .rbc-time-view {
//           border: 1px solid #e5e7eb;
//           border-radius: 8px;
//           overflow: hidden;
//         }
//         .rbc-time-header {
//           border-bottom: 2px solid #e5e7eb;
//         }
//         .rbc-time-content {
//           border-top: none;
//         }
//         .rbc-timeslot-group {
//           min-height: 80px;
//           border-bottom: 1px solid #f3f4f6;
//         }
//         .rbc-current-time-indicator {
//           background-color: #ef4444;
//           height: 2px;
//         }
//         .rbc-agenda-view {
//           border: 1px solid #e5e7eb;
//           border-radius: 8px;
//           overflow: hidden;
//         }
//         .rbc-agenda-table {
//           border: none;
//         }
//         .rbc-agenda-date-cell {
//           padding: 12px;
//           background: #f9fafb;
//           font-weight: 600;
//         }
//         .rbc-agenda-event-cell {
//           padding: 12px;
//         }
//       `}</style>

//       <div className="flex-1 max-w-7xl mx-auto w-full p-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             view={view}
//             onView={setView}
//             date={date}
//             onNavigate={setDate}
//             eventPropGetter={eventStyleGetter}
//             components={{
//               toolbar: CustomToolbar,
//               event: EventComponent,
//             }}
//             onSelectEvent={(event) => setSelectedEvent(event)}
//             popup
//             style={{ height: "100%" }}
//           />

//           {/* Legend */}
//           <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-6">
//                 <span className="text-sm font-semibold text-gray-700">
//                   Interview Types:
//                 </span>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-blue-500 rounded"></div>
//                     <span className="text-xs text-gray-600">Technical</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-green-500 rounded"></div>
//                     <span className="text-xs text-gray-600">Phone Screen</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-purple-500 rounded"></div>
//                     <span className="text-xs text-gray-600">Final Round</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-amber-500 rounded"></div>
//                     <span className="text-xs text-gray-600">HR Interview</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-pink-500 rounded"></div>
//                     <span className="text-xs text-gray-600">Culture Fit</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-500">
//                 Total Interviews:{" "}
//                 <span className="font-semibold text-gray-700">
//                   {events.length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={() => setSelectedEvent(null)}
//         >
//           <div
//             className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-start justify-between mb-4">
//               <h3 className="text-2xl font-bold text-gray-900">
//                 {selectedEvent.candidate}
//               </h3>
//               <button
//                 onClick={() => setSelectedEvent(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-3">
//               <div className="flex items-center gap-3 text-gray-700">
//                 <Users size={18} className="text-blue-600" />
//                 <div>
//                   <div className="text-sm text-gray-500">Position</div>
//                   <div className="font-medium">{selectedEvent.position}</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <Clock size={18} className="text-blue-600" />
//                 <div>
//                   <div className="text-sm text-gray-500">Time</div>
//                   <div className="font-medium">
//                     {moment(selectedEvent.start).format(
//                       "MMM DD, YYYY • h:mm A"
//                     )}{" "}
//                     - {moment(selectedEvent.end).format("h:mm A")}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <Users size={18} className="text-blue-600" />
//                 <div>
//                   <div className="text-sm text-gray-500">Interviewer</div>
//                   <div className="font-medium">{selectedEvent.interviewer}</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <MapPin size={18} className="text-blue-600" />
//                 <div>
//                   <div className="text-sm text-gray-500">Location</div>
//                   <div className="font-medium">{selectedEvent.location}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex gap-3">
//               <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//                 Join Meeting
//               </button>
//               <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
//                 Reschedule
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecruitmentCalendar;

"use client";

import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import {
  Users,
  Phone,
  MapPin,
  Clock,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface InterviewEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  candidate: string;
  position: string;
  interviewer: string;
  location: string;
  type: "technical" | "phone-screen" | "final" | "hr" | "culture";
  status: string;
  email: string;
}

const initialEvents: InterviewEvent[] = [
  {
    id: 1,
    title: "Sarah Chen - Technical Interview",
    start: new Date(2025, 11, 5, 10, 0),
    end: new Date(2025, 11, 5, 11, 0),
    candidate: "Sarah Chen",
    position: "Senior Frontend Developer",
    interviewer: "Mike Johnson",
    location: "Video Call",
    type: "technical",
    status: "scheduled",
    email: "sarah.chen@email.com",
  },
  {
    id: 2,
    title: "John Doe - Phone Screen",
    start: new Date(2025, 11, 5, 14, 0),
    end: new Date(2025, 11, 5, 14, 30),
    candidate: "John Doe",
    position: "Product Manager",
    interviewer: "Emily Davis",
    location: "Phone",
    type: "phone-screen",
    status: "scheduled",
    email: "john.doe@email.com",
  },
  {
    id: 3,
    title: "Alex Rivera - System Design",
    start: new Date(2025, 11, 6, 15, 0),
    end: new Date(2025, 11, 6, 16, 30),
    candidate: "Alex Rivera",
    position: "Backend Engineer",
    interviewer: "Tom Wilson",
    location: "Conference Room A",
    type: "technical",
    status: "scheduled",
    email: "alex.rivera@email.com",
  },
  {
    id: 4,
    title: "Maria Garcia - Final Round",
    start: new Date(2025, 11, 8, 10, 0),
    end: new Date(2025, 11, 8, 12, 0),
    candidate: "Maria Garcia",
    position: "UX Designer",
    interviewer: "Sarah Lee, Mike Johnson",
    location: "Video Call",
    type: "final",
    status: "scheduled",
    email: "maria.garcia@email.com",
  },
  {
    id: 5,
    title: "David Kim - HR Interview",
    start: new Date(2025, 11, 10, 13, 0),
    end: new Date(2025, 11, 10, 14, 0),
    candidate: "David Kim",
    position: "Data Analyst",
    interviewer: "HR Team",
    location: "Office - Room 301",
    type: "hr",
    status: "scheduled",
    email: "david.kim@email.com",
  },
  {
    id: 6,
    title: "Lisa Wang - Coding Challenge",
    start: new Date(2025, 11, 12, 11, 0),
    end: new Date(2025, 11, 12, 13, 0),
    candidate: "Lisa Wang",
    position: "Full Stack Developer",
    interviewer: "Dev Team",
    location: "Video Call",
    type: "technical",
    status: "scheduled",
    email: "lisa.wang@email.com",
  },
  {
    id: 7,
    title: "James Brown - Culture Fit",
    start: new Date(2025, 11, 15, 16, 0),
    end: new Date(2025, 11, 15, 17, 0),
    candidate: "James Brown",
    position: "Marketing Manager",
    interviewer: "Team Leads",
    location: "Conference Room B",
    type: "culture",
    status: "scheduled",
    email: "james.brown@email.com",
  },
  {
    id: 8,
    title: "Emma Wilson - Initial Screen",
    start: new Date(2025, 11, 18, 9, 0),
    end: new Date(2025, 11, 18, 9, 30),
    candidate: "Emma Wilson",
    position: "DevOps Engineer",
    interviewer: "Chris Anderson",
    location: "Phone",
    type: "phone-screen",
    status: "scheduled",
    email: "emma.wilson@email.com",
  },
];

const RecruitmentCalendar = () => {
  const [events, setEvents] = useState<InterviewEvent[]>(initialEvents);
  const [view, setView] = useState<any>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<InterviewEvent | null>(
    null
  );

  // Filtering States
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedPosition, setSelectedPosition] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Drag & Drop Reschedule Modal
  const [rescheduleEvent, setRescheduleEvent] = useState<{
    event: InterviewEvent;
    start: Date;
    end: Date;
  } | null>(null);

  // Extract unique positions
  const positions = useMemo(() => {
    const unique = [...new Set(events.map((e) => e.position))];
    return unique.sort();
  }, [events]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedType !== "all" && event.type !== selectedType) return false;
      if (selectedPosition !== "all" && event.position !== selectedPosition)
        return false;
      return true;
    });
  }, [events, selectedType, selectedPosition]);

  const eventStyleGetter = (event: InterviewEvent) => {
    const colors: Record<string, { bg: string; border: string }> = {
      technical: { bg: "#3b82f6", border: "#2563eb" },
      "phone-screen": { bg: "#10b981", border: "#059669" },
      final: { bg: "#8b5cf6", border: "#7c3aed" },
      hr: { bg: "#f59e0b", border: "#d97706" },
      culture: { bg: "#ec4899", border: "#db2777" },
    };

    const { bg, border } = colors[event.type] || {
      bg: "#6b7280",
      border: "#4b5563",
    };

    return {
      style: {
        backgroundColor: bg,
        borderLeft: `5px solid ${border}`,
        borderRadius: "6px",
        color: "white",
        fontSize: "12px",
        padding: "2px 6px",
      },
    };
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    setRescheduleEvent({ event, start: new Date(start), end: new Date(end) });
  };

  const confirmReschedule = () => {
    if (!rescheduleEvent) return;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === rescheduleEvent.event.id
          ? { ...ev, start: rescheduleEvent.start, end: rescheduleEvent.end }
          : ev
      )
    );
    setRescheduleEvent(null);
  };

  const CustomEvent = ({ event }: { event: InterviewEvent }) => {
    const icons = {
      technical: Users,
      "phone-screen": Phone,
      final: Users,
      hr: Users,
      culture: Users,
    };
    const Icon = icons[event.type] || Users;

    return (
      <div className="flex items-center gap-1.5 text-xs">
        <Icon size={14} />
        <span className="truncate font-medium">{event.candidate}</span>
      </div>
    );
  };

  const CustomToolbar = (toolbar: any) => {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="px-4 py-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Recruitment Calendar
              </h1>
              <p className="text-blue-100">Team Interview Schedule</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-50"
              >
                <Filter size={18} />
                Filter{" "}
                {selectedType !== "all" || selectedPosition !== "all"
                  ? "•"
                  : ""}
              </button>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-50">
                <Download size={18} /> Export
              </button>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-50">
                <Plus size={18} /> Schedule
              </button>
            </div>
          </div>

          {/* Filters Dropdown */}
          {showFilters && (
            <div className="mt-4 p-4 bg-blue-800 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Interview Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-gray-900"
                  >
                    <option value="all">All Types</option>
                    <option value="technical">Technical</option>
                    <option value="phone-screen">Phone Screen</option>
                    <option value="final">Final Round</option>
                    <option value="hr">HR Interview</option>
                    <option value="culture">Culture Fit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Position
                  </label>
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-gray-900"
                  >
                    <option value="all">All Positions</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {(selectedType !== "all" || selectedPosition !== "all") && (
                <button
                  onClick={() => {
                    setSelectedType("all");
                    setSelectedPosition("all");
                  }}
                  className="mt-3 text-sm underline hover:no-underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => toolbar.onNavigate("PREV")}
                className="p-2 hover:bg-blue-500 rounded-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-xl md:text-2xl font-semibold text-center min-w-[200px]">
                {toolbar.label}
              </h2>
              <button
                onClick={() => toolbar.onNavigate("NEXT")}
                className="p-2 hover:bg-blue-500 rounded-lg"
              >
                <ChevronRight size={24} />
              </button>
              <button
                onClick={() => toolbar.onNavigate("TODAY")}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium"
              >
                Today
              </button>
            </div>

            <div className="flex gap-2 justify-center">
              {["Month", "Week", "Day", "Agenda"].map((v) => (
                <button
                  key={v}
                  onClick={() => toolbar.onView(v.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    toolbar.view === v.toLowerCase()
                      ? "bg-blue-500"
                      : "bg-blue-700 hover:bg-blue-600"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="h-screen bg-gray-50 flex flex-col">
        <style jsx global>{`
          .rbc-calendar {
            font-family: system-ui, sans-serif;
          }
          .rbc-header {
            padding: 12px;
            font-weight: 600;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
          }
          .rbc-today {
            background-color: #eff6ff !important;
          }
          .rbc-month-row {
            min-height: 100px;
          }
          .rbc-event {
            cursor: grab;
          }
          .rbc-event:active {
            cursor: grabbing;
          }
          .rbc-event:hover {
            opacity: 0.9;
          }
          @media (max-width: 768px) {
            .rbc-month-row {
              min-height: 80px;
            }
          }
        `}</style>

        <div className="flex-1 overflow-hidden">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            eventPropGetter={eventStyleGetter}
            components={{
              toolbar: CustomToolbar,
              event: CustomEvent,
            }}
            onSelectEvent={setSelectedEvent}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventDrop} // Also support resizing
            draggableAccessor={() => true}
            resizableAccessor={() => true}
            popup
            views={["month", "week", "day", "agenda"]}
            style={{ height: "100%" }}
          />
        </div>

        {/* Footer */}
        <div className="bg-white border-t px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="font-semibold text-gray-700">
                Interview Types:
              </span>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span className="text-gray-600">Technical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-gray-600">Phone Screen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded" />
                  <span className="text-gray-600">Final</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded" />
                  <span className="text-gray-600">HR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded" />
                  <span className="text-gray-600">Culture</span>
                </div>
              </div>
            </div>
            <div className="text-gray-600">
              Showing <strong>{filteredEvents.length}</strong> of{" "}
              <strong>{events.length}</strong> interviews
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-2xl font-bold">{selectedEvent.candidate}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Users className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-semibold">{selectedEvent.position}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">
                    {moment(selectedEvent.start).format(
                      "MMM DD, YYYY • h:mm A"
                    )}{" "}
                    - {moment(selectedEvent.end).format("h:mm A")}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Interviewer</p>
                  <p className="font-semibold">{selectedEvent.interviewer}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{selectedEvent.location}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Join Meeting
              </button>
              <button className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Confirmation Modal */}
      {rescheduleEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setRescheduleEvent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarIcon size={20} className="text-blue-600" />
              Confirm Reschedule
            </h3>
            <p className="text-gray-700 mb-6">
              Move <strong>{rescheduleEvent.event.candidate}</strong>'s
              interview to:
            </p>
            <p className="bg-gray-100 px-4 py-3 rounded-lg font-medium text-center mb-6">
              {moment(rescheduleEvent.start).format("dddd, MMMM Do • h:mm A")} →{" "}
              {moment(rescheduleEvent.end).format("h:mm A")}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setRescheduleEvent(null)}
                className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReschedule}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruitmentCalendar;
