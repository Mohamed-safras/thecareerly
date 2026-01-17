"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import interviewIllustration from "@/assets/interview-illustration.png";
import Image from "next/image";
import InterviewDetails from "@/features/interview/components/interview-join-details";
import InterviewBeginTips from "@/features/interview/components/interview-begin-tips";
import DeviceCheckDialog from "@/features/media-setup/components/device-check-dialog";
import InterviewActions from "@/features/interview/components/interview-actions";
import { toast } from "sonner";

const InterviewJoin = () => {
  const [deviceCheckOpen, setDeviceCheckOpen] = useState(false);
  const [devicesChecked, setDevicesChecked] = useState(false);

  const interviewData = {
    title: "Full Stack Developer Interview",
    company: "Google Inc.",
    duration: "30 Minutes",
  };

  const handleJoinInterview = () => {
    if (!devicesChecked) {
      toast.info("We recommend testing your audio & video before joining");
    }

    // In real app, this would navigate to the interview room
    toast.success("Joining interview...");
  };

  const handleDeviceCheckComplete = () => {
    setDevicesChecked(true);
    toast.success("Your devices are ready!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <Card className="w-full max-w-4xl p-0 mx-auto overflow-hidden shadow-none">
        <div className="p-3 pt-3 space-y-3">
          {/* interviewIllustration */}
          <div className="flex justify-center">
            <Image
              src={interviewIllustration}
              alt="Interview Illustration"
              className={"w-50 h-50 object-contain"}
            />
          </div>

          <InterviewDetails
            title={interviewData.title}
            date={"Friday, Jan 16 • 12:00 PM - 12:30 PM GMT+5:30"}
            duration={interviewData.duration}
          />

          <InterviewBeginTips />

          <InterviewActions
            onJoin={handleJoinInterview}
            onTestDevices={() => setDeviceCheckOpen(true)}
            devicesChecked={devicesChecked}
          />
        </div>
      </Card>

      <DeviceCheckDialog
        open={deviceCheckOpen}
        onOpenChange={setDeviceCheckOpen}
        onComplete={handleDeviceCheckComplete}
      />
    </div>
  );
};
export default InterviewJoin;
