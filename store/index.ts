import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "@/store/slice/jobs-slice";
import errorFormReducer from "@/store/slice/form-error-slice";
import userReducer from "@/store/slice/user-slice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobsReducer,
    formErrors: errorFormReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
