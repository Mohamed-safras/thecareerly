"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme-provider";
import { useAppDispatch } from "@/store/hooks";
import { hydrateUserFromSession } from "@/store/slice/user-slice";
import { usePalette } from "@/hooks/use-palette"; // <-- NEW: Import the palette hook

// Component to handle Redux hydration
function Hydrator({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateUserFromSession());
  }, [dispatch]);
  return <>{children}</>;
}

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
        <SessionProvider>
          <ReduxProvider store={store}>
            <Hydrator>{children}</Hydrator>
          </ReduxProvider>
        </SessionProvider>
      </PaletteInitializer>
    </ThemeProvider>
  );
}
