"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

const PALETTE_STORAGE_KEY = "app-palette";

export type PaletteType =
  | "black-white-palette"
  | "blue-palette"
  | "indigo-palette"
  | "rose-palette"
  | "red-palette"
  | "claude-palette";

const defaultPalette: PaletteType = "black-white-palette";

const removeClassList = [
  "black-white-palette",
  "blue-palette",
  "indigo-palette",
  "rose-palette",
  "red-palette",
  "claude-palette",
];

export function usePalette() {
  // We don't use the state directly for rendering, only for tracking the current palette.
  const [palette, setPalette] = useState<PaletteType>(defaultPalette);
  // Optional: useTheme can be helpful if you want to force a theme sync, though generally not necessary here.
  const { resolvedTheme } = useTheme();

  // Memoized function to apply the class to the document element
  const applyPaletteClass = useCallback((paletteClass: PaletteType) => {
    const html = document.documentElement;
    // 1. Clean up old palette classes
    html.classList.remove(...removeClassList);

    // 2. Add the new palette class
    html.classList.add(paletteClass);
  }, []);

  useEffect(() => {
    // 3. Initialize on mount from localStorage
    // This runs on mount AND whenever resolvedTheme changes.
    const savedPalette =
      (localStorage.getItem(PALETTE_STORAGE_KEY) as PaletteType) ||
      defaultPalette;
    setPalette(savedPalette);
    applyPaletteClass(savedPalette);
    // Dependency added to rerun initialization logic if the light/dark theme state changes.
  }, [applyPaletteClass, resolvedTheme]); // <-- ADDED resolvedTheme HERE

  const switchPalette = (newPalette: PaletteType) => {
    if (newPalette === palette) return;

    // 4. Update state, storage, and the DOM
    setPalette(newPalette);
    localStorage.setItem(PALETTE_STORAGE_KEY, newPalette);
    applyPaletteClass(newPalette);
  };

  return { palette, switchPalette, defaultPalette };
}
