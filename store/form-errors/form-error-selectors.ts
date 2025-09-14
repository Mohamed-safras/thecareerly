import { RootState } from "../index";

export const selectFormFieldError =
  (formId: string, path: string) =>
  (state: RootState): string | undefined =>
    state.formErrors.byForm[formId]?.[path];

export const selectFormErrors =
  (formId: string) =>
  (state: RootState): Record<string, string> =>
    state.formErrors.byForm[formId] ?? {};
