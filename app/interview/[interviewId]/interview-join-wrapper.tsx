"use client";

import { Card } from "@/components/ui/card";
import InterviewActions from "@/features/interview/components/interview-actions";
import InterviewDetails from "@/features/interview/components/interview-join-details";
import DeviceCheck from "@/features/media-setup/components/device-check";
import InterviewIllustration from "@/assets/interview-illustration.jpg";
import Image from "next/image";

export interface InterviewJoinProps {
  loading: boolean;
  startCall: () => void;
}

const InterviewJoinWrapper: React.FC<InterviewJoinProps> = ({
  loading,
  startCall,
}) => {
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
        <div className="p-3 space-y-3">
          <InterviewDetails
            title={interviewData.title}
            userName={interviewData.userName}
            date={interviewData.date}
            duration={interviewData.duration}
          />

          <div className="border mx-auto rounded-lg w-120">
            <Image
              src={InterviewIllustration}
              alt="Interview Illustration"
              className="aspect-video object-cover rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <DeviceCheck />
            {/* Device Selection */}
            <div className="flex flex-col items-center justify-center space-y-3 border rounded-lg">
              <h1 className="text-2xl font-medium">Ready to join ?</h1>
              <span className="text-sm font-medium">No one else is here</span>
              <InterviewActions onJoin={startCall} loading={loading} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default InterviewJoinWrapper;
