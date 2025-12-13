// store/provider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { useEffect } from "react";
import { hydrateUserFromSession } from "./slice/auth-slice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const auth = store.getState().auth;
    const isUserLoggedIn =
      auth.isAuthenticated && auth.status === "authenticated";

    if (isUserLoggedIn) {
      store.dispatch(hydrateUserFromSession());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
