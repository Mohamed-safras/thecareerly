// utils/toast.ts
import { toast } from "sonner";

export const showError = (msg: string, description?: string) => {
  toast.error(msg, { description });
};

export const showSuccess = (msg: string, description?: string) => {
  toast.success(msg, { description });
};
