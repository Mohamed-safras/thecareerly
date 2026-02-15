import { Briefcase, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JobTemplate } from "@/interfaces/job";

interface TemplateCardProps {
  template: JobTemplate;
  selected: boolean;
  onSelect: (id: string) => void;
  onPreview: (template: JobTemplate) => void;
}

export function TemplateCard({
  template,
  selected,
  onSelect,
  onPreview,
}: TemplateCardProps) {
  return (
    <Card
      className={cn(
        "p-3 cursor-pointer transition-all hover:shadow-md group",
        selected && "ring-1 ring-primary",
      )}
      onClick={() => onSelect(template.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-lg bg-muted">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-sm">{template.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {template.description}
            </p>
            <Badge variant="outline" className="mt-2 text-[10px]">
              {template.department}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onPreview(template);
          }}
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}
