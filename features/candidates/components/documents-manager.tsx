import {
  FileText,
  Download,
  Eye,
  Upload,
  Trash2,
  File,
  FileImage,
  Link2,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Document {
  id: string;
  name: string;
  type: "resume" | "cover_letter" | "portfolio" | "certificate" | "other";
  format: "pdf" | "doc" | "image" | "link";
  size?: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Sarah_Chen_Resume_2024.pdf",
    type: "resume",
    format: "pdf",
    size: "245 KB",
    uploadedAt: "Dec 10, 2024",
    uploadedBy: "Candidate",
    url: "#",
  },
  {
    id: "2",
    name: "Cover_Letter.pdf",
    type: "cover_letter",
    format: "pdf",
    size: "128 KB",
    uploadedAt: "Dec 10, 2024",
    uploadedBy: "Candidate",
    url: "#",
  },
  {
    id: "3",
    name: "Portfolio Website",
    type: "portfolio",
    format: "link",
    uploadedAt: "Dec 10, 2024",
    uploadedBy: "Candidate",
    url: "https://sarahchen.dev",
  },
  {
    id: "4",
    name: "GitHub Profile",
    type: "portfolio",
    format: "link",
    uploadedAt: "Dec 10, 2024",
    uploadedBy: "Candidate",
    url: "https://github.com/sarahchen",
  },
  {
    id: "5",
    name: "AWS_Solutions_Architect_Certificate.pdf",
    type: "certificate",
    format: "pdf",
    size: "1.2 MB",
    uploadedAt: "Dec 12, 2024",
    uploadedBy: "Candidate",
    url: "#",
  },
  {
    id: "6",
    name: "Interview_Notes_Technical.docx",
    type: "other",
    format: "doc",
    size: "45 KB",
    uploadedAt: "Dec 16, 2024",
    uploadedBy: "John Smith",
    url: "#",
  },
];

const typeLabels = {
  resume: { label: "Resume", color: "bg-blue-100 text-blue-700" },
  cover_letter: {
    label: "Cover Letter",
    color: "bg-purple-100 text-purple-700",
  },
  portfolio: { label: "Portfolio", color: "bg-green-100 text-green-700" },
  certificate: { label: "Certificate", color: "bg-yellow-100 text-yellow-700" },
  other: { label: "Other", color: "bg-gray-100 text-gray-700" },
};

const formatIcons = {
  pdf: FileText,
  doc: File,
  image: FileImage,
  link: Link2,
};

export const DocumentsManager = () => {
  const groupedDocs = mockDocuments.reduce((acc, doc) => {
    if (!acc[doc.type]) acc[doc.type] = [];
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Documents</h3>
          <p className="text-sm text-muted-foreground">
            {mockDocuments.length} files attached
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>
              <div className="space-y-2">
                <Label>Or add a link</Label>
                <Input placeholder="https://..." />
              </div>
              <Button className="w-full">Upload Document</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3">
        {mockDocuments
          .filter((d) => d.type === "resume" || d.type === "cover_letter")
          .slice(0, 2)
          .map((doc) => {
            const FormatIcon = formatIcons[doc.format];
            return (
              <div
                key={doc.id}
                className="rounded-lg border bg-card p-3 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FormatIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {typeLabels[doc.type].label}
                    </p>
                    <p className="text-xs text-muted-foreground">{doc.size}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      {/* All Documents */}
      <div className="space-y-4">
        {Object.entries(groupedDocs).map(([type, docs]) => (
          <div key={type} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                className={typeLabels[type as keyof typeof typeLabels].color}
              >
                {typeLabels[type as keyof typeof typeLabels].label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {docs.length} file{docs.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-2">
              {docs.map((doc) => {
                const FormatIcon = formatIcons[doc.format];
                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors group"
                  >
                    <div className="p-2 rounded bg-muted">
                      <FormatIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.size ? `${doc.size} • ` : ""}
                        Uploaded {doc.uploadedAt} by {doc.uploadedBy}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {doc.format === "link" ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
