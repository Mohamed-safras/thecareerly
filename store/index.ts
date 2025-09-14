import { configureStore } from "@reduxjs/toolkit";
import jobFormReducer from "@/store/slice/jobs-slice";
import errorFormReducer from "@/store/slice/form-error-slice";
import userReducer from "@/store/slice/user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobForm: jobFormReducer,
    formErrors: errorFormReducer,
  },
  // middleware, devTools defaults are fine
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
