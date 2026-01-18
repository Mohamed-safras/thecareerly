import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Check } from "lucide-react";
import { DeviceInfo } from "@/interfaces/media";

type DeviceStatus = "checking" | "working" | "error";

export interface DeviceSelectorProps {
  cameraStatus: DeviceStatus;
  micStatus: DeviceStatus;
  cameras: DeviceInfo[];
  microphones: DeviceInfo[];
  speakers: DeviceInfo[];
  selectedCamera: string;
  selectedMicrophone: string;
  selectedSpeaker: string;
  setSelectedCamera: Dispatch<SetStateAction<string>>;
  setSelectedMicrophone: Dispatch<SetStateAction<string>>;
  setSelectedSpeaker: Dispatch<SetStateAction<string>>;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  cameraStatus,
  micStatus,
  cameras,
  microphones,
  speakers,
  selectedCamera,
  selectedMicrophone,
  selectedSpeaker,
  setSelectedCamera,
  setSelectedMicrophone,
  setSelectedSpeaker,
}) => {
  return (
    <div className="space-y-3 border-1 rounded-lg p-3">
      {/* Camera Status */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
        <StatusIcon status={cameraStatus} />
        <span className="text-sm font-medium">
          {cameraStatus === "working"
            ? "Camera is working"
            : cameraStatus === "error"
              ? "Camera not detected"
              : "Checking camera..."}
        </span>
      </div>

      {/* Microphone Status */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
        <StatusIcon status={micStatus} />
        <span className="text-sm font-medium">
          {micStatus === "working"
            ? "Microphone is working"
            : micStatus === "error"
              ? "Microphone not detected"
              : "Checking microphone..."}
        </span>
      </div>

      {/* Camera Select */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Camera</label>
        <Select value={selectedCamera} onValueChange={setSelectedCamera}>
          <SelectTrigger>
            <SelectValue placeholder="Select camera" />
          </SelectTrigger>
          <SelectContent>
            {cameras.map((camera) => (
              <SelectItem key={camera.deviceId} value={camera.deviceId}>
                {camera.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Microphone Select */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Microphone</label>
        <Select
          value={selectedMicrophone}
          onValueChange={setSelectedMicrophone}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select microphone" />
          </SelectTrigger>
          <SelectContent>
            {microphones.map((mic) => (
              <SelectItem key={mic.deviceId} value={mic.deviceId}>
                {mic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Speaker Select */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Speaker</label>
        <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
          <SelectTrigger>
            <SelectValue placeholder="Select speaker" />
          </SelectTrigger>
          <SelectContent>
            {speakers.map((speaker) => (
              <SelectItem key={speaker.deviceId} value={speaker.deviceId}>
                {speaker.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const StatusIcon = ({
  status,
}: {
  status: "checking" | "working" | "error";
}) => {
  if (status === "working") {
    return <Check className="w-4 h-4" style={{ color: "hsl(152 69% 45%)" }} />;
  }
  if (status === "error") {
    return <AlertCircle className="w-4 h-4 text-destructive" />;
  }
  return (
    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  );
};

export default DeviceSelector;
