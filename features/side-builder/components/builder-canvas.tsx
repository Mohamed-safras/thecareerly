import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BuilderComponent } from "../types/builder";
import { cn } from "@/lib/utils";
import { CanvasComponent } from "./canvas-component";

interface BuilderCanvasProps {
  components: BuilderComponent[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  previewMode: boolean;
  zoom: number;
  deviceMode: "desktop" | "tablet" | "mobile";
  onSelectComponent: (id: string | null) => void;
  onHoverComponent: (id: string | null) => void;
  onDeleteComponent: (id: string) => void;
  onDuplicateComponent: (id: string) => void;
  onCopyComponent: (id: string) => void;
  onReorderComponents: (fromIndex: number, toIndex: number) => void;
  onToggleLock: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onUpdateContent: (
    id: string,
    content: Partial<BuilderComponent["content"]>
  ) => void;
}

const deviceWidths = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function BuilderCanvas({
  components,
  selectedComponentId,
  hoveredComponentId,
  previewMode,
  zoom,
  deviceMode,
  onSelectComponent,
  onHoverComponent,
  onDeleteComponent,
  onDuplicateComponent,
  onCopyComponent,
  onReorderComponents,
  onToggleLock,
  onToggleVisibility,
  onUpdateContent,
}: BuilderCanvasProps) {
  const sortedComponents = [...components]
    .filter((c) => !c.parentId)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 bg-muted/50 overflow-hidden">
      <ScrollArea className="h-full">
        <div
          className="min-h-full p-8 flex justify-center"
          onClick={() => onSelectComponent(null)}
        >
          <div
            className={cn(
              "bg-background shadow-2xl rounded-lg overflow-hidden transition-all mx-auto",
              !previewMode && "ring-1 ring-border"
            )}
            style={{
              width: deviceWidths[deviceMode],
              maxWidth: deviceWidths[deviceMode],
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            {sortedComponents.length === 0 ? (
              <div className="min-h-[600px] flex flex-col items-center justify-center text-muted-foreground p-8">
                <div className="h-20 w-20 rounded-2xl border-2 border-dashed flex items-center justify-center mb-6">
                  <Plus className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Building</h3>
                <p className="text-sm max-w-sm text-center mb-6">
                  Add elements from the left panel to build your page.
                  Double-click text to edit inline.
                </p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-muted rounded">H1</span>
                  <span className="px-2 py-1 bg-muted rounded">Image</span>
                  <span className="px-2 py-1 bg-muted rounded">Button</span>
                  <span className="px-2 py-1 bg-muted rounded">Video</span>
                </div>
              </div>
            ) : (
              <div className="min-h-[600px]">
                {sortedComponents.map((component, index) => (
                  <CanvasComponent
                    key={component.id}
                    component={component}
                    isSelected={component.id === selectedComponentId}
                    isHovered={component.id === hoveredComponentId}
                    isPreviewMode={previewMode}
                    onSelect={() => onSelectComponent(component.id)}
                    onHover={(hovering) =>
                      onHoverComponent(hovering ? component.id : null)
                    }
                    onDelete={() => onDeleteComponent(component.id)}
                    onDuplicate={() => onDuplicateComponent(component.id)}
                    onCopy={() => onCopyComponent(component.id)}
                    onMoveUp={() => onReorderComponents(index, index - 1)}
                    onMoveDown={() => onReorderComponents(index, index + 1)}
                    onToggleLock={() => onToggleLock(component.id)}
                    onToggleVisibility={() => onToggleVisibility(component.id)}
                    onUpdateContent={(content) =>
                      onUpdateContent(component.id, content)
                    }
                    canMoveUp={index > 0}
                    canMoveDown={index < sortedComponents.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
