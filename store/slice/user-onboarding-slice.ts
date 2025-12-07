// src/store/slices/userFormSlice.ts

import { RolePermissionsMap } from "@/constents/user-actions";
import { Roles } from "@/lib/role";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --- TYPE DEFINITIONS ---
interface BasicInfoState {
  fullName: string;
  email: string;
  phone: string;
}

interface RoleInfoState {
  role: Roles;
  permissions: RolePermissionsMap;
}

interface OnboardingInfoState {
  sendInviteEmail: boolean;
  inviteExpiry: string;
  userActiveSheduleDate: string | null;
  activationMethod: "schedule_date" | "immediately";
  resetPasswordRequired: boolean;
  enable2FA: boolean;
}

export interface UserFormState {
  basicInfo: BasicInfoState;
  roleInfo: RoleInfoState;
  onboardingInfo: OnboardingInfoState;
}

export const DEFAULT_PERMISSIONS_MAP: Record<Roles, RolePermissionsMap> = {
  [Roles.ORGANIZATION_ADMIN]: {
    CANDIDATE: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    JOB_POSTING: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    INTERVIEW_SCHEDULE: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    REPORT: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    USER_MANAGEMENT: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
  },
  [Roles.RECRUITER]: {
    CANDIDATE: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
    },
    JOB_POSTING: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
    },
    INTERVIEW_SCHEDULE: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    },
    REPORT: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    USER_MANAGEMENT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
  [Roles.HIRING_MANAGER]: {
    CANDIDATE: {
      canView: true,
      canCreate: false,
      canEdit: true,
      canDelete: false,
    },
    JOB_POSTING: {
      canView: true,
      canCreate: false,
      canEdit: true,
      canDelete: false,
    },
    INTERVIEW_SCHEDULE: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
    },
    REPORT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    USER_MANAGEMENT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
  [Roles.INTERVIEWER]: {
    CANDIDATE: {
      canView: true,
      canCreate: false,
      canEdit: true,
      canDelete: false,
    },
    JOB_POSTING: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    INTERVIEW_SCHEDULE: {
      canView: true,
      canCreate: false,
      canEdit: true,
      canDelete: false,
    },
    REPORT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    USER_MANAGEMENT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
  [Roles.TEAM_MEMBER]: {
    CANDIDATE: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    JOB_POSTING: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    INTERVIEW_SCHEDULE: {
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    REPORT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    USER_MANAGEMENT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
  [Roles.GUEST]: {
    CANDIDATE: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    JOB_POSTING: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    INTERVIEW_SCHEDULE: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    REPORT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
    USER_MANAGEMENT: {
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    },
  },
};

// --- INITIAL STATE (with mock data for easy review) ---
const initialUserFormState: UserFormState = {
  basicInfo: {
    fullName: "",
    email: "",
    phone: "",
  },
  roleInfo: {
    role: Roles.RECRUITER,
    permissions: DEFAULT_PERMISSIONS_MAP[Roles.RECRUITER],
  },
  onboardingInfo: {
    sendInviteEmail: false,
    inviteExpiry: "",
    userActiveSheduleDate: null,
    activationMethod: "immediately",
    resetPasswordRequired: false,
    enable2FA: false,
  },
};

// --- SLICE DEFINITION ---
export const userOnboardingSlice = createSlice({
  name: "userOnboarding",
  initialState: initialUserFormState,
  reducers: {
    // Data Update Actions
    updateBasicInfo: (
      state,
      action: PayloadAction<Partial<BasicInfoState>>
    ) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    updateRoleInfo: (state, action: PayloadAction<Partial<RoleInfoState>>) => {
      state.roleInfo = { ...state.roleInfo, ...action.payload };
    },
    updateOnboardingInfo: (
      state,
      action: PayloadAction<Partial<OnboardingInfoState>>
    ) => {
      state.onboardingInfo = { ...state.onboardingInfo, ...action.payload };
    },

    // Reset Action
    resetOnboardingForm: () => initialUserFormState,
  },
});

export const {
  updateBasicInfo,
  updateRoleInfo,
  updateOnboardingInfo,
  resetOnboardingForm,
} = userOnboardingSlice.actions;

export default userOnboardingSlice.reducer;
