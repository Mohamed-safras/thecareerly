export type FieldPath = string;
export type FieldError = { path: FieldPath; message: string };
export type FormId = string;

export type FormErrorsState = {
  byForm: Record<FormId, Record<FieldPath, string>>;
};

export type FormErrors = { title?: string; description?: string };
