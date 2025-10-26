import {
  createSlice,
  PayloadAction,
  Draft,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { JobForm } from "@/types/job-form";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import {
  CREATE_JOB_FORM,
  UPDATE_JOB_FORM,
} from "@/constents/local-store-values";
import { Job } from "@/features/jobs/components/job-posting-card";
import { axiosClient, extractMessage } from "@/lib/http/axios-client";
import { RECRUITMENT_SERVICE_ENDPOINTS } from "@/constents/api-end-points";
import { AxiosError } from "axios";
import { getApiTokenWithSession } from "@/server/services/auth/get-api-token.service";

interface JobsState {
  createJobForm: JobForm;
  updateJobForm: JobForm;
  jobs: Job[];
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
  error: string | null;
  initialized: boolean;
  total: number;
  prefetchedPages: number[];
  lastFetchTime: number;
  requestInProgress: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const activeRequests = new Map<string, Promise<any>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (
    {
      page,
      limit = 8,
      prefetch = false,
    }: {
      page: number;
      limit: number;
      prefetch?: boolean;
    },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as { jobs: JobsState };
    const requestKey = `${page}-${limit}`;

    // Check cache first
    const cached = requestCache.get(requestKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return { ...cached.data, fromCache: true };
    }

    // Simple rate limiting
    const timeSinceLastFetch = Date.now() - state.jobs.lastFetchTime;
    if (state.jobs.requestInProgress && timeSinceLastFetch < 500) {
      return rejectWithValue("Request too frequent");
    }

    // Request deduplication
    if (activeRequests.has(requestKey)) {
      return activeRequests.get(requestKey);
    }

    const requestPromise = (async () => {
      const token = await getApiTokenWithSession();
      console.log("page and limit", page, limit);
      try {
        const { data: jobResponse } = await axiosClient.get(
          RECRUITMENT_SERVICE_ENDPOINTS.GET_JOBS,
          {
            params: { page, limit },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched jobs response:", jobResponse);

        const { jobs, hasMore, pagination } = jobResponse.data;

        console.log("Fetched jobs data:", jobs, pagination, hasMore);
        const result = {
          jobs: Array.isArray(jobs) ? jobs : [],
          hasMore,
          page,
          total: pagination?.total || 0,
          prefetch,
        };

        // Cache the result
        requestCache.set(requestKey, {
          data: result,
          timestamp: Date.now(),
        });

        console.log("Jobs fetch result:", result);

        return result;
      } catch (err: unknown) {
        console.log(err);
        const message = (err as Error).message || "Failed to fetch jobs";
        throw new Error(message);
      } finally {
        activeRequests.delete(requestKey);
      }
    })();

    activeRequests.set(requestKey, requestPromise);

    try {
      return await requestPromise;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (
    { formData, token }: { formData: FormData; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        RECRUITMENT_SERVICE_ENDPOINTS.CREATE_JOB,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      requestCache.clear();

      return response.data;
    } catch (err: unknown) {
      console.error(err);
      let message;

      if (err instanceof AxiosError) {
        if (err.code === "ERR_NETWORK") {
          message = "Could not connect to server. Please try again later.";
        } else {
          message =
            extractMessage(err.response?.data, err.response?.status) || message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      return rejectWithValue(message);
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ formData, token }: { formData: FormData; token: string }) => {}
);

const defaultForm: JobForm = {
  title: "",
  employmentType: "",
  department: "",
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

function normalize(input: unknown): JobForm {
  const base = {
    ...defaultForm,
    ...(typeof input === "object" && input ? input : {}),
  } as JobForm;
  base.salary = { ...defaultForm.salary, ...(base.salary ?? {}) };
  base.facilities = Array.isArray(base.facilities) ? base.facilities : [];
  base.platforms = Array.isArray(base.platforms) ? base.platforms : [];
  base.questions = Array.isArray(base.questions) ? base.questions : [];
  base.selectionProcess = Array.isArray(base.selectionProcess)
    ? base.selectionProcess
    : defaultForm.selectionProcess;
  base.skills = Array.isArray(base.skills) ? base.skills : [];
  return base;
}

const createJobFormInitialState: JobForm = normalize(
  localStoreGet<JobForm>(CREATE_JOB_FORM, defaultForm)
);

const updateJobFormInitialState: JobForm = normalize(
  localStoreGet<JobForm>(UPDATE_JOB_FORM, defaultForm)
);

const initialState: JobsState = {
  createJobForm: createJobFormInitialState,
  updateJobForm: updateJobFormInitialState,
  jobs: [],
  loading: false,
  hasMore: true,
  currentPage: 0,
  error: null,
  initialized: false,
  total: 0,
  prefetchedPages: [], // Array instead of Set
  lastFetchTime: 0,
  requestInProgress: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setCreateForm: (state, action: PayloadAction<Partial<JobForm>>) => {
      state.createJobForm = { ...state.createJobForm, ...action.payload };
      localStoreSet(CREATE_JOB_FORM, state.createJobForm);
    },

    setUpdateForm: (state, action: PayloadAction<Partial<JobForm>>) => {
      state.updateJobForm = { ...state.updateJobForm, ...action.payload };
      localStoreSet(CREATE_JOB_FORM, state.updateJobForm);
    },

    replaceCreateForm: (state, action: PayloadAction<JobForm>) => {
      const normalizedForm = normalize(action.payload);
      state.createJobForm = normalizedForm;
      localStoreSet(CREATE_JOB_FORM, normalizedForm);
    },

    replaceUpdateForm: (state, action: PayloadAction<JobForm>) => {
      const normalizedForm = normalize(action.payload);
      state.updateJobForm = normalizedForm;
      localStoreSet(UPDATE_JOB_FORM, normalizedForm);
    },

    setCreateJobFormField: <K extends keyof JobForm>(
      state: Draft<JobsState>,
      action: PayloadAction<{ key: K; value: JobForm[K] }>
    ) => {
      const { key, value } = action.payload;
      (state.createJobForm as JobForm)[key] = value;
      localStoreSet(CREATE_JOB_FORM, state.createJobForm);
    },

    setUpdateJobFormField: <K extends keyof JobForm>(
      state: Draft<JobsState>,
      action: PayloadAction<{ key: K; value: JobForm[K] }>
    ) => {
      const { key, value } = action.payload;
      (state.updateJobForm as JobForm)[key] = value;
      localStoreSet(UPDATE_JOB_FORM, state.updateJobForm);
    },

    toggleCreatePlatform: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const has = state.createJobForm.platforms?.includes(key);
      state.createJobForm.platforms = has
        ? state.createJobForm.platforms.filter((k) => k !== key)
        : [...(state.createJobForm.platforms ?? []), key];
      localStoreSet(CREATE_JOB_FORM, state.createJobForm);
    },

    toggleUpdatePlatform: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const has = state.updateJobForm.platforms?.includes(key);
      state.updateJobForm.platforms = has
        ? state.updateJobForm.platforms.filter((k) => k !== key)
        : [...(state.updateJobForm.platforms ?? []), key];
      localStoreSet(UPDATE_JOB_FORM, state.updateJobForm);
    },

    resetCreateForm: (state) => {
      state.createJobForm = { ...defaultForm };
      localStoreSet(CREATE_JOB_FORM, state.createJobForm);
    },

    resetUpdateForm: (state) => {
      state.updateJobForm = { ...defaultForm };
      localStoreSet(UPDATE_JOB_FORM, state.updateJobForm);
    },

    resetJobs: (state) => {
      state.jobs = [];
      state.currentPage = 0;
      state.hasMore = true;
      state.error = null;
      state.initialized = false;
      state.loading = false;
      state.total = 0;
      state.prefetchedPages = [];
      state.requestInProgress = false;
      // Clear external caches
      requestCache.clear();
      activeRequests.clear();
    },

    clearError: (state) => {
      state.error = null;
    },

    // Add page to prefetched list
    addPrefetchedPage: (state, action: PayloadAction<number>) => {
      const page = action.payload;
      if (!state.prefetchedPages.includes(page)) {
        state.prefetchedPages.push(page);
      }
    },

    // Remove job optimistically
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.requestInProgress = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.requestInProgress = false;

        if (action.payload?.data?.job) {
          const existingIndex = state.jobs.findIndex(
            (job) => job.id === action.payload.data.job.id
          );
          if (existingIndex === -1) {
            state.jobs.unshift(action.payload.data.job);
            state.total = state.total + 1;
          }
        }

        state.createJobForm = { ...defaultForm };
        localStoreSet(CREATE_JOB_FORM, state.createJobForm);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.requestInProgress = false;
      })
      .addCase(fetchJobs.pending, (state, action) => {
        if (!action.meta.arg.prefetch) {
          state.loading = true;
        }
        state.error = null;
        state.requestInProgress = true;
      })
      .addCase(
        fetchJobs.fulfilled,
        (
          state,
          action: PayloadAction<{
            jobs: Job[];
            hasMore: boolean;
            page: number;
            total: number;
            prefetch?: boolean;
            fromCache?: boolean;
          }>
        ) => {
          const { jobs, hasMore, page, total, prefetch, fromCache } =
            action.payload;

          if (fromCache && state.initialized) {
            state.loading = false;
            state.requestInProgress = false;
            return;
          }

          if (page === 1) {
            state.jobs = jobs;
          } else {
            // Use simple duplicate check instead of Set
            const existingIds = state.jobs.map((job) => job.id);
            const newJobs = jobs.filter((job) => !existingIds.includes(job.id));
            state.jobs = [...state.jobs, ...newJobs];
          }

          state.hasMore = hasMore;
          state.currentPage = page;
          state.loading = false;
          state.initialized = true;
          state.total = total;
          state.lastFetchTime = Date.now();
          state.requestInProgress = false;

          // Track prefetched pages using array
          if (prefetch && !state.prefetchedPages.includes(page)) {
            state.prefetchedPages.push(page);
          }
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.initialized = true;
        state.requestInProgress = false;
      });
  },
});

export const {
  setCreateForm,
  setUpdateForm,
  replaceCreateForm,
  replaceUpdateForm,
  setCreateJobFormField,
  setUpdateJobFormField,
  toggleCreatePlatform,
  toggleUpdatePlatform,
  resetCreateForm,
  resetUpdateForm,
  resetJobs,
  clearError,
  addPrefetchedPage,
  removeJob,
} = jobsSlice.actions;

export default jobsSlice.reducer;
