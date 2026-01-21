import { useState } from "react";
import { redirect } from "next/navigation";
import {
  ChatMessage,
  InterviewSession,
  Participant,
} from "@/interfaces/interview";
import { InterviewRoom } from "@/features/interview/components/interview-room";

// Mock data for demo
const mockSession: InterviewSession = {
  id: "interview-1",
  title: "Technical Interview - Round 2",
  candidate: "Sarah Chen",
  position: "Senior Frontend Developer",
  scheduledAt: new Date(),
  duration: 60,
  status: "in-progress",
};

const mockParticipants: Participant[] = [
  {
    id: "user-1",
    name: "You",
    role: "interviewer",
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "ME",
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    role: "candidate",
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isSpeaking: true,
    initials: "SC",
  },
  {
    id: "user-3",
    name: "John Smith",
    role: "interviewer",
    isMuted: true,
    isVideoOn: true,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "JS",
  },
  {
    id: "user-4",
    name: "Emily Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "EW",
  },
  {
    id: "user-5",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
  },
  {
    id: "user-6",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
  },
  {
    id: "user-7",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
  },
  {
    id: "user-8",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
  },
  {
    id: "user-9",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
  },
  {
    id: "user-10",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "system",
    senderName: "System",
    content: "Sarah Chen joined the meeting",
    timestamp: new Date(Date.now() - 300000),
    type: "system",
  },
  {
    id: "msg-2",
    senderId: "user-3",
    senderName: "John Smith",
    content: "Hi Sarah, welcome to the interview!",
    timestamp: new Date(Date.now() - 240000),
    type: "message",
  },
  {
    id: "msg-3",
    senderId: "user-2",
    senderName: "Sarah Chen",
    content: "Thank you! Excited to be here.",
    timestamp: new Date(Date.now() - 200000),
    type: "message",
  },
];

export default function InterviewRoomWrapper() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "user-1",
      senderName: "You",
      content,
      timestamp: new Date(),
      type: "message",
    };
    setMessages([...messages, newMessage]);
  };

  const handleLeave = () => {
    redirect("/");
  };

  return (
    <InterviewRoom
      session={mockSession}
      participants={mockParticipants}
      messages={messages}
      currentUserId="user-1"
      onSendMessage={handleSendMessage}
      onLeave={handleLeave}
    />
  );
}
