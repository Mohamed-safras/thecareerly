import { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Plus,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Communication {
  id: string;
  type: "email" | "phone" | "note";
  subject?: string;
  content: string;
  date: string;
  time: string;
  sender: {
    name: string;
    avatar: string;
  };
  direction?: "inbound" | "outbound";
  status?: "sent" | "delivered" | "opened" | "replied";
}

const mockCommunications: Communication[] = [
  {
    id: "1",
    type: "email",
    subject: "Interview Confirmation - Technical Round",
    content:
      "Hi Sarah, I'm pleased to confirm your technical interview scheduled for December 18th at 10:00 AM PST. You will be meeting with John Smith (Engineering Manager) and Sarah Johnson (Senior Developer). Please find the meeting link below...",
    date: "Dec 16, 2024",
    time: "3:45 PM",
    sender: {
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    direction: "outbound",
    status: "opened",
  },
  {
    id: "2",
    type: "email",
    subject: "Re: Interview Confirmation",
    content:
      "Thank you for the confirmation! I'm looking forward to the interview. I have reviewed the job description and prepared some questions. See you on the 18th!",
    date: "Dec 16, 2024",
    time: "5:12 PM",
    sender: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    direction: "inbound",
    status: "replied",
  },
  {
    id: "3",
    type: "phone",
    content:
      "Initial screening call. Discussed role expectations, salary range ($150k-$180k), and start date flexibility. Candidate is enthusiastic and available to start in January.",
    date: "Dec 14, 2024",
    time: "2:30 PM",
    sender: {
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    direction: "outbound",
  },
  {
    id: "4",
    type: "note",
    content:
      "Candidate has strong portfolio. Reviewed GitHub projects - clean code and good documentation. Recommended to proceed to technical interview.",
    date: "Dec 12, 2024",
    time: "11:00 AM",
    sender: {
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  },
  {
    id: "5",
    type: "email",
    subject: "Application Received - Senior Frontend Developer",
    content:
      "Dear Sarah, Thank you for applying for the Senior Frontend Developer position at our company. We have received your application and will review it shortly. We will be in touch within 5 business days...",
    date: "Dec 10, 2024",
    time: "9:15 AM",
    sender: {
      name: "HR Team",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    },
    direction: "outbound",
    status: "delivered",
  },
];

const typeIcons = {
  email: Mail,
  phone: Phone,
  note: MessageSquare,
};

const statusColors = {
  sent: "bg-gray-500",
  delivered: "bg-blue-500",
  opened: "bg-green-500",
  replied: "bg-purple-500",
};

export const CommunicationHistory = () => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredCommunications =
    activeTab === "all"
      ? mockCommunications
      : mockCommunications.filter((c) => c.type === activeTab);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Communication History</h3>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Compose Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div className="space-y-3">
                <Label>Type</Label>
                <Select defaultValue="email">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="note">Internal Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Enter subject..." />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Write your message..."
                  className="min-h-[150px]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 gap-2"
                  onClick={() => setIsComposeOpen(false)}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsComposeOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="email" className="gap-1">
            <Mail className="h-3 w-3" />
            Emails
          </TabsTrigger>
          <TabsTrigger value="phone" className="gap-1">
            <Phone className="h-3 w-3" />
            Calls
          </TabsTrigger>
          <TabsTrigger value="note" className="gap-1">
            <MessageSquare className="h-3 w-3" />
            Notes
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Communications List */}
      <div className="space-y-3">
        {filteredCommunications.map((comm) => {
          const TypeIcon = typeIcons[comm.type];

          return (
            <div
              key={comm.id}
              className="rounded-lg border bg-card p-4 space-y-3 transition-colors cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      comm.type === "email"
                        ? "bg-status-archived-bg text-status-archived"
                        : comm.type === "phone"
                        ? "bg-status-active-bg text-status-active"
                        : "bg-status-hold-bg text-status-hold"
                    }`}
                  >
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div>
                    {comm.subject && (
                      <p className="font-medium text-sm">{comm.subject}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {comm.date} at {comm.time}
                      {comm.direction && (
                        <Badge variant="outline" className="text-xs py-0">
                          {comm.direction === "outbound" ? "Sent" : "Received"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {comm.status && (
                  <Badge
                    className={`${
                      statusColors[comm.status]
                    }  border-none text-xs`}
                  >
                    {comm.status.charAt(0).toUpperCase() + comm.status.slice(1)}
                  </Badge>
                )}
              </div>

              {/* Sender */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comm.sender.avatar} />
                  <AvatarFallback className="text-xs">
                    {comm.sender.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {comm.sender.name}
                </span>
              </div>

              {/* Content Preview */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {comm.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                {comm.type === "email" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Full Email
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  Reply
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
