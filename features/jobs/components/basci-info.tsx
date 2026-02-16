"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox, type ComboItem } from "@/components/combobox";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import { isComboItemArray, slugify } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlertCircle } from "lucide-react";
import CheckboxGroup from "@/components/check-box-group";
import {
  CURRENCY_OPTIONS,
  JOB_TYPES,
  EXPRIENCE_LEVEL,
  PAY_PERIOD,
  WORK_PREFERENCE,
  EDUCATION_LEVEL,
  BENIFITS_OPTIONS,
} from "@/const/basic-job-info-options-value";
import { Separator } from "@/components/ui/separator";
import { currencyOptionTypeValue } from "@/types/currency-option";
import TypeaheadLocation from "@/components/type-ahead-location";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { JobFormData } from "@/interfaces/job";
import { JOB_TITLE_OPTIONS } from "@/const/local-store-values";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  educationLevelTypeValue,
  experienceLevelValue,
  jobTypeValue,
  payPeriodTypeValue,
  workPreferenceTypeValue,
} from "@/types/job";

export interface BasicInfoProps {
  jobForm: JobFormData;
  formType: string;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
  replaceForm: ActionCreatorWithPayload<JobFormData>;
  formErrorType: string;
}

const BasicInfo = ({
  jobForm,
  formType,
  setFormMerge,
  replaceForm,
  formErrorType,
}: BasicInfoProps) => {
  const [titleOptions, setTitleOptions] = useState<ComboItem[]>([]);
  const [titlesHydrated, setTitlesHydrated] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { byForm } = useAppSelector(({ formErrors }) => formErrors);

  const {
    title,
    jobType,
    workPreference,
    experienceLevel,
    benefits,
    educationLevel,
    location,
    salary: { min, max, currency, payPeriod, showOnPosting },
    useTemplate,
  } = jobForm;

  // Load title options once
  useEffect(() => {
    const stored = localStoreGet<unknown>(JOB_TITLE_OPTIONS, []);
    const safeStored = isComboItemArray(stored) ? stored : [];
    setTitleOptions(safeStored);
    setTitlesHydrated(true);
  }, []);

  // Save title options only AFTER they are hydrated
  useEffect(() => {
    if (!titlesHydrated) return;
    localStoreSet<ComboItem[]>(JOB_TITLE_OPTIONS, titleOptions);
  }, [titleOptions, titlesHydrated]);

  function onCreate(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;

    const existing = titleOptions?.find(
      (option) => option.label.toLowerCase().trim() === trimmed.toLowerCase(),
    );

    if (existing) {
      dispatch(setFormMerge({ title: existing.label }));
      return existing;
    }

    const newItem: ComboItem = {
      value: slugify(trimmed) || trimmed,
      label: trimmed,
    };

    setTitleOptions((prev) => {
      const next = [...prev, newItem];
      // Persist immediately (titlesHydrated is true after initial load)
      localStoreSet<ComboItem[]>(JOB_TITLE_OPTIONS, next);
      return next;
    });

    dispatch(setFormMerge({ title: trimmed }));
    return newItem;
  }

  // Form hydration & persistence (unchanged)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const stored = localStoreGet<JobFormData>(formType, jobForm);
    console.log(stored);
    dispatch(replaceForm(stored));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStoreSet<JobFormData>(formType, {
      ...jobForm,
      title,
      jobType,
      workPreference,
      experienceLevel,
      benefits,
      educationLevel,
      location,
      salary: { min, max, currency, payPeriod, showOnPosting },
      useTemplate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hydrated,
    title,
    jobType,
    workPreference,
    experienceLevel,
    benefits,
    experienceLevel,
    location,
    min,
    max,
    currency,
    payPeriod,
    useTemplate,
  ]);

  const selectedTitleValue = useMemo(
    () => titleOptions.find((option) => option.label === title)?.value || title,
    [titleOptions, title],
  );

  console.log(selectedTitleValue);
  return (
    <ScrollArea className="max-h-[600px] overflow-y-scroll ">
      <div className="space-y-3 rounded border p-3">
        <h2 className="text-lg font-semibold">Basic Infomation</h2>
        <Separator />

        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* title */}
            <div className="space-y-1.5">
              <Label htmlFor="job-title">Job Title</Label>
              <Combobox
                id="job-title"
                items={titleOptions}
                value={selectedTitleValue}
                onChange={(_, item) => {
                  const title = item?.label ?? "";
                  dispatch(setFormMerge({ title }));
                }}
                allowCreate
                onCreate={onCreate}
                placeholder="Select title..."
                inputPlaceholder="Search titles..."
                emptyMessage="No matching titles."
                createPrefix="Create"
                matchTriggerWidth
                className={`w-full bg-transparent`}
                contentClassName="w-full"
              />
              {byForm?.[`${formErrorType}_basic_info`]?.title && (
                <Alert variant="destructive" className="h-fit text-sm p-3">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.[`${formErrorType}_basic_info`]?.title}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <TypeaheadLocation
              value={location}
              onChange={(value) => dispatch(setFormMerge({ location: value }))}
              fieldError={byForm?.[`${formErrorType}_basic_info`]?.location}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 items-baseline md:grid-cols-2">
            {/* work preference */}
            <div className="space-y-1.5">
              <Label htmlFor="work-preference">Work Preference</Label>
              <Select
                value={workPreference as workPreferenceTypeValue | undefined}
                onValueChange={(value) =>
                  dispatch(
                    setFormMerge({
                      workPreference: value as workPreferenceTypeValue,
                    }),
                  )
                }
              >
                <SelectTrigger id="work-preference" className="w-full">
                  <SelectValue placeholder="Select work arrangement..." />
                </SelectTrigger>
                <SelectContent>
                  {WORK_PREFERENCE.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.[`${formErrorType}_basic_info`]?.workPreference && (
                <Alert variant="destructive" className="h-fit text-sm p-3">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.[`${formErrorType}_basic_info`]?.workPreference}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* job type */}
            <div className="space-y-1.5">
              <Label htmlFor="job-type">Job Type</Label>
              <Select
                value={jobType as jobTypeValue | undefined}
                onValueChange={(value) =>
                  dispatch(setFormMerge({ jobType: value as jobTypeValue }))
                }
              >
                <SelectTrigger id="job-type" className="w-full">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.[`${formErrorType}_basic_info`]?.employmentType && (
                <Alert variant="destructive" className="h-fit text-sm p-3">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.[`${formErrorType}_basic_info`]?.employmentType}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 items-baseline md:grid-cols-2">
            {/* job seiority */}
            <div className="space-y-1.5">
              <Label htmlFor="job-seiority">Expreience Level</Label>
              <Select
                value={experienceLevel as experienceLevelValue | undefined}
                onValueChange={(value) =>
                  dispatch(
                    setFormMerge({
                      experienceLevel: value as experienceLevelValue,
                    }),
                  )
                }
              >
                <SelectTrigger id="job-seiority" className="w-full">
                  <SelectValue placeholder="Select job seiority..." />
                </SelectTrigger>
                <SelectContent>
                  {EXPRIENCE_LEVEL?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.[`${formErrorType}_basic_info`]?.jobSeniority && (
                <Alert variant="destructive" className="h-fit text-sm p-3">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.[`${formErrorType}_basic_info`]?.jobSeniority}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* qualification level */}
            <div className="space-y-1.5">
              <Label htmlFor="qualification-level">Education Level</Label>
              <Select
                value={educationLevel as educationLevelTypeValue | undefined}
                onValueChange={(value) =>
                  dispatch(
                    setFormMerge({
                      educationLevel: value as educationLevelTypeValue,
                    }),
                  )
                }
              >
                <SelectTrigger id="qualification-level" className="w-full">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVEL.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.[`${formErrorType}_basic_info`]
                ?.minimumQualificationLevel && (
                <Alert variant="destructive" className="h-fit text-sm p-3">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {
                      byForm?.[`${formErrorType}_basic_info`]
                        ?.minimumQualificationLevel
                    }
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <p className="text-sm font-semibold">Salary & Benifits</p>
          <Separator />

          {/* salary */}
          <div className="grid grid-cols-1">
            <div className="space-y-1.5 md:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={currency as currencyOptionTypeValue | undefined}
                    onValueChange={(v) =>
                      dispatch(
                        setFormMerge({
                          salary: {
                            ...jobForm.salary,
                            currency: v as currencyOptionTypeValue,
                          },
                        }),
                      )
                    }
                  >
                    <SelectTrigger id="currency" className="w-full">
                      <SelectValue placeholder="Currency (e.g., USD)" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="payPeriod">Pay Period</Label>
                  <Select
                    value={payPeriod as payPeriodTypeValue | undefined}
                    onValueChange={(value) =>
                      dispatch(
                        setFormMerge({
                          salary: {
                            ...jobForm.salary,
                            payPeriod: value as payPeriodTypeValue,
                          },
                        }),
                      )
                    }
                  >
                    <SelectTrigger id="payPeriod" className="w-full">
                      <SelectValue placeholder="Select pay period..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PAY_PERIOD.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="salaryMin">Salary Min</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    inputMode="numeric"
                    placeholder="Min"
                    value={min}
                    onChange={(event) =>
                      dispatch(
                        setFormMerge({
                          salary: {
                            ...jobForm.salary,
                            min: +event.target.value,
                          },
                        }),
                      )
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="salaryMax">Salary Max</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    inputMode="numeric"
                    placeholder="Max"
                    value={max}
                    onChange={(event) =>
                      dispatch(
                        setFormMerge({
                          salary: {
                            ...jobForm.salary,
                            max: +event.target.value,
                          },
                        }),
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* facilites */}
          <fieldset className="space-y-1.5 md:col-span-2 mt-3" id="facilities">
            <legend className="text-sm font-medium">Benifits</legend>

            <CheckboxGroup
              options={BENIFITS_OPTIONS}
              values={benefits ?? []}
              onChange={(next) => dispatch(setFormMerge({ benefits: next }))}
              columns={2}
            />
          </fieldset>
        </div>
      </div>
    </ScrollArea>
  );
};

export default BasicInfo;
