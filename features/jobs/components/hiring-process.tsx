import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectionProcess } from "@/types/selection-process";
import { SortableRenderApi } from "@/types/sortable-render-api";
import { Copy, GripVertical, MoreHorizontal, Trash2 } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const HiringProcess = ({
  process,
  index,
  onChange,
  onDelete,
  onDuplicate,
  dragHandle,
  isDragging,
}: {
  process: SelectionProcess;
  index: number;
  onChange: (patch: Partial<SelectionProcess>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  dragHandle: SortableRenderApi; // use .attributes & .listeners on the handle button
  isDragging: boolean;
}) => {
  return (
    <div
      className={`rounded-xl border bg-card ${
        isDragging ? "ring-2 ring-primary" : ""
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Drag handle */}
        <button
          type="button"
          className="mt-0 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted cursor-grab active:cursor-grabbing"
          {...dragHandle.attributes}
          {...dragHandle.listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex flex-1  gap-2 justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex  items-start  gap-2 w-full">
              <div className="flex  flex-col gap-2 w-full">
                <Label>Process {index + 1}</Label>
                <Input
                  className="w-full"
                  placeholder="Enter the process name"
                  value={process.name}
                  onChange={(e) =>
                    onChange({ ...process, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Description</Label>
              <Textarea
                className="w-full"
                placeholder="Enter the process name"
                value={process.description}
                onChange={(e) =>
                  onChange({ ...process, description: e.target.value })
                }
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HiringProcess;
