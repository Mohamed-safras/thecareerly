"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { usePalette } from "@/hooks/use-palette"; // <-- NEW: Import the palette hook
import { ReduxProvider } from "@/store/provider";

// NEW COMPONENT: Initializes the active color palette based on localStorage
// This must be inside the client component boundary but outside the context providers
// that rely on the DOM/local state setup.
function PaletteInitializer({ children }: { children: ReactNode }) {
  // Calling the hook here ensures the correct palette class is added to the <html> tag
  usePalette();
  return <>{children}</>;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* NEW: PaletteInitializer wraps the rest of the application */}
      <PaletteInitializer>
        <ReduxProvider>{children}</ReduxProvider>
      </PaletteInitializer>
    </ThemeProvider>
  );
}
