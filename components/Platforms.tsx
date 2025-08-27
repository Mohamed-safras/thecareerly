import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

export const platformMeta: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  linkedin: { label: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
  twitter: { label: "X / Twitter", icon: <Twitter className="h-4 w-4" /> },
  instagram: { label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
  facebook: { label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
};

export interface PlatformsForm {
  platforms: string[];
  togglePlatform: (platform: string) => void;
}

const Platforms: React.FC<PlatformsForm> = ({ platforms, togglePlatform }) => {
  return (
    <div className="space-y-2">
      <Label>Post to Platforms</Label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Object.entries(platformMeta).map(([key, meta]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 hover:bg-accent"
          >
            <Checkbox
              checked={platforms.includes(key)}
              onCheckedChange={() => togglePlatform(key)}
            />
            <span className="flex items-center gap-2 text-sm">
              {meta.icon} {meta.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Platforms;
