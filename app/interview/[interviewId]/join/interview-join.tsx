"use client";

import { Card } from "@/components/ui/card";
import InterviewDetails from "@/features/interview/components/interview-join-details";
import InterviewActions from "@/features/interview/components/interview-actions";
import DeviceCheck from "@/features/media-setup/components/device-check";
import InterviewBeginTips from "@/features/interview/components/interview-begin-tips";

const InterviewJoin = () => {
  const interviewData = {
    userName: "Mohamed Safras",
    title: "Full Stack Developer Interview",
    company: "Google Inc.",
    duration: "30 Minutes",
    date: "Friday, Jan 16 • 12:00 PM - 12:30 PM GMT+5:30",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <Card className="w-full max-w-5xl p-0 mx-auto overflow-hidden shadow-none">
        <div className="p-3 pt-3 space-y-3">
          <InterviewDetails
            title={interviewData.title}
            userName={interviewData.userName}
            date={interviewData.date}
            duration={interviewData.duration}
          />

          <InterviewBeginTips />

          <DeviceCheck />
        </div>
      </Card>
    </div>
  );
};
export default InterviewJoin;
