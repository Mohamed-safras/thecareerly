import { AppDispatch } from "@/store"; // adjust
import {
  clearFormErrors,
  setFieldErrors,
} from "@/store/slice/form-error-slice";
import { extractFieldErrors } from "./normalize";

export async function runWithFieldErrors<T>(
  dispatch: AppDispatch,
  formId: string,
  task: () => Promise<T>
): Promise<{ ok: true; data: T } | { ok: false }> {
  dispatch(clearFormErrors({ formId }));

  try {
    const data = await task();
    return { ok: true, data };
  } catch (err) {
    const fieldErrors = extractFieldErrors(err);
    if (fieldErrors) {
      dispatch(setFieldErrors({ formId, errors: fieldErrors }));
      return { ok: false };
    }
    // Non-field error: optionally set a special "root" path or handle elsewhere
    dispatch(
      setFieldErrors({
        formId,
        errors: [
          { path: "root", message: "Request failed. Please try again." },
        ],
      })
    );
    return { ok: false };
  }
}
