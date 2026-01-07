import {
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Settings,
  Palette,
  ExternalLink,
  Trash2,
  Copy,
  Clipboard,
  Code,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface BuilderToolbarProps {
  zoom: number;
  previewMode: boolean;
  deviceMode: "desktop" | "tablet" | "mobile";
  canUndo: boolean;
  canRedo: boolean;
  hasClipboard: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onTogglePreview: () => void;
  onDeviceChange: (mode: "desktop" | "tablet" | "mobile") => void;
  onOpenSettings: () => void;
  onClearCanvas: () => void;
  onPaste: () => void;
}

export function BuilderToolbar({
  zoom,
  previewMode,
  deviceMode,
  canUndo,
  canRedo,
  hasClipboard,
  onZoomIn,
  onZoomOut,
  onUndo,
  onRedo,
  onTogglePreview,
  onDeviceChange,
  onOpenSettings,
  onClearCanvas,
  onPaste,
}: BuilderToolbarProps) {
  return (
    <div className="h-14 border-b bg-card flex items-center justify-between px-4">
      {/* Left: Logo & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Palette className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">Site Builder</span>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onUndo}
                disabled={!canUndo}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRedo}
                disabled={!canRedo}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPaste}
                disabled={!hasClipboard}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Paste (Ctrl+V)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearCanvas}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Canvas</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Center: Device Preview */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={deviceMode === "desktop" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onDeviceChange("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Desktop (1280px)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={deviceMode === "tablet" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onDeviceChange("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Tablet (768px)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={deviceMode === "mobile" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onDeviceChange("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mobile (375px)</TooltipContent>
        </Tooltip>
      </div>

      {/* Right: Zoom, Preview, Save */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onZoomOut}
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onZoomIn}
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={previewMode ? "secondary" : "ghost"}
              size="icon"
              onClick={onTogglePreview}
            >
              {previewMode ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {previewMode ? "Exit Preview" : "Preview"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onOpenSettings}>
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Site Settings</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Publish
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export HTML
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ExternalLink className="h-4 w-4 mr-2" />
              Publish Site
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
