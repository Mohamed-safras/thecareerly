import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings,
  Globe,
  BookOpen,
  Users,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    title: "Project",
    items: [
      {
        id: "settings",
        label: "Project settings",
        icon: <Settings className="h-4 w-4" />,
      },
      { id: "domains", label: "Domains", icon: <Globe className="h-4 w-4" /> },
      {
        id: "knowledge",
        label: "Knowledge",
        icon: <BookOpen className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        id: "workspace",
        label: "Mohamed's Lovable",
        icon: (
          <div className="h-4 w-4 rounded bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
            M
          </div>
        ),
      },
      { id: "people", label: "People", icon: <Users className="h-4 w-4" /> },
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
      { id: "account", label: "Mohamed", icon: <User className="h-4 w-4" /> },
      { id: "labs", label: "Labs", icon: <FlaskConical className="h-4 w-4" /> },
    ],
  },
  {
    title: "Connectors",
    items: [
      {
        id: "connectors",
        label: "Integrations",
        icon: <Link className="h-4 w-4" />,
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
    <div className={cn("space-y-1", className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-base font-medium">{value}</p>
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
  const percentage = isUnlimited ? 0 : (used / limit) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", color)}>{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-right">
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            isNearLimit && !isUnlimited && "text-warning"
          )}
        >
          {used.toLocaleString()}
          {unit}
        </span>
        <span className="text-sm text-muted-foreground">
          {" "}
          / {isUnlimited ? "∞" : `${limit.toLocaleString()}${unit}`}
        </span>
      </div>
    </div>
  );
}

function ProjectSettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Project settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your project details, visibility, and preferences.
        </p>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-3">Overview</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
          <StatItem label="Display name" value="Recruit Flow ✏️" />
          <StatItem label="URL subdomain" value="No URL subdomain" />
          <StatItem
            label="Owner"
            value={<span className="underline">Mohamed</span>}
          />
          <StatItem label="Created at" value="2025-12-31 16:28:53" />
          <StatItem label="Messages count" value="21" />
          <StatItem label="AI edits count" value="17" />
          <StatItem label="Credits used" value="30.00" />
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-base font-semibold mb-2">Project visibility</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Keep your project hidden and prevent others from remixing it.
          </p>
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="h-4 w-4" />
            Workspace
          </Button>
        </div>
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
      icon: <HardDrive className="h-4 w-4 text-accent" />,
      label: "Storage",
      used: 2.4,
      limit: 5,
      unit: " GB",
      color: "bg-accent/10",
    },
    {
      icon: <Database className="h-4 w-4 text-info" />,
      label: "API Calls",
      used: 45200,
      limit: 100000,
      color: "bg-info/10",
    },
    {
      icon: <Sparkles className="h-4 w-4 text-warning" />,
      label: "AI Tokens",
      used: 125000,
      limit: 500000,
      color: "bg-warning/10",
    },
    {
      icon: <Users className="h-4 w-4 text-success" />,
      label: "Team Members",
      used: 4,
      limit: 10,
      color: "bg-success/10",
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
    <div className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold mb-1">Plans & credits</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and monitor resource usage.
        </p>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-4">Current plan</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <StatItem label="Plan" value="Pro" />
          <StatItem label="Billing cycle" value="Jan 5 - Feb 4, 2026" />
          <StatItem label="Next payment" value="$29.00" />
          <StatItem label="Days remaining" value="30" />
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-base font-semibold mb-2">Resource usage</h3>
        <div className="divide-y divide-border">
          {usageData.map((item) => (
            <UsageRow key={item.label} {...item} />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Need more resources?</h3>
            <p className="text-sm text-muted-foreground">
              Upgrade your plan to unlock higher limits.
            </p>
          </div>
          <Button size="sm">Upgrade Plan</Button>
        </div>
      </div>
    </div>
  );
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeItem, setActiveItem] = useState("settings");

  const renderContent = () => {
    switch (activeItem) {
      case "plans":
        return <PlansCreditsContent />;
      default:
        return <ProjectSettingsContent />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-0 max-h-[calc(90vh-3rem)] m-auto overflow-y-auto gap-0">
        <DialogHeader className="p-3 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Settings</h2>
              <p className="text-sm text-muted-foreground">
                Manage your project and account settings
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-56 border-r border-border bg-muted/30 flex-shrink-0">
            <ScrollArea className="h-full py-3">
              <div className="space-y-3 px-3">
                {menuSections.map((section) => (
                  <div key={section.title}>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
                      {section.title}
                    </p>
                    <div className="space-y-0.5">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveItem(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left",
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

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-3">{renderContent()}</div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
