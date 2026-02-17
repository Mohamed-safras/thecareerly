import { Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { JobTemplate } from "@/interfaces/job";

interface TemplatePreviewDialogProps {
  template: JobTemplate | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export function TemplatePreviewDialog({
  template,
  onClose,
  onSelect,
}: TemplatePreviewDialogProps) {
  return (
    <Dialog open={!!template} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            {template?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label className="text-xs text-muted-foreground">Department</Label>
            <p className="text-sm font-medium">{template?.department}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Description</Label>
            <p className="text-sm">{template?.description}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Tags</Label>
            <div className="flex gap-1.5 mt-1">
              {template?.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">
              Template includes:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Pre-filled job description</li>
              <li>Standard requirements for this role</li>
              <li>Key responsibilities</li>
              <li>Recommended screening questions</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => template && onSelect(template.id)}>
            Use This Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
