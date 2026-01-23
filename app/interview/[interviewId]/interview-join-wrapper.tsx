"use client";

import { Card } from "@/components/ui/card";
import InterviewActions from "@/features/interview/components/interview-actions";
import InterviewDetails from "@/features/interview/components/interview-join-details";
import DeviceCheck from "@/features/media-setup/components/device-check";

export interface InterviewJoinProps {
  loading: boolean;
  handleJoinInterview: () => void;
}

const InterviewJoinWrapper: React.FC<InterviewJoinProps> = ({
  loading,
  handleJoinInterview,
}) => {
  const interviewData = {
    userName: "Mohamed Safras",
    title: "Full Stack Developer Interview",
    company: "Google Inc.",
    duration: "30 Minutes",
    date: "Friday, Jan 16 • 12:00 PM - 12:30 PM GMT+5:30",
  };

  console.log(loading);

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <Card className="w-full max-w-5xl p-0 mx-auto overflow-hidden shadow-none">
        <div className="p-3 pt-6 space-y-6">
          <InterviewDetails
            title={interviewData.title}
            userName={interviewData.userName}
            date={interviewData.date}
            duration={interviewData.duration}
          />
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <DeviceCheck />
            {/* Device Selection */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <h1 className="text-2xl font-medium">Ready to join ?</h1>
              <span className="text-sm font-medium">No one else is here</span>
              <InterviewActions
                onJoin={handleJoinInterview}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default InterviewJoinWrapper;
