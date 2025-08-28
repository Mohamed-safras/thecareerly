import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import type { JobForm } from "@/types/jobform";

const initialState: JobForm = {
  title: "",
  jobType: "",
  description: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  currency: "",
  schedule: "",
  aiPrompt: "",
  includeMultimedia: true,
  platforms: [],
  logoFileId: null,
};

const jobFormSlice = createSlice({
  name: "jobForm",
  initialState,
  reducers: {
    // merge partial
    setForm: (state, action: PayloadAction<Partial<JobForm>>) => {
      Object.assign(state, action.payload);
    },

    // replace entire form
    replaceForm: (_state, action: PayloadAction<JobForm>) => action.payload,

    // set one field
    setField: <K extends keyof JobForm>(
      state: Draft<JobForm>,
      action: PayloadAction<{ key: K; value: JobForm[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },

    // toggle a platform (used by SchedulePanel)
    togglePlatform: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const has = state.platforms.includes(key);
      state.platforms = has
        ? state.platforms.filter((k) => k !== key)
        : [...state.platforms, key];
    },
  },
});

export const { setForm, replaceForm, setField, togglePlatform } =
  jobFormSlice.actions;

export default jobFormSlice.reducer;
