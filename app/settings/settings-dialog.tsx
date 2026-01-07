import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserCircle,
  CreditCard,
  Cloud,
  Shield,
  User,
  FlaskConical,
  Link,
  Zap,
  Database,
  HardDrive,
  Sparkles,
  MessageSquare,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountSettingsWrapper } from "./account-settings-wrapper";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MenuSection = {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
};

const menuSections: MenuSection[] = [
  {
    title: "Workspace",
    items: [
      {
        id: "workspace",
        label: "Mohamed's Lovable",
        icon: (
          <div className="h-5 w-5 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">M</span>
          </div>
        ),
      },
      { id: "people", label: "People", icon: <User className="h-4 w-4" /> },
      {
        id: "plans",
        label: "Plans & credits",
        icon: <CreditCard className="h-4 w-4" />,
      },
      {
        id: "cloud",
        label: "Cloud & AI balance",
        icon: <Cloud className="h-4 w-4" />,
      },
      {
        id: "privacy",
        label: "Privacy & security",
        icon: <Shield className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        id: "account",
        label: "Mohamed Safras",
        icon: <UserCircle className="h-4 w-4" />,
      },
      { id: "labs", label: "Labs", icon: <FlaskConical className="h-4 w-4" /> },
    ],
  },
  {
    title: "Connectors",
    items: [
      {
        id: "connectors",
        label: "Connectors",
        icon: <Link className="h-4 w-4" />,
      },
      {
        id: "github",
        label: "GitHub",
        icon: <Github className="h-4 w-4" />,
      },
    ],
  },
];

interface StatItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

function StatItem({ label, value, className }: StatItemProps) {
  return (
    <div className={cn("", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium mt-0.5">{value}</p>
    </div>
  );
}

interface UsageRowProps {
  icon: React.ReactNode;
  label: string;
  used: number;
  limit: number | "unlimited";
  unit?: string;
  color: string;
}

function UsageRow({
  icon,
  label,
  used,
  limit,
  unit = "",
  color,
}: UsageRowProps) {
  const isUnlimited = limit === "unlimited";

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", color)}>{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-sm">
        <span className="font-medium">
          {used.toLocaleString()}
          {unit}
        </span>
        <span className="text-muted-foreground">
          {" "}
          / {isUnlimited ? "∞" : `${(limit as number).toLocaleString()}${unit}`}
        </span>
      </div>
    </div>
  );
}

function AccountSettingsContent() {
  // Generate contribution grid data
  const generateContributionData = () => {
    const weeks = 52;
    const days = 7;
    const data = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        // Random activity level (0-4)
        const level =
          Math.random() > 0.9 ? Math.floor(Math.random() * 4) + 1 : 0;
        week.push(level);
      }
      data.push(week);
    }
    return data;
  };

  const contributionData = generateContributionData();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Account settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Personalize how others see and interact with you on Lovable.
        </p>
      </div>

      {/* Activity Graph */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">4 edits on</span>
          <span className="text-orange-500">🧡</span>
          <span className="text-sm font-medium">Lovable</span>
          <span className="text-sm text-muted-foreground">
            in the last year
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-[3px] min-w-max">
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((level, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn(
                      "w-[10px] h-[10px] rounded-xs",
                      level === 0 && "bg-muted-foreground/20",
                      level === 1 && "bg-blue-900/60",
                      level === 2 && "bg-blue-700/70",
                      level === 3 && "bg-blue-500/80",
                      level === 4 && "bg-blue-400"
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <StatItem label="Daily average" value="0.0 edits" />
          <StatItem label="Days edited" value="2 (1%)" />
          <StatItem label="Current streak" value="0 days" />
        </div>

        <div className="flex items-center justify-between text-muted-foreground">
          <button className="p-1 hover:text-foreground transition-colors">
            ←
          </button>
          <button className="p-1 hover:text-foreground transition-colors">
            →
          </button>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Your avatar</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground max-w-md">
            Your avatar is either fetched from your linked identity provider or
            automatically generated based on your account.
          </p>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Username Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Username</h3>
        <p className="text-sm text-muted-foreground">
          Your public identifier and profile URL.
        </p>
        <Input
          value="Egcu095eleVW8b5INMTyc9DrG342"
          readOnly
          className="bg-muted/50"
        />
      </div>
    </div>
  );
}

function PlansCreditsContent() {
  const usageData = [
    {
      icon: <Zap className="h-4 w-4 text-primary" />,
      label: "Credits",
      used: 847,
      limit: 1000,
      color: "bg-primary/10",
    },
    {
      icon: <HardDrive className="h-4 w-4 text-accent-foreground" />,
      label: "Storage",
      used: 2.4,
      limit: 5,
      unit: " GB",
      color: "bg-accent/10",
    },
    {
      icon: <Database className="h-4 w-4 text-blue-500" />,
      label: "API Calls",
      used: 45200,
      limit: 100000,
      color: "bg-blue-500/10",
    },
    {
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      label: "AI Tokens",
      used: 125000,
      limit: 500000,
      color: "bg-amber-500/10",
    },
    {
      icon: <User className="h-4 w-4 text-green-500" />,
      label: "Team Members",
      used: 4,
      limit: 10,
      color: "bg-green-500/10",
    },
    {
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
      label: "Messages",
      used: 1250,
      limit: "unlimited" as const,
      color: "bg-secondary",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Plans & credits</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subscription and monitor resource usage.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Current plan</h3>
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <StatItem label="Plan" value="Pro" />
          <StatItem label="Billing cycle" value="Monthly" />
          <StatItem label="Next billing" value="Feb 15, 2024" />
          <StatItem label="Amount" value="$29/month" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Resource usage</h3>
        <div className="bg-muted/50 rounded-lg p-4">
          {usageData.map((item) => (
            <UsageRow
              key={item.label}
              icon={item.icon}
              label={item.label}
              used={item.used}
              limit={item.limit}
              unit={item.unit}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h4 className="font-medium">Need more resources?</h4>
            <p className="text-sm text-muted-foreground">
              Upgrade your plan to unlock higher limits.
            </p>
          </div>
          <Button>Upgrade Plan</Button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeItem, setActiveItem] = useState<string>("account");

  const renderContent = () => {
    switch (activeItem) {
      case "plans":
        return <PlansCreditsContent />;
      case "account":
        return (
          <React.Fragment>
            <ContentHeader
              title="Account settings"
              description="Personalize how others see and interact with you."
            />
            <Separator className="my-3" />
            <AccountSettingsWrapper />
          </React.Fragment>
        );
      default:
        return <AccountSettingsContent />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-0 h-[85vh] max-h-[85vh] gap-0 overflow-hidden border-border flex flex-col">
        <div className="flex flex-1 min-h-0">
          {/* Sidebar - independently scrollable */}
          <div className="w-60 bg-card/50 border-r border-border flex-shrink-0 h-full overflow-hidden">
            <ScrollArea className="h-full">
              <div className="py-3 space-y-3">
                {menuSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground px-3 mb-3">
                      {section.title}
                    </p>
                    <div className="space-y-0.5 px-3">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveItem(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                            activeItem === item.id
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Content - independently scrollable */}
          <div className="flex-1 min-w-0 bg-background h-full overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-3">{renderContent()}</div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ContentHeaderProps {
  title: string;
  description?: string;
}
export const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  description,
}) => (
  <DialogHeader>
    <DialogTitle>{title}</DialogTitle>
    {description && <DialogDescription>{description}</DialogDescription>}
  </DialogHeader>
);
