// app/providers.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme-provider";
import { useAppDispatch } from "@/store/hooks";
import { hydrateUserFromSession } from "@/store/slice/user-slice";

function Hydrator({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrateUserFromSession());
  }, [dispatch]);
  return <>{children}</>;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Hydrator>{children}</Hydrator>
        </ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
