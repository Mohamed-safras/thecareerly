import { useState } from "react";
import {
  Type,
  AlignLeft,
  Link,
  Image,
  Video,
  Smile,
  Box,
  Layers,
  Columns,
  ArrowUpDown,
  Minus,
  MousePointer,
  FileInput,
  TextCursor,
  Code,
  List,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ComponentType, componentTemplates } from "../types/builder";
import { cn } from "@/lib/utils";

interface ComponentLibraryProps {
  onAddComponent: (type: ComponentType) => void;
}

const iconMap: Record<string, any> = {
  Type,
  AlignLeft,
  Link,
  Image,
  Video,
  Smile,
  Box,
  Layers,
  Columns,
  ArrowUpDown,
  Minus,
  MousePointer,
  FileInput,
  TextCursor,
  Code,
  List,
};

const categories = [
  { id: "typography", name: "Typography", icon: Type },
  { id: "media", name: "Media", icon: Image },
  { id: "layout", name: "Layout", icon: Layers },
  { id: "interactive", name: "Interactive", icon: MousePointer },
  { id: "special", name: "Special", icon: Sparkles },
];

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([
    "typography",
    "layout",
  ]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredTemplates = componentTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  );

  const getTemplatesByCategory = (categoryId: string) => {
    return filteredTemplates.filter((t) => t.category === categoryId);
  };

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-3 border-b space-y-3">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Elements
        </h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search elements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category) => {
            const templates = getTemplatesByCategory(category.id);
            if (templates.length === 0) return null;

            const isOpen = openCategories.includes(category.id);
            const CategoryIcon = category.icon;

            return (
              <Collapsible
                key={category.id}
                open={isOpen}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {templates.length}
                    </span>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="grid grid-cols-2 gap-1.5 p-1 pb-2">
                    {templates.map((template) => {
                      const Icon = iconMap[template.icon] || Box;
                      return (
                        <button
                          key={template.type}
                          onClick={() => onAddComponent(template.type)}
                          className="flex flex-col items-center gap-1.5 p-3 rounded-lg border bg-background hover:bg-accent hover:border-primary/50 transition-all group"
                        >
                          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-xs font-medium text-center leading-tight">
                            {template.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          Click to add elements to your page
        </p>
      </div>
    </div>
  );
}
