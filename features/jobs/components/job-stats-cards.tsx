import { Briefcase, Eye, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobStats {
  total: number;
  published: number;
  draft: number;
  paused: number;
  closed: number;
  totalViews: number;
  totalApplications: number;
}

interface JobStatsCardsProps {
  stats: JobStats;
}

export function JobStatsCards({ stats }: JobStatsCardsProps) {
  const cards = [
    {
      title: "Active Jobs",
      value: stats.published,
      icon: Briefcase,
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
    },
    {
      title: "Total Jobs",
      value: stats.total,
      icon: Users,
    },
  ];

  const statusItems = [
    { label: "Open", count: stats.published, color: "bg-status-active" },
    { label: "Hold", count: stats.paused, color: "bg-status-hold" },
    { label: "Close", count: stats.closed, color: "bg-destructive" },
    { label: "Draft", count: stats.draft, color: "bg-muted-foreground" },
  ];

  return (
    <div className="rounded-lg border bg-card p-3 space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.title} className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.title}</p>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Status Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span className={cn("h-2 w-2 rounded-full", item.color)} />
              <span>{item.label}</span>
              <span className="font-medium text-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
