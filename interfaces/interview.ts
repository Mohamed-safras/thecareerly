export interface Participant {
  id: string;
  name: string;
  role: "interviewer" | "candidate" | "observer";
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isSpeaking: boolean;
  avatarUrl?: string;
  initials: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "message" | "system";
}

export interface InterviewSession {
  id: string;
  title: string;
  candidate: string;
  position: string;
  scheduledAt: Date;
  duration: number; // minutes
  status: "waiting" | "in-progress" | "ended";
}
