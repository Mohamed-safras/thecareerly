"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { usePalette, PaletteType } from "@/hooks/use-palette"; // Import PaletteType
import { CircleCheck, PaletteIcon } from "lucide-react"; // Import Check and PaletteIcon
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

import { Separator } from "./ui/separator";

interface ThemePreset {
  id: string;
  name: string;
  palette: PaletteType;
  thumbnail: string; // URL to the image thumbnail
}

// Define your theme presets with explicit primary hex colors
const themePresets: ThemePreset[] = [
  {
    id: "black-white-palette",
    name: "Black & White",
    palette: "black-white-palette",
    thumbnail: "https://placehold.co/100x50/000000/FFFFFF?text=black+white",
  },
  {
    id: "blue-disco",
    name: "Blue Disco",
    palette: "blue-palette",
    thumbnail: "https://placehold.co/100x50/2563EB/FFFFFF?text=blue+disco",
  },
  {
    id: "indigo-powder",
    name: "Indigo Powder",
    palette: "indigo-palette",
    thumbnail: "https://placehold.co/100x50/4F46E5/FFFFFF?text=indigo+powder",
  },
];

export function PaletteSwitcher() {
  const { palette, switchPalette } = usePalette();
  // useTheme is kept only for context, but not for changing the mode

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);

  // State for form inputs (local to this component, for pending changes)
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");

  const [initialSelectedPresetId, setInitialSelectedPresetId] =
    useState<string>("");

  useEffect(() => {
    // 1. Determine current active preset ID and its properties
    const currentPreset = themePresets.find(
      (themePreset) => themePreset.palette === palette
    );
    const currentPresetId = currentPreset?.id || "";
    setSelectedPresetId(currentPresetId);
    setInitialSelectedPresetId(currentPresetId);
  }, [palette]);

  const handleApplyPreset = useCallback(
    (preset: ThemePreset) => {
      setSelectedPresetId(preset.id);
      // ONLY switch the palette, preserving the current light/dark mode
      switchPalette(preset.palette);
    },
    [switchPalette]
  );

  const handleSavePreferences = () => {
    setInitialSelectedPresetId(selectedPresetId);

    setIsOpen(false);
  };

  const handleCancel = () => {
    // 3. Revert the Interface Palette (Mode is preserved)
    const initialPreset = themePresets.find(
      (p) => p.id === initialSelectedPresetId
    );
    if (initialPreset) {
      switchPalette(initialPreset.palette);
    }

    // 4. Reset the visual selection indicator
    setSelectedPresetId(initialSelectedPresetId);

    // 5. Close the dialog
    setIsOpen(false);
    console.log("Changes canceled!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <PaletteIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Appearance Settings</DialogTitle>

          <DialogDescription>
            Customize the color palette of your application.
          </DialogDescription>
        </DialogHeader>

        {/* Interface Palette */}
        <div className="pt-2">
          <Label
            htmlFor="interface-theme"
            className="text-muted-foreground block text-sm mb-2"
          >
            Interface Palette
          </Label>
          <p className="text-xs text-muted-foreground mb-4">
            Select a primary color scheme.
          </p>
          <div
            id="interface-theme"
            className="grid grid-cols-3 gap-3 overflow-x-auto max-h-48 no-scrollbar"
          >
            {themePresets.map((preset) => (
              <div
                key={preset.id}
                className={`group relative cursor-pointer rounded-xl border-2 p-1 transition-all shadow-xs ${
                  selectedPresetId === preset.id ? "border-primary" : "border-1"
                }`}
                onClick={() => handleApplyPreset(preset)}
              >
                <img
                  src={preset.thumbnail}
                  alt={`${preset.name} thumbnail`}
                  className="w-full h-auto rounded-lg object-cover mb-2"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/150x50/202020/64748B?text=Palette";
                  }}
                />
                <div className="text-sm font-medium text-foreground text-center flex items-center justify-center p-1">
                  {preset.name}
                  {selectedPresetId === preset.id && (
                    <span className="ml-2 text-primary">
                      <CircleCheck className="h-4 w-4 fill-primary" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="mt-2 sm:mt-0"
          >
            Cancel
          </Button>
          <Button onClick={handleSavePreferences}>Save preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
