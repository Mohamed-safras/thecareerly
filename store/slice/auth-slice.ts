import { AuthStatus } from "@/types/auth-status";
import { UserProfile } from "@/types/user-profile";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ApiErrorPayload,
  axiosClient,
  extractMessage,
} from "@/lib/axios/axios-client";
import { extractOrganizationData } from "@/utils/organization-utils";

export type AuthState = {
  status: AuthStatus;
  isAuthenticated: boolean;
  user: UserProfile | null;
  error: string | null;
  tokenExpiresAt: number | null;
};

const initialState: AuthState = {
  status: "idle",
  isAuthenticated: false,
  user: null,
  error: null,
  tokenExpiresAt: null,
};

export const registerOrganization = createAsyncThunk(
  "auth/register-organization",
  async (
    {
      organizationName,
      organizationEmail,
      password,
      confirmPassword,
    }: {
      organizationName: string;
      organizationEmail: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue },
  ) => {
    try {
      console.log("Attempting register for:", organizationEmail);

      const response = await axiosClient.post(
        "api/auth/register-organization",
        {
          organizationName,
          organizationEmail,
          password,
          confirmPassword,
        },
      );

      console.log(response);
    } catch (error) {
      console.log("Register error:", error);
      const axiosError = error as AxiosError;
      const message = extractMessage(
        axiosError.response?.data as string | ApiErrorPayload | null,
        axiosError.response?.status,
      );
      return rejectWithValue(message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      console.log("Attempting login for:", email);
      const response = await axiosClient.post("/api/auth/login", {
        email,
        password,
      });

      const userData = response.data?.data?.user;
      const expiresIn = response.data?.data?.expiresIn;

      if (!userData || !userData.id) {
        throw new Error("Invalid response: missing user data");
      }

      return {
        user: userData,
        expiresIn,
      };
    } catch (error) {
      console.log("Login error:", error);
      const axiosError = error as AxiosError;
      const message = extractMessage(
        axiosError.response?.data as string | ApiErrorPayload | null,
        axiosError.response?.status,
      );
      return rejectWithValue(message);
    }
  },
);

// Refresh token and hydrate user
export const hydrateUserFromSession = createAsyncThunk(
  "auth/hydrateFromSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/auth/refresh");

      const userData = response.data?.data?.user;
      const expiresIn = response.data?.data?.expiresIn;

      if (!userData) {
        throw new Error("No user data in refresh response");
      }

      console.log("Hydrated user:", userData);

      return {
        user: userData,
        expiresIn,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = extractMessage(
        axiosError.response?.data as string | ApiErrorPayload | null,
        axiosError.response?.status,
      );
      return rejectWithValue(message);
    }
  },
);

// Logout async thunk
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await axiosClient.post("/api/auth/logout");
    return null;
  } catch (error) {
    console.error("Logout API error:", error);
    return null;
  }
});

// Check auth status (called on app init)
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Try to refresh to verify session
      return await dispatch(hydrateUserFromSession()).unwrap();
    } catch {
      return rejectWithValue("Not authenticated");
    }
  },
);

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
      state.tokenExpiresAt = null;
    },

    setAuthLoading: (state) => {
      state.status = "loading";
    },

    clearError: (state) => {
      state.error = null;
    },

    updateTokenExpiry: (state, action: PayloadAction<number>) => {
      state.tokenExpiresAt = Date.now() + action.payload * 1000;
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
        const { user, expiresIn } = action.payload;
        const orgData = extractOrganizationData(user.organization);

        state.user = {
          id: user.id,
          name: user.name,
          email: user.email || "",
          emailVerified: user.emailVerified,
          avatar: user.image,
          roles: user.roles || [],
          organization: user.organization,
          organizationId: orgData?.id,
          organizationName: orgData?.name,
          teamId: user.teamId,
          phone: user.phone,
        };
        state.isAuthenticated = true;
        state.status = "authenticated";
        state.error = null;

        if (expiresIn) {
          state.tokenExpiresAt = Date.now() + expiresIn * 1000;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.error = action.payload as string;
        state.tokenExpiresAt = null;
      })
      .addCase(hydrateUserFromSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(hydrateUserFromSession.fulfilled, (state, action) => {
        const { user, expiresIn } = action.payload;
        const orgData = extractOrganizationData(user.organization);
        console.log("Hydrated user:", user);
        state.user = {
          id: user.id,
          name: user.name || user.username,
          email: user.email,
          emailVerified: user.emailVerified,
          avatar: user.image,
          roles: user.roles || [],
          organization: user.organization,
          organizationId: orgData?.id,
          organizationName: orgData?.name,
          teamId: user.teamId,
          phone: user.phone,
        };
        state.isAuthenticated = true;
        state.status = "authenticated";
        state.error = null;

        if (expiresIn) {
          state.tokenExpiresAt = Date.now() + expiresIn * 1000;
        }
      })
      .addCase(hydrateUserFromSession.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.tokenExpiresAt = null;
      })

      // Check auth status
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state) => {
        // Already handled by hydrateUserFromSession
        state.status = "authenticated";
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.tokenExpiresAt = null;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.error = null;
        state.tokenExpiresAt = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Clear state even on error
        state.user = null;
        state.isAuthenticated = false;
        state.status = "unauthenticated";
        state.tokenExpiresAt = null;
      });
  },
});

export const {
  setUser,
  clearUser,
  setAuthLoading,
  clearError,
  updateTokenExpiry,
} = authSlice.actions;
export default authSlice.reducer;
