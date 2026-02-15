import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewQuestion } from "@/interfaces/job";
import { SortableRenderApi } from "@/types/sortable-render-api";
import { Copy, GripVertical, MoreHorizontal, Trash2 } from "lucide-react";

export default function QuestionRow({
  question,
  index,
  onChange,
  onDelete,
  onDuplicate,
  dragHandle,
  isDragging,
}: {
  question: InterviewQuestion;
  index: number;
  onChange: (patch: Partial<InterviewQuestion>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  dragHandle: SortableRenderApi; // use .attributes & .listeners on the handle button
  isDragging: boolean;
}) {
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
          className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted cursor-grab active:cursor-grabbing"
          {...dragHandle.attributes}
          {...dragHandle.listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="grid w-full gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-xs"
              >
                Q{index + 1}
              </Badge>
              <Label className="text-sm font-medium">
                Question {index + 1}
              </Label>
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
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={onDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid gap-3">
            <Input
              value={question.question}
              onChange={(event) => onChange({ question: event.target.value })}
              placeholder="Type your question here…"
            />

            <div className="grid gap-1">
              <Label className="text-xs text-muted-foreground">
                Types of Answers
              </Label>
              <Select
                value={question.type}
                onValueChange={(value: string) => onChange({ type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short Answer</SelectItem>
                  <SelectItem value="multi">Multiple Option</SelectItem>
                  <SelectItem value="yesno">Yes / No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
