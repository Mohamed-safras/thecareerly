import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "parsing" | "complete" | "error";
  progress: number;
  error?: string;
}

interface CVUploadZoneProps {
  onFilesUploaded?: (files: File[]) => void;
}

export function CVUploadZone({ onFilesUploaded }: CVUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (file: File) => {
    const fileId = `file-${Date.now()}-${Math.random()}`;

    setUploadedFiles((prev) => [
      ...prev,
      {
        id: fileId,
        name: file.name,
        size: file.size,
        status: "uploading",
        progress: 0,
      },
    ]);

    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "parsing", progress: 100 } : f
          )
        );

        setTimeout(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, status: "complete" } : f
            )
          );
          toast.success(`${file.name} parsed successfully`);
        }, 1500);
      } else {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      if (files.length === 0) {
        toast.error("Please upload PDF or Word documents only");
        return;
      }

      files.forEach(simulateUpload);
      onFilesUploaded?.(files);
    },
    [onFilesUploaded]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(simulateUpload);
    onFilesUploaded?.(files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Card
          className={`
            relative border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
            ${
              isDragging
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Animated background */}
          <div
            className={`
            absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5
            transition-opacity duration-300
            ${isDragging ? "opacity-100" : "opacity-0"}
          `}
          />

          <label className="block p-10 text-center cursor-pointer relative">
            <motion.div
              animate={{
                y: isDragging ? -5 : 0,
                scale: isDragging ? 1.1 : 1,
              }}
              className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
            >
              <Upload
                className={`h-8 w-8 transition-colors ${
                  isDragging ? "text-primary" : "text-muted-foreground"
                }`}
              />
            </motion.div>
            <div className="mb-4">
              <p className="font-semibold text-lg text-foreground mb-1">
                {isDragging ? "Drop files here" : "Drag and drop CVs here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse • PDF, DOC, DOCX supported
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button variant="outline" className="pointer-events-none">
              Browse Files
            </Button>
          </label>
        </Card>
      </motion.div>

      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      p-3 rounded-xl transition-colors
                      ${
                        file.status === "complete"
                          ? "bg-status-active-bg"
                          : "bg-muted"
                      }
                    `}
                    >
                      <FileText
                        className={`
                        h-5 w-5
                        ${
                          file.status === "complete"
                            ? "text-status-active"
                            : "text-muted-foreground"
                        }
                      `}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          {file.status === "complete" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="p-1 rounded-full bg-status-active-bg"
                            >
                              <CheckCircle2 className="h-4 w-4 text-status-active" />
                            </motion.div>
                          )}
                          {file.status === "error" && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          {(file.status === "uploading" ||
                            file.status === "parsing") && (
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          )}
                          <button
                            className="p-1 rounded-full hover:bg-muted transition-colors"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        {file.status === "uploading" && (
                          <span className="text-primary font-medium">
                            Uploading...
                          </span>
                        )}
                        {file.status === "parsing" && (
                          <span className="text-primary font-medium">
                            Parsing CV...
                          </span>
                        )}
                        {file.status === "complete" && (
                          <span className="text-status-active font-medium">
                            Ready for matching
                          </span>
                        )}
                      </div>
                      {(file.status === "uploading" ||
                        file.status === "parsing") && (
                        <div className="mt-2">
                          <Progress value={file.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
