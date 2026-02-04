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
    name: "Mohamed Safras",
    role: "interviewer",
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: true,
    isSpeaking: true,
    initials: "ME",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    name: "Doh",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "EW",
    avatarUrl:
      "https://images.unsplash.com/photo-1587389198531-255244984b10?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-11",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-12",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-13",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-14",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-15",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-16",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-17",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-18",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-19",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-20",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user-21",
    name: "Watson",
    role: "observer",
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isSpeaking: false,
    initials: "W",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
