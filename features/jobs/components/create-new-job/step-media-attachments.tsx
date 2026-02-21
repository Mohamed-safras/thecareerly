import React, { useState, useCallback } from "react";
import {
  Upload,
  X,
  FileImage,
  FileVideo,
  File,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { JobFormData, MediaAttachment } from "@/interfaces/job";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface StepMediaAttachmentsProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (type: string) => {
  if (type.startsWith("image/"))
    return <FileImage className="h-5 w-5 text-primary" />;
  if (type.startsWith("video/"))
    return <FileVideo className="h-5 w-5 text-primary" />;
  return <File className="h-5 w-5 text-muted-foreground" />;
};

const StepMediaAttachments: React.FC<StepMediaAttachmentsProps> = ({
  jobForm,
  setFormMerge,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();

  const simulateUpload = useCallback(
    (file: { name: string; size: number; type: string }) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return;
      }

      const attachment: MediaAttachment = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading",
      };

      const updatedAttachments = [...jobForm.mediaAttachments, attachment];

      dispatch(setFormMerge({ mediaAttachments: updatedAttachments }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30 + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          // onChange("mediaAttachments", (prev: MediaAttachment[]) =>
          //   prev.map((a) =>
          //     a.id === attachment.id
          //       ? { ...a, progress: 100, status: "complete" as const }
          //       : a,
          //   ),
          // );
          // dispatch(setFormMerge({mediaAttachments: [...jobForm.mediaAttachments, jobForm.mediaAttachments.map((a) =>
          //     a.id === attachment.id
          //       ? { ...a, progress: 100, status: "complete" as const }
          //       : a]}))
          // dispatch(setFormMerge({mediaAttachments: }))
        } else {
          // onChange("mediaAttachments", (prev: MediaAttachment[]) =>
          //   prev.map((a) =>
          //     a.id === attachment.id
          //       ? { ...a, progress: Math.min(progress, 99) }
          //       : a,
          //   ),
          // );
        }
      }, 300);
    },
    [jobForm.mediaAttachments, setFormMerge],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      files.forEach((file) =>
        simulateUpload({ name: file.name, size: file.size, type: file.type }),
      );
    },
    [simulateUpload],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) =>
      simulateUpload({ name: f.name, size: f.size, type: f.type }),
    );
    e.target.value = "";
  };

  const removeAttachment = (id: string) => {
    dispatch(
      setFormMerge({
        mediaAttachments: jobForm.mediaAttachments.filter(
          (attachment) => attachment.id !== id,
        ),
      }),
    );
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto border rounded-lg p-3">
      {/* Drop Zone */}
      <div
        className={cn(
          "rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload-input")?.click()}
      >
        <input
          id="file-upload-input"
          type="file"
          className="hidden"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          onChange={handleFileInput}
        />
        <Upload
          className={cn(
            "h-10 w-10 mx-auto mb-3",
            isDragging ? "text-primary" : "text-muted-foreground",
          )}
        />
        <p className="text-sm font-medium">
          {isDragging ? "Drop files here" : "Drag files here or"}
        </p>
        {!isDragging && (
          <Button variant="link" className="text-sm p-0 h-auto mt-1">
            Browse Files
          </Button>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Accepted: JPG, PNG, MP4, PDF, DOC • Max size: 10MB
        </p>
      </div>

      {/* File List */}
      {jobForm.mediaAttachments.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm">
            Uploaded Files ({jobForm.mediaAttachments.length})
          </Label>
          {jobForm.mediaAttachments.map((attachment) => (
            <Card key={attachment.id} className="p-3">
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">
                      {attachment.name}
                    </p>
                    {attachment.status === "complete" && (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    )}
                    {attachment.status === "error" && (
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </span>
                    {attachment.status === "uploading" && (
                      <span className="text-xs text-muted-foreground">
                        {Math.round(attachment.progress)}%
                      </span>
                    )}
                  </div>
                  {attachment.status === "uploading" && (
                    <Progress
                      value={attachment.progress}
                      className="h-1.5 mt-1.5"
                    />
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => removeAttachment(attachment.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepMediaAttachments;
