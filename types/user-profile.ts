import { UserType } from "./user-type";

export type UserProfile = {
  name?: string | null;
  email?: string | null;
  avatar?: string | Blob | null;
  // add app-specific fields if you load them (e.g., role)
  userType?: UserType;
};
