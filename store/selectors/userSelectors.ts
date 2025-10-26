import { createSelector } from "reselect";
import type { RootState } from "@/store";

export const selectUserAuth = createSelector(
  [
    (state: RootState) => state.user.user,
    (state: RootState) => state.user.isAuthenticated,
    (state: RootState) => state.user.status,
  ],
  (user, isAuthenticated, status) => ({
    user,
    isAuthenticated,
    status,
  })
);
