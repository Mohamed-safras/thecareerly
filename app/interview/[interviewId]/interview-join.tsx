"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import interviewIllustration from "@/assets/interview-illustration.png";
import Image from "next/image";
import InterviewHeader from "@/features/interview/components/interview-join-header";
import InterviewDetails from "@/features/interview/components/interview-join-details";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InterviewBeginTips from "@/features/interview/components/interview-begin-tips";
import DeviceCheckDialog from "@/features/interview/components/device-check-dialog";
import InterviewActions from "@/features/interview/components/interview-actions";
import { toast } from "sonner";

const InterviewJoin = () => {
  const [fullName, setFullName] = useState("");
  const [deviceCheckOpen, setDeviceCheckOpen] = useState(false);
  const [devicesChecked, setDevicesChecked] = useState(false);

  const interviewData = {
    title: "Full Stack Developer Interview",
    company: "Google Inc.",
    duration: "30 Minutes",
  };

  const handleJoinInterview = () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

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
    <div className="min-h-screen bg-background flex items-center justify-center p-3">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-none">
        <div className="p-3 pt-3 space-y-3">
          <InterviewHeader />

          {/* interviewIllustration */}
          <div className="flex justify-center">
            <Image
              src={interviewIllustration}
              alt="Interview Illustration"
              className={"w-56 h-56 object-contain"}
            />
          </div>

          <InterviewDetails
            title={interviewData.title}
            company={interviewData.company}
            duration={interviewData.duration}
          />

          <div className="text-left">
            <Label className="text-sm font-medium text-card-foreground mb-3 block">
              Enter your full name
            </Label>
            <Input
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11"
            />
          </div>

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
