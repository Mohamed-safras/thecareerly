"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InterviewBeginTips from "@/features/interview/components/interview-begin-tips";
import {
  EllipsisVertical,
  Info,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";
import React, { Dispatch, RefObject, SetStateAction } from "react";

export interface VideoPreviewProps {
  ref: RefObject<HTMLVideoElement | null>;
  cameraEnabled: boolean;
  micEnabled: boolean;
  openDeviceSettings: boolean;
  setOpenDeviceSettings: Dispatch<SetStateAction<boolean>>;
  toggleCamera: () => void;
  toggleMic: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  ref,
  cameraEnabled,
  micEnabled,
  setOpenDeviceSettings,
  toggleCamera,
  toggleMic,
}) => {
  return (
    <div className="relative aspect-video rounded-lg border-1 overflow-hidden">
      <video
        ref={ref}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover scale-x-[-1]"
      />
      {!cameraEnabled && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <VideoOff className="w-12 h-12 text-muted-foreground" />
        </div>
      )}

      <div className="absolute top-2 right-2">
        <Button
          onClick={() => setOpenDeviceSettings(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent hover:bg-accent/10"
        >
          <EllipsisVertical className="w-5 h-5" />
        </Button>
      </div>

      <div className="absolute bottom-3 right-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/10"
              style={{
                backgroundColor: "hsl(0 84% 60%)",
              }}
            >
              <Info className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={8}
            tooltipPrimitiveCustomClassName={`bg-background fill-transparent border-1 border-t-background border-l-background mt-[0.5px]`}
            className="min-w-[260px] p-0 max-w-[300px] bg-background border rounded-lg shadow-lg"
          >
            <InterviewBeginTips />
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Camera/Mic Toggle Buttons */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <Button
          onClick={toggleCamera}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: cameraEnabled ? "var(--card)" : "hsl(0 84% 60%)",
          }}
        >
          {cameraEnabled ? (
            <Video className="w-5 h-5 text-card-foreground" />
          ) : (
            <VideoOff className="w-5 h-5 text-white" />
          )}
        </Button>
        <Button
          onClick={toggleMic}
          size={"lg"}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: micEnabled ? "var(--card)" : "hsl(0 84% 60%)",
          }}
        >
          {micEnabled ? (
            <Mic className="w-5 h-5 text-card-foreground" />
          ) : (
            <MicOff className="w-5 h-5 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;
