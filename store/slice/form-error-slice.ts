import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FieldError,
  FieldPath,
  FormErrorsState,
  FormId,
} from "@/types/form-errors";

const initialState: FormErrorsState = { byForm: {} };

const formErrorsSlice = createSlice({
  name: "formErrors",
  initialState,
  reducers: {
    setFieldError(
      state,
      action: PayloadAction<{
        formId: FormId;
        path: FieldPath;
        message: string;
      }>
    ) {
      const { formId, path, message } = action.payload;
      state.byForm[formId] = state.byForm[formId] ?? {};
      state.byForm[formId][path] = message;
    },
    setFieldErrors(
      state,
      action: PayloadAction<{ formId: FormId; errors: FieldError[] }>
    ) {
      const { formId, errors } = action.payload;
      const bucket: { [key: string]: string } = (state.byForm[formId] = {});
      for (const error of errors) bucket[error?.path] = error.message;
    },
    clearFieldError(
      state,
      action: PayloadAction<{ formId: FormId; path: FieldPath }>
    ) {
      const { formId, path } = action.payload;
      const bucket = state.byForm[formId];
      if (bucket) delete bucket[path];
    },
    clearFormErrors(state, action: PayloadAction<{ formId: FormId }>) {
      delete state.byForm[action.payload.formId];
    },
  },
});

export const {
  setFieldError,
  setFieldErrors,
  clearFieldError,
  clearFormErrors,
} = formErrorsSlice.actions;

export default formErrorsSlice.reducer;
