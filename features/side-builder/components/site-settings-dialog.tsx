import { Settings, Globe, Palette, Type } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteSettings } from "../types/builder";

interface SiteSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: SiteSettings;
  onUpdateSettings: (settings: Partial<SiteSettings>) => void;
}

const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Poppins", label: "Poppins" },
  { value: "Playfair Display", label: "Playfair Display" },
];

export function SiteSettingsDialog({
  open,
  onOpenChange,
  settings,
  onUpdateSettings,
}: SiteSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Site Settings
          </DialogTitle>
          <DialogDescription>
            Configure your career site&apos;s global settings and branding.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1 gap-2">
              <Globe className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex-1 gap-2">
              <Palette className="h-4 w-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1 gap-2">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input
                value={settings.siteName}
                onChange={(e) => onUpdateSettings({ siteName: e.target.value })}
                placeholder="My Career Site"
              />
            </div>

            <div className="space-y-2">
              <Label>Header Style</Label>
              <Select
                value={settings.headerStyle}
                onValueChange={(value: "fixed" | "static") =>
                  onUpdateSettings({ headerStyle: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed (Sticky)</SelectItem>
                  <SelectItem value="static">Static</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Footer</Label>
                <p className="text-sm text-muted-foreground">
                  Show footer section on your site
                </p>
              </div>
              <Switch
                checked={settings.footerEnabled}
                onCheckedChange={(checked) =>
                  onUpdateSettings({ footerEnabled: checked })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  value={settings.logo || ""}
                  onChange={(e) => onUpdateSettings({ logo: e.target.value })}
                  placeholder="https://..."
                />
                {settings.logo && (
                  <img
                    src={settings.logo}
                    alt="Logo preview"
                    className="h-12 object-contain"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Favicon URL</Label>
                <Input
                  value={settings.favicon || ""}
                  onChange={(e) =>
                    onUpdateSettings({ favicon: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) =>
                      onUpdateSettings({ primaryColor: e.target.value })
                    }
                    placeholder="hsl(var(--primary))"
                    className="flex-1"
                  />
                  <div
                    className="h-10 w-10 rounded-md border"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    value={settings.secondaryColor}
                    onChange={(e) =>
                      onUpdateSettings({ secondaryColor: e.target.value })
                    }
                    placeholder="hsl(var(--secondary))"
                    className="flex-1"
                  />
                  <div
                    className="h-10 w-10 rounded-md border"
                    style={{ backgroundColor: settings.secondaryColor }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select
                value={settings.fontFamily}
                onValueChange={(value) =>
                  onUpdateSettings({ fontFamily: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>
                        {font.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-2">Preview</p>
              <div style={{ fontFamily: settings.fontFamily }}>
                <h3 className="text-2xl font-bold mb-1">Heading Text</h3>
                <p className="text-base">
                  This is how your body text will look.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
