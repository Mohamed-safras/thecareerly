"use client";

import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React, { RefObject } from "react";

export interface VideoPreviewProps {
  ref: RefObject<HTMLVideoElement | null>;
  cameraEnabled: boolean;
  micEnabled: boolean;
  toggleCamera: () => void;
  toggleMic: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  ref,
  cameraEnabled,
  micEnabled,
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

      {/* Camera/Mic Toggle Buttons */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <button
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
        </button>
        <button
          onClick={toggleMic}
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
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;
