import { WeeklyTrends } from "@/features/dashboard/components/weekly-trends";

const WeeklyTrendsWrapper = () => {
  const weeklyTrendsData = [
    { day: "Mon", applications: 42, interviews: 8, offers: 2 },
    { day: "Tue", applications: 58, interviews: 12, offers: 1 },
    { day: "Wed", applications: 67, interviews: 15, offers: 3 },
    { day: "Thu", applications: 51, interviews: 9, offers: 2 },
    { day: "Fri", applications: 73, interviews: 11, offers: 4 },
    { day: "Sat", applications: 24, interviews: 3, offers: 0 },
    { day: "Sun", applications: 18, interviews: 2, offers: 1 },
  ];
  return <WeeklyTrends data={weeklyTrendsData} />;
};

export default WeeklyTrendsWrapper;
