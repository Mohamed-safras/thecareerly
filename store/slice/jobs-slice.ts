import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import type { JobForm } from "@/types/job-form";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import { JOB_FORM } from "@/constents/local-store-values";

const defaults: JobForm = {
  title: "",
  employmentType: "",
  workPreference: "",
  jobSeniority: "",
  minimumQualificationLevel: "",
  description: "",
  facilities: [],
  location: "",
  salary: { min: "", max: "", currency: "", payPeriod: "" },
  scheduleDate: "",
  aiPrompt: "",
  includeMultimedia: true,
  platforms: [],
  posterVibe: "",
  posterNotes: "",
  questions: [],
  selectionProcess: [],
  skills: [],
};

// Optional: shallow validation/migration to avoid blowing up on old saves
function normalize(input: unknown): JobForm {
  const base = {
    ...defaults,
    ...(typeof input === "object" && input ? input : {}),
  } as JobForm;
  // guard nested objects
  base.salary = { ...defaults.salary, ...(base.salary ?? {}) };
  base.facilities = Array.isArray(base.facilities) ? base.facilities : [];
  base.platforms = Array.isArray(base.platforms) ? base.platforms : [];
  base.questions = Array.isArray(base.questions) ? base.questions : [];
  base.selectionProcess = Array.isArray(base.selectionProcess)
    ? base.selectionProcess
    : defaults.selectionProcess;
  base.skills = Array.isArray(base.skills) ? base.skills : [];
  return base;
}

// Hydrate initial state from localStorage (SSR-safe)
const initialState: JobForm = normalize(
  localStoreGet<JobForm>(JOB_FORM, defaults)
);

const jobFormSlice = createSlice({
  name: "jobForm",
  initialState,
  reducers: {
    // merge partial
    setForm: (state, action: PayloadAction<Partial<JobForm>>) => {
      Object.assign(state, action.payload);
      localStoreGet(JOB_FORM, state);
    },

    // replace entire form
    replaceForm: (_state, action: PayloadAction<JobForm>) => {
      const next = normalize(action.payload);
      localStoreGet(JOB_FORM, next);
      return next;
    },

    // set one field
    setField: <K extends keyof JobForm>(
      state: Draft<JobForm>,
      action: PayloadAction<{ key: K; value: JobForm[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
      localStoreSet(JOB_FORM, state);
    },

    // toggle a platform (used by SchedulePanel)
    togglePlatform: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const has = state.platforms?.includes(key);
      state.platforms = has
        ? state.platforms.filter((k) => k !== key)
        : [...(state.platforms ?? []), key];
      localStoreSet(JOB_FORM, state);
    },
  },
});

export const { setForm, replaceForm, setField, togglePlatform } =
  jobFormSlice.actions;
export default jobFormSlice.reducer;
