import { useState, useEffect, useRef } from "react";
import VideoPreview from "./video-preview";
import AudioLevelIndicator from "./audio-level-indicatior";
import MediaSettingsDailog from "./media-settings-dailog";
import { DeviceInfo } from "@/interfaces/media";
import InterviewActions from "@/features/interview/components/interview-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const DeviceCheck = () => {
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
  const [open, setOpen] = useState(false);
  const [joining, setJoining] = useState(false);

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
        .filter((device) => device.kind === "videoinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 5)}`,
        }));

      const audioInputDevices = devices
        .filter((device) => device.kind === "audioinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 5)}`,
        }));

      const audioOutputDevices = devices
        .filter((device) => device.kind === "audiooutput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Speaker ${device.deviceId.slice(0, 5)}`,
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

  useEffect(() => {
    initializeDevices();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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

  const handleJoinInterview = () => {
    setJoining(true);

    // In real app, this would navigate to the interview room
    toast.success("Joining interview...");
    setTimeout(() => {
      setJoining(false);
      redirect("/interview/jcg-vios-vrk");
    }, 3000);
  };

  return (
    <div className="md:max-w-5xl">
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        {/* Video Preview */}
        <div className="relative">
          <VideoPreview
            ref={videoRef}
            cameraEnabled={cameraEnabled}
            micEnabled={micEnabled}
            toggleCamera={toggleCamera}
            toggleMic={toggleMic}
          />

          {/* Audio Level Indicator */}
          {/* <AudioLevelIndicator audioLevel={audioLevel} /> */}
        </div>

        {/* Device Selection */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl font-medium">Ready to join ?</h1>
          <span className="text-sm font-medium">No one else is here</span>
          <InterviewActions onJoin={handleJoinInterview} joining={joining} />
        </div>
      </div>

      <MediaSettingsDailog
        open={open}
        onOpenChange={setOpen}
        deviceSelectorProps={{
          cameras,
          cameraStatus,
          microphones,
          micStatus,
          speakers,
          selectedCamera,
          selectedMicrophone,
          selectedSpeaker,
          setSelectedCamera,
          setSelectedMicrophone,
          setSelectedSpeaker,
        }}
      />
    </div>
  );
};

export default DeviceCheck;
