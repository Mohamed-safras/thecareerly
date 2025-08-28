import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox"; // ← not @radix-ui/react-checkbox
import { Label } from "@/components/ui/label";

export const platformMeta: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  linkedin: { label: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
  twitter: { label: "X / Twitter", icon: <Twitter className="h-4 w-4" /> },
  instagram: { label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
  facebook: { label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
};

export interface PlatformsProps {
  platforms: string[];
  togglePlatform: (platform: string) => void;
}

const Platforms: React.FC<PlatformsProps> = ({ platforms, togglePlatform }) => {
  return (
    <div className="space-y-2">
      <Label>Post to Platforms</Label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Object.entries(platformMeta).map(([key, meta]) => {
          const id = `platform-${key}`;
          const checked = platforms.includes(key);
          return (
            <div
              key={key}
              className="flex items-center gap-2 rounded-xl border p-3 hover:bg-accent"
            >
              <Checkbox
                id={id}
                checked={checked}
                // shadcn/ui Checkbox passes boolean to onCheckedChange
                onCheckedChange={() => togglePlatform(key)}
              />
              <Label
                htmlFor={id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                {meta.icon} {meta.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Platforms;
