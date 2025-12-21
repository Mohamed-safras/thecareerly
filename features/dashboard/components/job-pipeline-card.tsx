import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";

interface JobPipelineCardProps {
  title: string;
  department: string;
  location: string;
  applicants: number;
  stages: {
    name: string;
    count: number;
    color: string;
  }[];
  daysOpen: number;
  isUrgent?: boolean;
}

export function JobPipelineCard({
  title,
  department,
  location,
  applicants,
  stages,
  daysOpen,
  isUrgent,
}: JobPipelineCardProps) {
  const totalInPipeline = stages.reduce((acc, stage) => acc + stage.count, 0);

  return (
    <div className="group rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title.length > 30 ? title.slice(0, 30) + "..." : title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{department}</p>
        </div>

        <Badge variant="secondary" className="font-normal">
          <Users className="h-3 w-3 mr-1" />
          {applicants}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {daysOpen} days open
        </span>
        {isUrgent && (
          <Badge variant="destructive" className="text-xs px-2 py-0">
            Urgent
          </Badge>
        )}
      </div>

      {/* Pipeline visualization */}
      <div className="space-y-3">
        <div className="flex h-2 overflow-hidden rounded-full bg-muted">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className={`${stage.color} transition-all duration-500`}
              style={{ width: `${(stage.count / totalInPipeline) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {stages.map((stage) => (
            <div key={stage.name} className="flex items-center gap-1.5 text-xs">
              <div className={`h-2 w-2 rounded-full ${stage.color}`} />
              <span className="text-muted-foreground">{stage.name}</span>
              <span className="font-medium">{stage.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
