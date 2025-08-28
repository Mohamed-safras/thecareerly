import { configureStore } from "@reduxjs/toolkit";
import jobFormReducer from "./jobFormSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    jobForm: jobFormReducer,
    ui: uiReducer,
  },
  // middleware, devTools defaults are fine
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
