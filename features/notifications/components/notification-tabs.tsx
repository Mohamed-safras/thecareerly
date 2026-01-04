import { cn } from "@/lib/utils";

type TabValue = "all" | "unread" | "read";

interface NotificationTabsProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  counts: {
    all: number;
    unread: number;
    read: number;
  };
}

export const NotificationTabs = ({
  activeTab,
  onTabChange,
  counts,
}: NotificationTabsProps) => {
  const tabs: { value: TabValue; label: string }[] = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "read", label: "Read" },
  ];

  return (
    <div className="flex items-center gap-1 border-b">
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onTabChange(value)}
          className={cn(
            "relative px-4 py-3 text-sm font-medium transition-colors",
            activeTab === value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            {label}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                activeTab === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {counts[value]}
            </span>
          </span>
          {activeTab === value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};
