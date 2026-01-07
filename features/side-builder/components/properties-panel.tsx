import { useState } from "react";
import {
  Type,
  Palette,
  Layout,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Plus,
  Trash2,
  Sparkles,
  Box,
  Move,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BuilderComponent,
  ComponentStyles,
  ComponentContent,
  AnimationType,
  HeadingLevel,
  ButtonVariant,
} from "../types/builder";
import { cn } from "@/lib/utils";

interface PropertiesPanelProps {
  component: BuilderComponent | null;
  onUpdateStyles: (id: string, styles: Partial<ComponentStyles>) => void;
  onUpdateContent: (id: string, content: Partial<ComponentContent>) => void;
}

const colorPresets = [
  "transparent",
  "hsl(var(--background))",
  "hsl(var(--foreground))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--muted))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
  "#000000",
  "#ffffff",
];

const animations: { value: AnimationType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fadeIn", label: "Fade In" },
  { value: "fadeUp", label: "Fade Up" },
  { value: "fadeDown", label: "Fade Down" },
  { value: "fadeLeft", label: "Fade Left" },
  { value: "fadeRight", label: "Fade Right" },
  { value: "scaleIn", label: "Scale In" },
  { value: "bounce", label: "Bounce" },
  { value: "pulse", label: "Pulse" },
];

const headingLevels: { value: HeadingLevel; label: string }[] = [
  { value: "h1", label: "H1 - Main Title" },
  { value: "h2", label: "H2 - Section Title" },
  { value: "h3", label: "H3 - Subsection" },
  { value: "h4", label: "H4 - Small Title" },
  { value: "h5", label: "H5 - Minor Title" },
  { value: "h6", label: "H6 - Caption" },
];

const buttonVariants: { value: ButtonVariant; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
];

export function PropertiesPanel({
  component,
  onUpdateStyles,
  onUpdateContent,
}: PropertiesPanelProps) {
  if (!component) {
    return (
      <div className="w-72 border-l bg-card flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Properties
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
          <Layout className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-center text-sm">Select an element to edit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 border-l bg-card flex flex-col h-full">
      <div className="p-3 border-b">
        <h2 className="font-semibold text-sm">{component.name}</h2>
        <p className="text-xs text-muted-foreground">{component.type}</p>
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="mx-3 mt-3 grid grid-cols-3">
          <TabsTrigger value="content" className="text-xs gap-1">
            <Type className="h-3 w-3" />
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="text-xs gap-1">
            <Palette className="h-3 w-3" />
            Style
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs gap-1">
            <Sparkles className="h-3 w-3" />
            Effects
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* Content Tab */}
          <TabsContent value="content" className="p-3 space-y-4 m-0">
            {/* Text Content */}
            {["heading", "paragraph", "text", "link", "button"].includes(
              component.type
            ) && (
              <div className="space-y-3">
                <Label className="text-xs font-medium">Text Content</Label>
                {component.type === "paragraph" ? (
                  <Textarea
                    value={component.content.text || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { text: e.target.value })
                    }
                    placeholder="Enter text..."
                    rows={4}
                    className="text-sm"
                  />
                ) : (
                  <Input
                    value={component.content.text || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { text: e.target.value })
                    }
                    placeholder="Enter text..."
                    className="text-sm"
                  />
                )}
              </div>
            )}

            {/* Heading Level */}
            {component.type === "heading" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Heading Level</Label>
                <Select
                  value={component.content.headingLevel || "h1"}
                  onValueChange={(value: HeadingLevel) =>
                    onUpdateContent(component.id, { headingLevel: value })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {headingLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Link Settings */}
            {["link", "button"].includes(component.type) && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Link URL</Label>
                  <Input
                    value={component.content.href || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { href: e.target.value })
                    }
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Open in new tab</Label>
                  <Switch
                    checked={component.content.target === "_blank"}
                    onCheckedChange={(checked) =>
                      onUpdateContent(component.id, {
                        target: checked ? "_blank" : "_self",
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* Button Variant */}
            {component.type === "button" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Button Style</Label>
                <Select
                  value={component.content.buttonVariant || "primary"}
                  onValueChange={(value: ButtonVariant) =>
                    onUpdateContent(component.id, { buttonVariant: value })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {buttonVariants.map((v) => (
                      <SelectItem key={v.value} value={v.value}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Image Settings */}
            {component.type === "image" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Image URL</Label>
                  <Input
                    value={component.content.src || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { src: e.target.value })
                    }
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Alt Text</Label>
                  <Input
                    value={component.content.alt || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { alt: e.target.value })
                    }
                    placeholder="Image description"
                    className="text-sm"
                  />
                </div>
                {component.content.src && (
                  <img
                    src={component.content.src}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                )}
              </div>
            )}

            {/* Video Settings */}
            {component.type === "video" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Video URL</Label>
                  <Input
                    value={component.content.src || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { src: e.target.value })
                    }
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Poster Image</Label>
                  <Input
                    value={component.content.poster || ""}
                    onChange={(e) =>
                      onUpdateContent(component.id, { poster: e.target.value })
                    }
                    placeholder="https://..."
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Autoplay</Label>
                    <Switch
                      checked={component.content.autoplay || false}
                      onCheckedChange={(checked) =>
                        onUpdateContent(component.id, { autoplay: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Loop</Label>
                    <Switch
                      checked={component.content.loop || false}
                      onCheckedChange={(checked) =>
                        onUpdateContent(component.id, { loop: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Muted</Label>
                    <Switch
                      checked={component.content.muted !== false}
                      onCheckedChange={(checked) =>
                        onUpdateContent(component.id, { muted: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Controls</Label>
                    <Switch
                      checked={component.content.controls !== false}
                      onCheckedChange={(checked) =>
                        onUpdateContent(component.id, { controls: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Icon Settings */}
            {component.type === "icon" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Icon Name</Label>
                  <Input
                    value={component.content.iconName || "Star"}
                    onChange={(e) =>
                      onUpdateContent(component.id, {
                        iconName: e.target.value,
                      })
                    }
                    placeholder="Star, Heart, Zap..."
                    className="text-sm"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Use Lucide icon names (e.g., Star, Heart, Check)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Size: {component.content.iconSize || 24}px
                  </Label>
                  <Slider
                    value={[component.content.iconSize || 24]}
                    onValueChange={([value]) =>
                      onUpdateContent(component.id, { iconSize: value })
                    }
                    max={96}
                    min={12}
                    step={4}
                  />
                </div>
              </div>
            )}

            {/* Spacer Settings */}
            {component.type === "spacer" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Height</Label>
                <Input
                  value={component.content.spacerHeight || "40px"}
                  onChange={(e) =>
                    onUpdateContent(component.id, {
                      spacerHeight: e.target.value,
                    })
                  }
                  placeholder="40px"
                  className="text-sm"
                />
              </div>
            )}

            {/* Columns Settings */}
            {component.type === "columns" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Columns: {component.content.columns || 2}
                  </Label>
                  <Slider
                    value={[component.content.columns || 2]}
                    onValueChange={([value]) =>
                      onUpdateContent(component.id, { columns: value })
                    }
                    max={6}
                    min={2}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Gap</Label>
                  <Input
                    value={component.content.columnGap || "24px"}
                    onChange={(e) =>
                      onUpdateContent(component.id, {
                        columnGap: e.target.value,
                      })
                    }
                    placeholder="24px"
                    className="text-sm"
                  />
                </div>
              </div>
            )}

            {/* List Items */}
            {component.type === "list" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">List Style</Label>
                  <Select
                    value={component.content.listStyle || "disc"}
                    onValueChange={(value: "disc" | "decimal" | "none") =>
                      onUpdateContent(component.id, { listStyle: value })
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disc">Bullet Points</SelectItem>
                      <SelectItem value="decimal">Numbered</SelectItem>
                      <SelectItem value="none">No Bullets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Items</Label>
                  {(component.content.listItems || []).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newItems = [
                            ...(component.content.listItems || []),
                          ];
                          newItems[idx] = e.target.value;
                          onUpdateContent(component.id, {
                            listItems: newItems,
                          });
                        }}
                        className="text-sm flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-destructive"
                        onClick={() => {
                          const newItems = (
                            component.content.listItems || []
                          ).filter((_, i) => i !== idx);
                          onUpdateContent(component.id, {
                            listItems: newItems,
                          });
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const newItems = [
                        ...(component.content.listItems || []),
                        "New item",
                      ];
                      onUpdateContent(component.id, { listItems: newItems });
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </Button>
                </div>
              </div>
            )}

            {/* Embed Code */}
            {component.type === "embed" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Embed Code</Label>
                <Textarea
                  value={component.content.embedCode || ""}
                  onChange={(e) =>
                    onUpdateContent(component.id, { embedCode: e.target.value })
                  }
                  placeholder="<iframe>...</iframe>"
                  rows={6}
                  className="text-xs font-mono"
                />
              </div>
            )}
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style" className="p-3 space-y-4 m-0">
            {/* Typography */}
            {["heading", "paragraph", "text", "link", "button"].includes(
              component.type
            ) && (
              <Accordion
                type="multiple"
                defaultValue={["typography"]}
                className="space-y-2"
              >
                <AccordionItem
                  value="typography"
                  className="border rounded-lg px-3"
                >
                  <AccordionTrigger className="text-xs font-medium py-2">
                    Typography
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-[10px]">Font Size</Label>
                        <Input
                          value={component.styles.fontSize || "16px"}
                          onChange={(e) =>
                            onUpdateStyles(component.id, {
                              fontSize: e.target.value,
                            })
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px]">Font Weight</Label>
                        <Select
                          value={component.styles.fontWeight || "400"}
                          onValueChange={(value) =>
                            onUpdateStyles(component.id, { fontWeight: value })
                          }
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">Light</SelectItem>
                            <SelectItem value="400">Normal</SelectItem>
                            <SelectItem value="500">Medium</SelectItem>
                            <SelectItem value="600">Semibold</SelectItem>
                            <SelectItem value="700">Bold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Text Align</Label>
                      <div className="flex gap-1">
                        {[
                          { value: "left", icon: AlignLeft },
                          { value: "center", icon: AlignCenter },
                          { value: "right", icon: AlignRight },
                          { value: "justify", icon: AlignJustify },
                        ].map(({ value, icon: Icon }) => (
                          <Button
                            key={value}
                            variant={
                              component.styles.textAlign === value
                                ? "secondary"
                                : "outline"
                            }
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              onUpdateStyles(component.id, {
                                textAlign: value as any,
                              })
                            }
                          >
                            <Icon className="h-3 w-3" />
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-[10px]">Line Height</Label>
                        <Input
                          value={component.styles.lineHeight || "1.5"}
                          onChange={(e) =>
                            onUpdateStyles(component.id, {
                              lineHeight: e.target.value,
                            })
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px]">Letter Spacing</Label>
                        <Input
                          value={component.styles.letterSpacing || "0"}
                          onChange={(e) =>
                            onUpdateStyles(component.id, {
                              letterSpacing: e.target.value,
                            })
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Colors */}
            <Accordion
              type="multiple"
              defaultValue={["colors"]}
              className="space-y-2"
            >
              <AccordionItem value="colors" className="border rounded-lg px-3">
                <AccordionTrigger className="text-xs font-medium py-2">
                  Colors
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pb-3">
                  <div className="space-y-2">
                    <Label className="text-[10px]">Background</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {colorPresets.map((color, i) => (
                        <button
                          key={i}
                          className={cn(
                            "h-6 w-6 rounded border-2 transition-all",
                            component.styles.backgroundColor === color
                              ? "border-primary scale-110"
                              : "border-transparent hover:scale-105",
                            color === "transparent" &&
                              "bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]"
                          )}
                          style={{
                            backgroundColor:
                              color === "transparent" ? undefined : color,
                          }}
                          onClick={() =>
                            onUpdateStyles(component.id, {
                              backgroundColor: color,
                            })
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px]">Text Color</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {colorPresets.slice(1).map((color, i) => (
                        <button
                          key={i}
                          className={cn(
                            "h-6 w-6 rounded border-2 transition-all",
                            component.styles.textColor === color
                              ? "border-primary scale-110"
                              : "border-transparent hover:scale-105"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            onUpdateStyles(component.id, { textColor: color })
                          }
                        />
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Spacing */}
            <Accordion type="multiple" className="space-y-2">
              <AccordionItem value="spacing" className="border rounded-lg px-3">
                <AccordionTrigger className="text-xs font-medium py-2">
                  Spacing
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pb-3">
                  <div className="space-y-2">
                    <Label className="text-[10px]">Padding</Label>
                    <div className="grid grid-cols-4 gap-1">
                      {["Top", "Right", "Bottom", "Left"].map((dir) => (
                        <div key={dir} className="space-y-1">
                          <Label className="text-[9px] text-muted-foreground">
                            {dir[0]}
                          </Label>
                          <Input
                            value={
                              (component.styles as any)[`padding${dir}`] ||
                              "0px"
                            }
                            onChange={(e) =>
                              onUpdateStyles(component.id, {
                                [`padding${dir}`]: e.target.value,
                              })
                            }
                            className="h-7 text-xs px-1 text-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px]">Margin</Label>
                    <div className="grid grid-cols-4 gap-1">
                      {["Top", "Right", "Bottom", "Left"].map((dir) => (
                        <div key={dir} className="space-y-1">
                          <Label className="text-[9px] text-muted-foreground">
                            {dir[0]}
                          </Label>
                          <Input
                            value={
                              (component.styles as any)[`margin${dir}`] || "0px"
                            }
                            onChange={(e) =>
                              onUpdateStyles(component.id, {
                                [`margin${dir}`]: e.target.value,
                              })
                            }
                            className="h-7 text-xs px-1 text-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Size & Border */}
            <Accordion type="multiple" className="space-y-2">
              <AccordionItem value="size" className="border rounded-lg px-3">
                <AccordionTrigger className="text-xs font-medium py-2">
                  Size & Border
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Width</Label>
                      <Input
                        value={component.styles.width || "auto"}
                        onChange={(e) =>
                          onUpdateStyles(component.id, {
                            width: e.target.value,
                          })
                        }
                        className="h-8 text-xs"
                        placeholder="100%"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Max Width</Label>
                      <Input
                        value={component.styles.maxWidth || "none"}
                        onChange={(e) =>
                          onUpdateStyles(component.id, {
                            maxWidth: e.target.value,
                          })
                        }
                        className="h-8 text-xs"
                        placeholder="1200px"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px]">Border Radius</Label>
                      <Input
                        value={component.styles.borderRadius || "0px"}
                        onChange={(e) =>
                          onUpdateStyles(component.id, {
                            borderRadius: e.target.value,
                          })
                        }
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px]">Border Width</Label>
                      <Input
                        value={component.styles.borderWidth || "0px"}
                        onChange={(e) =>
                          onUpdateStyles(component.id, {
                            borderWidth: e.target.value,
                          })
                        }
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Effects Tab */}
          <TabsContent value="advanced" className="p-3 space-y-4 m-0">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Animation</Label>
              <Select
                value={component.styles.animation || "none"}
                onValueChange={(value: AnimationType) =>
                  onUpdateStyles(component.id, { animation: value })
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {animations.map((anim) => (
                    <SelectItem key={anim.value} value={anim.value}>
                      {anim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Opacity: {Math.round((component.styles.opacity ?? 1) * 100)}%
              </Label>
              <Slider
                value={[(component.styles.opacity ?? 1) * 100]}
                onValueChange={([value]) =>
                  onUpdateStyles(component.id, { opacity: value / 100 })
                }
                max={100}
                min={0}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Box Shadow</Label>
              <Select
                value={component.styles.boxShadow || "none"}
                onValueChange={(value) =>
                  onUpdateStyles(component.id, { boxShadow: value })
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="0 1px 3px rgba(0,0,0,0.1)">
                    Small
                  </SelectItem>
                  <SelectItem value="0 4px 6px rgba(0,0,0,0.1)">
                    Medium
                  </SelectItem>
                  <SelectItem value="0 10px 15px rgba(0,0,0,0.1)">
                    Large
                  </SelectItem>
                  <SelectItem value="0 20px 25px rgba(0,0,0,0.15)">
                    X-Large
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
