import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  ChevronRight,
  Clock,
} from "lucide-react";

import { Job } from "./job-posting-card";

interface JobCardProps {
  job: Job;
  matchCount: number;
  strongMatchCount: number;
  onClick: () => void;
  index?: number;
}

const statusStyles = {
  active: "bg-status-active-bg text-status-active border-status-active/20",
  paused: "bg-status-hold-bg text-status-hold border-status-hold/20",
  closed:
    "bg-status-archived-bg text-status-archived border-status-archived/20",
};

export function JobCard({
  job,
  matchCount,
  strongMatchCount,
  onClick,
}: JobCardProps) {
  return (
    <div>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 overflow-hidden relative"
        onClick={onClick}
      >
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate text-lg group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge
                      variant="outline"
                      className={`${statusStyles[job.status]} text-xs`}
                    >
                      {job.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4 ml-12">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  {job.salary.min} - {job.salary.max} {job.salary.currency} /{" "}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4 ml-12">
                {job.skills.slice(0, 5).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs font-normal transition-all duration-200 hover:bg-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 5 && (
                  <Badge
                    variant="outline"
                    className="text-xs text-muted-foreground"
                  >
                    +{job.skills.length - 5} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 ml-12">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(matchCount, 3))].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-card flex items-center justify-center"
                      >
                        <Users className="h-3 w-3 text-primary" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm">
                    <span className="font-semibold">{matchCount}</span>
                    <span className="text-muted-foreground"> candidates</span>
                  </span>
                </div>
                {strongMatchCount > 0 && (
                  <Badge className="bg-status-active-bg text-status-active border border-status-active/20 hover:bg-status-active/20">
                    ⭐ {strongMatchCount} strong match
                    {strongMatchCount > 1 ? "es" : ""}
                  </Badge>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
