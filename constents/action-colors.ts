import { ACTIONS } from "./actions";
import { USER_STATUS } from "./user-actions";

export const jobStatus = {
  [ACTIONS.OPEN]: "bg-primary",
  [ACTIONS.HOLD]: "bg-amber-500",
  [ACTIONS.CLOSED]: "bg-rose-500",
  [ACTIONS.DRAFT]: "bg-slate-400",
};

export const teamsStatus = {
  [ACTIONS.ACTIVE]: "text-green-500 ",
  [ACTIONS.ARCHIVED]: "text-red-500",
  [ACTIONS.NEW]: "text-blue-500",
  [ACTIONS.HOLD]: "text-yellow-500",
};

export const userStatus = {
  [USER_STATUS.ACTIVE]: "bg-green-500",
  [USER_STATUS.INACTIVE]: "bg-gray-500",
  [USER_STATUS.PENDING]: "bg-yellow-500",
  [USER_STATUS.SUSPENDED]: "bg-red-500",
};
