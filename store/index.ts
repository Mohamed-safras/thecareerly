import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "@/store/slice/jobs-slice";
import errorFormReducer from "@/store/slice/form-error-slice";
import authReducer from "@/store/slice/auth-slice";
import userOnboardingReducer from "@/store/slice/user-onboarding-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: userOnboardingReducer,
    jobs: jobsReducer,
    formErrors: errorFormReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
