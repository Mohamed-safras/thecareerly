import { AuthStatus } from "@/types/auth-status";
import { UserProfile } from "@/types/user-profile";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ApiErrorPayload,
  axiosClient,
  extractMessage,
} from "@/lib/http/axios-client";

export type AuthState = {
  status: AuthStatus;
  isAuthenticated: boolean;
  user: UserProfile | null;
  error: string | null;
};

const initialState: AuthState = {
  status: "idle",
  isAuthenticated: false,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Attempting login for:", email);
      const response = await axiosClient.post("/api/auth/login", {
        email,
        password,
      });

      console.log("Raw response:", response);
      console.log("Response data:", response.data);

      // Store token expiry for display
      if (response.data.expiresIn) {
        localStorage.setItem(
          "token_expires_in",
          response.data.expiresIn.toString()
        );
      }

      return response;
    } catch (error) {
      console.log("Login error:", error);
      const axiosError = error as AxiosError;
      const message = extractMessage(
        axiosError.response?.data as string | ApiErrorPayload | null,
        axiosError.response?.status
      );

      return rejectWithValue(message);
    }
  }
);

// Refresh token and hydrate user
export const hydrateUserFromSession = createAsyncThunk(
  "user/hydrateFromSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/auth/refresh");
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = extractMessage(
        axiosError.response?.data as string | ApiErrorPayload | null,
        axiosError.response?.status
      );
      return rejectWithValue(message);
    }
  }
);

// Logout async thunk
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await axiosClient.post("/api/auth/logout");
    localStorage.removeItem("token_expires_in");
    return null;
  } catch {
    // Still clear local state even if API call fails
    localStorage.removeItem("token_expires_in");
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.status = action.payload ? "authenticated" : "unauthenticated";
      state.error = null;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "unauthenticated";
      state.error = null;
    },

    setAuthLoading: (state) => {
      state.status = "loading";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Get the actual data from the action payload
        const { data } = action.payload;

        console.log("Login fulfilled, processing data:", data);

        // Check if we have user data
        if (!data || !data.data || !data.data.user) {
          console.error("No user data in response:", data);
          state.user = null;
          state.isAuthenticated = false;
          state.status = "unauthenticated";
          state.error = "No user data received from server";
          return;
        }

        const userData = data.data.user;

        console.log("User data:", userData);

        // Check if user has required fields
        if (!userData.id) {
          console.error("User missing id:", userData);
          state.user = null;
          state.isAuthenticated = false;
          state.status = "unauthenticated";
          state.error = "Invalid user data: missing id";
          return;
        }

        // Set user state
        state.user = {
          id: userData.id,
          name: userData.name || userData.username || "",
          email: userData.email || "",
          avatar: userData.image,
          roles: userData.roles || [],
          organizationId: userData.organizationId,
          teamId: userData.teamId,
          teamUsers: userData.teamUsers ?? [],
          organizationUsers: userData.organizationUsers ?? [],
          phone: userData.phone,
        };
        state.isAuthenticated = true;
        state.status = "authenticated";
        state.error = null;

        console.log("User state set successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error("Login rejected:", action.payload);
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.error = action.payload as string;
      })
      .addCase(hydrateUserFromSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(hydrateUserFromSession.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = {
            id: payload.id,
            name: payload.name || payload.username,
            email: payload.email,
            avatar: payload.image,
            roles: payload.roles,
            organizationId: payload.organizationId,
            teamId: payload.teamId,
            teamUsers: payload.teamUsers ?? [],
            organizationUsers: payload.organizationUsers ?? [],
            phone: payload.phone,
          };
          state.isAuthenticated = true;
          state.status = "authenticated";
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.status = "unauthenticated";
        }
        state.error = null;
      })
      .addCase(hydrateUserFromSession.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even on error
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
      });
  },
});

export const { setUser, clearUser, setAuthLoading, clearError } =
  authSlice.actions;
export default authSlice.reducer;
