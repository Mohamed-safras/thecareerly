import { createSelector } from "reselect";
import type { RootState } from "@/store";

export const selectUserAuth = createSelector(
  [
    (state: RootState) => state.auth.user,
    (state: RootState) => state.auth.isAuthenticated,
    (state: RootState) => state.auth.status,
  ],
  (user, isAuthenticated, status) => ({
    user,
    isAuthenticated,
    status,
  })
);
