"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import InterviewDetails from "@/features/interview/components/interview-join-details";
import InterviewBeginTips from "@/features/interview/components/interview-begin-tips";
import DeviceCheckDialog from "@/features/media-setup/components/device-check";
import InterviewActions from "@/features/interview/components/interview-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import DeviceCheck from "@/features/media-setup/components/device-check";

const InterviewJoin = () => {
  const [devicesChecked, setDevicesChecked] = useState(false);
  const [joining, setJoining] = useState(false);

  const interviewData = {
    title: "Full Stack Developer Interview",
    company: "Google Inc.",
    duration: "30 Minutes",
  };

  const handleJoinInterview = () => {
    if (!devicesChecked) {
      toast.info("We recommend testing your audio & video before joining");
    }

    setJoining(true);

    // In real app, this would navigate to the interview room
    toast.success("Joining interview...");
    setTimeout(() => {
      setJoining(false);
      redirect("/interview/jcg-vios-vrk");
    }, 3000);
  };

  const handleDeviceCheckComplete = () => {
    setDevicesChecked(true);
    toast.success("Your devices are ready!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <Card className="w-full max-w-5xl p-0 mx-auto overflow-hidden shadow-none">
        <div className="p-3 pt-3 space-y-3">
          <InterviewDetails
            title={interviewData.title}
            date={"Friday, Jan 16 • 12:00 PM - 12:30 PM GMT+5:30"}
            duration={interviewData.duration}
          />

          {/* <InterviewBeginTips /> */}

          <DeviceCheck onComplete={handleDeviceCheckComplete} />

          {/* <InterviewActions onJoin={handleJoinInterview} joining={joining} /> */}
        </div>
      </Card>
    </div>
  );
};
export default InterviewJoin;
