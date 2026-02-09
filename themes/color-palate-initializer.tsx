import { usePalette } from "@/hooks/use-palette"; // <-- NEW: Import the palette hook
import { ReactNode } from "react";

// NEW COMPONENT: Initializes the active color palette based on localStorage
// This must be inside the client component boundary but outside the context providers
// that rely on the DOM/local state setup.
export default function PaletteInitializer({
  children,
}: {
  children: ReactNode;
}) {
  // Calling the hook here ensures the correct palette class is added to the <html> tag
  usePalette();
  return <>{children}</>;
}
