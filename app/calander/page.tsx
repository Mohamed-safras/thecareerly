import EventCalendar from "@/features/interview/calander/calander";

const CalendarPage = () => {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="px-4 py-6 space-y-3">
        <EventCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
