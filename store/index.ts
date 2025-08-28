import { configureStore } from "@reduxjs/toolkit";
import jobFormReducer from "./jobFormSlice";

export const store = configureStore({
  reducer: {
    jobForm: jobFormReducer,
  },
  // middleware, devTools defaults are fine
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
