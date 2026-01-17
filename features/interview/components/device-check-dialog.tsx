import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  Check,
  AlertCircle,
} from "lucide-react";

interface DeviceCheckDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

interface DeviceInfo {
  deviceId: string;
  label: string;
}

const DeviceCheckDialog = ({
  open,
  onOpenChange,
  onComplete,
}: DeviceCheckDialogProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [cameras, setCameras] = useState<DeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<DeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<DeviceInfo[]>([]);

  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");

  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  const [cameraStatus, setCameraStatus] = useState<
    "checking" | "working" | "error"
  >("checking");
  const [micStatus, setMicStatus] = useState<"checking" | "working" | "error">(
    "checking"
  );
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (open) {
      initializeDevices();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [open]);

  const initializeDevices = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setCameraStatus("working");
      setMicStatus("working");

      // Get device list
      const devices = await navigator.mediaDevices.enumerateDevices();

      const videoDevices = devices
        .filter((d) => d.kind === "videoinput")
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${d.deviceId.slice(0, 5)}`,
        }));

      const audioInputDevices = devices
        .filter((d) => d.kind === "audioinput")
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `Microphone ${d.deviceId.slice(0, 5)}`,
        }));

      const audioOutputDevices = devices
        .filter((d) => d.kind === "audiooutput")
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `Speaker ${d.deviceId.slice(0, 5)}`,
        }));

      setCameras(videoDevices);
      setMicrophones(audioInputDevices);
      setSpeakers(audioOutputDevices);

      if (videoDevices.length > 0) setSelectedCamera(videoDevices[0].deviceId);
      if (audioInputDevices.length > 0)
        setSelectedMicrophone(audioInputDevices[0].deviceId);
      if (audioOutputDevices.length > 0)
        setSelectedSpeaker(audioOutputDevices[0].deviceId);

      // Audio level monitoring
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(mediaStream);
      microphone.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(Math.min(100, average * 2));
        if (stream) {
          requestAnimationFrame(checkAudioLevel);
        }
      };
      checkAudioLevel();
    } catch (error) {
      console.error("Error accessing devices:", error);
      setCameraStatus("error");
      setMicStatus("error");
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicEnabled(audioTrack.enabled);
      }
    }
  };

  const handleComplete = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onComplete();
    onOpenChange(false);
  };

  const StatusIcon = ({
    status,
  }: {
    status: "checking" | "working" | "error";
  }) => {
    if (status === "working") {
      return (
        <Check className="w-4 h-4" style={{ color: "hsl(152 69% 45%)" }} />
      );
    }
    if (status === "error") {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
    return (
      <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Test Audio & Video
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-3 mt-3">
          {/* Video Preview */}
          <div className="space-y-3 border-1 p-3 rounded-lg">
            <div className="relative aspect-video rounded-lg border-1 overflow-hidden">
              <video
                ref={videoRef}
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
                    backgroundColor: cameraEnabled
                      ? "var(--card)"
                      : "hsl(0 84% 60%)",
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
                    backgroundColor: micEnabled
                      ? "var(--card)"
                      : "hsl(0 84% 60%)",
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

            {/* Audio Level Indicator */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="w-4 h-4" />
                <span>Microphone Level</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-75 rounded-full"
                  style={{
                    width: `${audioLevel}%`,
                    backgroundColor: "hsl(152 69% 45%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Device Selection */}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Speaker</label>
              <Select
                value={selectedSpeaker}
                onValueChange={setSelectedSpeaker}
              >
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
        </div>

        <div className="flex justify-end gap-3 mt-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleComplete}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceCheckDialog;
