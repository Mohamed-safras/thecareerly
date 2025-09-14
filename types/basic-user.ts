import { UserType } from "@/types/user-type";

export type BasicUser = {
  id: string;
  email: string | null;
  name?: string | null;
  image?: string | null;
  userType?: UserType | null;
};
