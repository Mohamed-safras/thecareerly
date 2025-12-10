"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/store/provider";
import PaletteInitializer from "@/components/color-palate-provider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PaletteInitializer>
        <ReduxProvider>{children}</ReduxProvider>
      </PaletteInitializer>
    </ThemeProvider>
  );
}
