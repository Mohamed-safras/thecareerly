import {
  createSlice,
  PayloadAction,
  Draft,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { JobFormData } from "@/interfaces/job";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import { CREATE_JOB_FORM, UPDATE_JOB_FORM } from "@/const/local-store-values";
import { Job } from "@/features/jobs/components/job-posting-card";
import { axiosClient, extractMessage } from "@/lib/axios/axios-client";
import { RECRUITMENT_SERVICE_ENDPOINTS } from "@/const/api-end-points";
import { AxiosError } from "axios";

interface JobsState {
  createJobFormData: JobFormData;
  updateJobFormData: JobFormData;
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
    { rejectWithValue, getState },
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
      const token = "weqwe";
      console.log("page and limit", page, limit);
      try {
        const { data: jobResponse } = await axiosClient.get(
          RECRUITMENT_SERVICE_ENDPOINTS.GET_JOBS,
          {
            params: { page, limit },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
  },
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (
    { formData, token }: { formData: FormData; token: string },
    { rejectWithValue },
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
        },
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
  },
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ formData, token }: { formData: FormData; token: string }) => {},
);

const defaultForm: JobFormData = {
  title: "",
  jobType: "full-time",
  department: "",
  // neeed to change
  workPreference: "",
  experienceLevel: "entry",
  educationLevel: "",
  description: "",
  requirements: "",
  responsibilities: "",
  niceToHave: "",
  benefits: [],
  // need to change
  location: "",
  salary: {
    min: 0,
    max: 0,
    currency: "",
    payPeriod: "monthly",
    showOnPosting: false,
  },
  scheduledDate: "",
  includeMultimedia: false,
  platforms: [],
  posterVibe: "",
  posterNotes: "",
  screeningQuestions: [],
  selectionProcess: [],
  skills: [],
  useTemplate: false,
  certifications: "",
  documentRequirements: {
    resume: false,
    coverLetter: false,
    portfolio: false,
    githubProfile: false,
  },
  complianceChecks: [],
  approvalStatus: "none",
  approvalNotes: "",
  publishToCareerSite: false,
  enableApplicationPortal: false,
  mediaAttachments: [],
  publishChannels: {
    companyWebsite: false,
    internalJobBoard: false,
    employeePortal: false,
  },
};

function normalize(input: unknown): JobFormData {
  const base = {
    ...defaultForm,
    ...(typeof input === "object" && input ? input : {}),
  } as JobFormData;
  base.salary = { ...defaultForm.salary, ...(base.salary ?? {}) };
  base.benefits = Array.isArray(base.benefits) ? base.benefits : [];
  base.platforms = Array.isArray(base.platforms) ? base.platforms : [];
  base.screeningQuestions = Array.isArray(base.screeningQuestions)
    ? base.screeningQuestions
    : [];
  base.selectionProcess = Array.isArray(base.selectionProcess)
    ? base.selectionProcess
    : defaultForm.selectionProcess;
  base.skills = Array.isArray(base.skills) ? base.skills : [];
  return base;
}

const createJobFormDataInitialState: JobFormData = normalize(
  localStoreGet<JobFormData>(CREATE_JOB_FORM, defaultForm),
);

const updateJobFormDataInitialState: JobFormData = normalize(
  localStoreGet<JobFormData>(UPDATE_JOB_FORM, defaultForm),
);

const initialState: JobsState = {
  createJobFormData: createJobFormDataInitialState,
  updateJobFormData: updateJobFormDataInitialState,
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
    setCreateForm: (state, action: PayloadAction<Partial<JobFormData>>) => {
      state.createJobFormData = {
        ...state.createJobFormData,
        ...action.payload,
      };
      localStoreSet(CREATE_JOB_FORM, state.createJobFormData);
    },

    setUpdateForm: (state, action: PayloadAction<Partial<JobFormData>>) => {
      state.updateJobFormData = {
        ...state.updateJobFormData,
        ...action.payload,
      };
      localStoreSet(CREATE_JOB_FORM, state.updateJobFormData);
    },

    replaceCreateForm: (state, action: PayloadAction<JobFormData>) => {
      const normalizedForm = normalize(action.payload);
      state.createJobFormData = normalizedForm;
      localStoreSet(CREATE_JOB_FORM, normalizedForm);
    },

    replaceUpdateForm: (state, action: PayloadAction<JobFormData>) => {
      const normalizedForm = normalize(action.payload);
      state.updateJobFormData = normalizedForm;
      localStoreSet(UPDATE_JOB_FORM, normalizedForm);
    },

    setCreateJobFormDataField: <K extends keyof JobFormData>(
      state: Draft<JobsState>,
      action: PayloadAction<{ key: K; value: JobFormData[K] }>,
    ) => {
      const { key, value } = action.payload;
      (state.createJobFormData as JobFormData)[key] = value;
      localStoreSet(CREATE_JOB_FORM, state.createJobFormData);
    },

    setUpdateJobFormDataField: <K extends keyof JobFormData>(
      state: Draft<JobsState>,
      action: PayloadAction<{ key: K; value: JobFormData[K] }>,
    ) => {
      const { key, value } = action.payload;
      (state.updateJobFormData as JobFormData)[key] = value;
      localStoreSet(UPDATE_JOB_FORM, state.updateJobFormData);
    },

    toggleCreatePlatform: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const has = state.createJobFormData.platforms?.includes(key);
      state.createJobFormData.platforms = has
        ? state.createJobFormData.platforms.filter((k) => k !== key)
        : [...(state.createJobFormData.platforms ?? []), key];
      localStoreSet(CREATE_JOB_FORM, state.createJobFormData);
    },

    toggleUpdatePlatform: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const has = state.updateJobFormData.platforms?.includes(key);
      state.updateJobFormData.platforms = has
        ? state.updateJobFormData.platforms.filter((k) => k !== key)
        : [...(state.updateJobFormData.platforms ?? []), key];
      localStoreSet(UPDATE_JOB_FORM, state.updateJobFormData);
    },

    resetCreateForm: (state) => {
      state.createJobFormData = { ...defaultForm };
      localStoreSet(CREATE_JOB_FORM, state.createJobFormData);
    },

    resetUpdateForm: (state) => {
      state.updateJobFormData = { ...defaultForm };
      localStoreSet(UPDATE_JOB_FORM, state.updateJobFormData);
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
            (job) => job.id === action.payload.data.job.id,
          );
          if (existingIndex === -1) {
            state.jobs.unshift(action.payload.data.job);
            state.total = state.total + 1;
          }
        }

        state.createJobFormData = { ...defaultForm };
        localStoreSet(CREATE_JOB_FORM, state.createJobFormData);
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
          }>,
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
        },
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
  setCreateJobFormDataField,
  setUpdateJobFormDataField,
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
