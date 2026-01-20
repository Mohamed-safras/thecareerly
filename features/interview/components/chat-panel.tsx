import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Smile, Paperclip, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/interfaces/interview";

interface ChatPanelProps {
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onClose: () => void;
  className?: string;
}

export function ChatPanel({
  messages,
  currentUserId,
  onSendMessage,
  onClose,
  className,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        "w-[360px] h-full bg-[#292929] border-l border-[#3d3d3d] flex flex-col",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3d3d3d]">
        <h3 className="font-semibold text-white">Meeting chat</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-[#3d3d3d]"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => {
              const isOwn = message.senderId === currentUserId;
              const isSystem = message.type === "system";
              const showAvatar =
                index === 0 ||
                messages[index - 1].senderId !== message.senderId ||
                messages[index - 1].type === "system";

              if (isSystem) {
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-2"
                  >
                    <span className="text-xs text-white/50">
                      {message.content}
                    </span>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  {showAvatar && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[#6264a7] text-white">
                          {message.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-white">
                        {isOwn ? "You" : message.senderName}
                      </span>
                      <span className="text-xs text-white/40">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <div className={cn("pl-8", !showAvatar && "pt-0.5")}>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-[#3d3d3d]">
        <div className="bg-[#3d3d3d] rounded-lg">
          <div className="flex items-center gap-1 p-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message"
              className="flex-1 border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 h-9"
            />
          </div>
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-[#4a4a4a]"
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-[#4a4a4a]"
              >
                <AtSign className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-[#4a4a4a]"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </div>
            <Button
              size="icon"
              className="h-8 w-8 bg-[#6264a7] hover:bg-[#5254a3]"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
