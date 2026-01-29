import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChatMessage,
  InterviewSession,
  Participant,
} from "@/interfaces/interview";
import { VideoGrid } from "./video-grid";
import { ChatPanel } from "./chat-panel";
import { InterviewHeader } from "./interview-header";
import { ParticipantsPanel } from "./participants-panel";
import { ControlBar } from "./control-bar";

interface InterviewRoomProps {
  session: InterviewSession;
  participants: Participant[];
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onLeave: () => void;
  className?: string;
}

export function InterviewRoom({
  session,
  participants,
  messages,
  currentUserId,
  onSendMessage,
  onLeave,
  className,
}: InterviewRoomProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [layout, setLayout] = useState<"grid" | "gallery" | "focus">("gallery");
  const [chatUnread, setChatUnread] = useState(0);

  const handleToggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setChatUnread(0);
      setShowParticipants(false);
    }
  };

  const handleToggleParticipants = () => {
    setShowParticipants(!showParticipants);
    if (!showParticipants) {
      setShowChat(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col   dark:bg-[#1a1a1a]",
        className,
      )}
    >
      {/* Header */}
      <InterviewHeader
        session={session}
        layout={layout}
        onLayoutChange={setLayout}
      />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video area */}
        <div className="flex-1 bg-[#141414]">
          <VideoGrid
            participants={participants}
            localParticipantId={currentUserId}
            layout={layout}
          />
        </div>

        {/* Side panels */}
        <AnimatePresence>
          {showChat && (
            <ChatPanel
              messages={messages}
              currentUserId={currentUserId}
              onSendMessage={onSendMessage}
              onClose={() => setShowChat(false)}
            />
          )}
          {showParticipants && (
            <ParticipantsPanel
              participants={participants}
              currentUserId={currentUserId}
              onClose={() => setShowParticipants(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Control bar */}
      <ControlBar
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        isScreenSharing={isScreenSharing}
        isHandRaised={isHandRaised}
        isRecording={isRecording}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleVideo={() => setIsVideoOn(!isVideoOn)}
        onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
        onToggleHand={() => setIsHandRaised(!isHandRaised)}
        onToggleChat={handleToggleChat}
        onToggleParticipants={handleToggleParticipants}
        onToggleRecording={() => setIsRecording(!isRecording)}
        onLeave={onLeave}
        chatUnread={chatUnread}
        showChat={showChat}
        showParticipants={showParticipants}
      />
    </div>
  );
}
