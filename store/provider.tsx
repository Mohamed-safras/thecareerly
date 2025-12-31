// store/provider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { useEffect } from "react";
import { hydrateUserFromSession } from "./slice/auth-slice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent hydration if user has just logged out
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("hasLoggedOut") === "true"
    ) {
      return;
    }
    store.dispatch(hydrateUserFromSession());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
