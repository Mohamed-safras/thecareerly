import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Flame, Briefcase } from "lucide-react";

interface Position {
  title: string;
  department: string;
  location: string;
  applicants: number;
  daysOpen: number;
  priority: "high" | "medium" | "low";
}

interface OpenPositionsProps {
  positions: Position[];
}

const priorityStyles = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-status-hold/10 text-status-hold border-status-hold/20",
  low: "bg-muted text-muted-foreground",
};

export function OpenPositions({ positions }: OpenPositionsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            Open Positions
          </CardTitle>
          <Badge variant="secondary">{positions.length} active</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          View all currently available roles in the organization
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {positions.map((position) => (
          <div
            key={position.title}
            className="p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{position.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {position.department}
                </p>
              </div>
              {position.priority === "high" && (
                <Flame className="h-4 w-4 text-destructive" />
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{position.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{position.applicants} applicants</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{position.daysOpen}d open</span>
              </div>
            </div>

            <div className="mt-2">
              <Badge
                variant="outline"
                className={`text-[10px] ${priorityStyles[position.priority]}`}
              >
                {position.priority} priority
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
