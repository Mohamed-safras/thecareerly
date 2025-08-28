import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import type { JobForm } from "@/types/jobForm";

const initialState: JobForm = {
  title: "",
  employmentType: "",
  workArragement: "",
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
  logoPreview: null,
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

    setLogoPreview: (state, action: PayloadAction<string | null>) => {
      state.logoPreview = action.payload;
    },
  },
});

export const {
  setForm,
  replaceForm,
  setField,
  togglePlatform,
  setLogoPreview,
} = jobFormSlice.actions;

export default jobFormSlice.reducer;
