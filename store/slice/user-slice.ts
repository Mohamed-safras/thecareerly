import { AuthStatus } from "@/types/auth-status";
import { UserProfile } from "@/types/user-profile";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export type UserState = {
  status: AuthStatus;
  isAuthenticated: boolean;
  user: UserProfile | null;
};

const initialState: UserState = {
  status: "idle",
  isAuthenticated: false,
  user: null,
};

export const hydrateUserFromSession = createAsyncThunk(
  "user/hydrateFromSession",
  async () => {
    const session: Session | null = await getSession();

    return session;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserProfile | null>>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.status = action.payload ? "authenticated" : "unauthenticated";
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "unauthenticated";
    },

    setAuthLoading: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUserFromSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(hydrateUserFromSession.fulfilled, (state, { payload }) => {
        const session = payload;
        if (session?.user) {
          state.user = {
            name: session?.user?.name ?? null,
            email: session?.user?.email ?? null,
            avatar: session?.user?.image ?? null,
            userType: session.user?.userType ?? null,
          };
          state.isAuthenticated = true;
          state.status = "authenticated";
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.status = "unauthenticated";
        }
      })
      .addCase(hydrateUserFromSession.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
      });
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;

// -------- selectors --------
export const selectAuthStatus = (s: { user: UserState }) => s.user.status;
export const selectIsAuthenticated = (s: { user: UserState }) =>
  s.user.isAuthenticated;
export const selectUser = (s: { user: UserState }) => s.user.user;
