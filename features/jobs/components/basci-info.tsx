"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { replaceForm, setForm as setFormMerge } from "@/store/slice/jobs-slice";
import { employmentTypeValue } from "@/types/employment";
import { workPreferenceTypeValue } from "@/types/work-arrangments";
import { AlertCircle } from "lucide-react";
import { jobSeniorityTypeValue } from "@/types/job-seiority";
import { qualificationLevelTypeValue } from "@/types/qulification-level";
import CheckboxGroup from "@/components/check-box-group";
import {
  CURRENCY_OPTIONS,
  EMPLOYMENT_TYPES,
  FACILITY_OPTIONS,
  JOB_SENIORITY,
  PAY_PERIOD,
  QUALIFICATION_LEVEL,
  WORK_PREFERENCE,
} from "@/constents/basic-info-options";
import { Separator } from "@/components/ui/separator";
import { payPeriodTypeValue } from "@/types/pay-period";
import { currencyOptionTypeValue } from "@/types/currency-option";
import TypeaheadLocation from "@/components/type-ahead-location";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setFieldError } from "@/store/slice/form-error-slice";
import type { JobForm } from "@/types/job-form";
import { JOB_FORM, JOB_TITLE_OPTIONS } from "@/constents/local-store-values";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FORM_ID } from "@/constents/job-form";

const BasicInfo: React.FC = () => {
  const [titleOptions, setTitleOptions] = useState<ComboItem[]>([]);
  const [titlesHydrated, setTitlesHydrated] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const jobForm = useAppSelector(({ jobForm }) => jobForm);
  const { byForm } = useAppSelector(({ formErrors }) => formErrors);

  const {
    title,
    employmentType,
    workPreference,
    jobSeniority,
    facilities,
    minimumQualificationLevel,
    location,
    salary: { min, max, currency, payPeriod },
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
      (option) => option.label.toLowerCase().trim() === trimmed.toLowerCase()
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
    const stored = localStoreGet<JobForm>(JOB_FORM, jobForm);
    dispatch(replaceForm(stored));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStoreSet<JobForm>(JOB_FORM, {
      ...jobForm,
      title,
      employmentType,
      workPreference,
      jobSeniority,
      facilities,
      minimumQualificationLevel,
      location,
      salary: { min, max, currency, payPeriod },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hydrated,
    title,
    employmentType,
    workPreference,
    jobSeniority,
    facilities,
    minimumQualificationLevel,
    location,
    min,
    max,
    currency,
    payPeriod,
  ]);

  const selectedTitleValue = useMemo(
    () => titleOptions.find((o) => o.label === title)?.value ?? null,
    [titleOptions, title]
  );

  return (
    <ScrollArea className="max-h-[600px] overflow-y-scroll ">
      <div className="space-y-4 rounded border p-4">
        <h2 className="text-lg font-semibold">Basic Infomation</h2>
        <Separator />

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* title */}
            <div className="space-y-1.5">
              <Label htmlFor="job-title">Job Title</Label>
              <Combobox
                id="job-title"
                items={titleOptions}
                value={selectedTitleValue}
                onChange={(_, item) => {
                  const nextTitle = item?.label ?? "";
                  dispatch(setFormMerge({ title: nextTitle }));
                }}
                allowCreate
                onCreate={onCreate}
                placeholder="Select title..."
                inputPlaceholder="Search titles..."
                emptyMessage="No matching titles."
                createPrefix="Create"
                matchTriggerWidth
                className={`w-full`}
                contentClassName="w-full"
              />
              {byForm?.createJob?.title && (
                <Alert variant="destructive" className="h-fit text-sm p-2">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.createJob?.title}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <TypeaheadLocation
              value={location}
              onChange={(v) => dispatch(setFormMerge({ location: v }))}
              fieldError={byForm?.createJob?.location}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 items-baseline md:grid-cols-2">
            {/* work preference */}
            <div className="space-y-1.5">
              <Label htmlFor="work-preference">Work Preference</Label>
              <Select
                value={workPreference as workPreferenceTypeValue | undefined}
                onValueChange={(v) =>
                  dispatch(
                    setFormMerge({
                      workPreference: v as workPreferenceTypeValue,
                    })
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
              {byForm?.createJob?.workPreference && (
                <Alert variant="destructive" className="h-fit text-sm p-2">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.createJob?.workPreference}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* employmenet type */}
            <div className="space-y-1.5">
              <Label htmlFor="employment-type">Employment Type</Label>
              <Select
                value={employmentType as employmentTypeValue | undefined}
                onValueChange={(v) =>
                  dispatch(
                    setFormMerge({ employmentType: v as employmentTypeValue })
                  )
                }
              >
                <SelectTrigger id="employment-type" className="w-full">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.createJob?.employementType && (
                <Alert variant="destructive" className="h-fit text-sm p-2">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.createJob?.employementType}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 items-baseline md:grid-cols-2">
            {/* job seiority */}
            <div className="space-y-1.5">
              <Label htmlFor="job-seiority">Job Seiority</Label>
              <Select
                value={jobSeniority as jobSeniorityTypeValue | undefined}
                onValueChange={(v) =>
                  dispatch(
                    setFormMerge({ jobSeniority: v as jobSeniorityTypeValue })
                  )
                }
              >
                <SelectTrigger id="job-seiority" className="w-full">
                  <SelectValue placeholder="Select job seiority..." />
                </SelectTrigger>
                <SelectContent>
                  {JOB_SENIORITY?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.createJob?.jobSeniority && (
                <Alert variant="destructive" className="h-fit text-sm p-2">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.createJob?.jobSeniority}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* qualification level */}
            <div className="space-y-1.5">
              <Label htmlFor="qualification-level">
                Minimum Qualification Level
              </Label>
              <Select
                value={
                  minimumQualificationLevel as
                    | qualificationLevelTypeValue
                    | undefined
                }
                onValueChange={(v) =>
                  dispatch(
                    setFormMerge({
                      minimumQualificationLevel:
                        v as qualificationLevelTypeValue,
                    })
                  )
                }
              >
                <SelectTrigger id="qualification-level" className="w-full">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {QUALIFICATION_LEVEL.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {byForm?.createJob?.minimumQualificationLevel && (
                <Alert variant="destructive" className="h-fit text-sm p-2">
                  <AlertCircle className="h-4 w-4" />

                  <AlertDescription>
                    {byForm?.createJob?.minimumQualificationLevel}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <p className="text-sm font-semibold">Salary & Facilites</p>
          <Separator />

          {/* salary */}
          <div className="grid grid-cols-1">
            <div className="space-y-1.5 md:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        })
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
                    onValueChange={(v) =>
                      dispatch(
                        setFormMerge({
                          salary: {
                            ...jobForm.salary,
                            payPeriod: v as payPeriodTypeValue,
                          },
                        })
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
                    onChange={(e) =>
                      dispatch(
                        setFormMerge({
                          salary: { ...jobForm.salary, min: e.target.value },
                        })
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
                    onChange={(e) =>
                      dispatch(
                        setFormMerge({
                          salary: { ...jobForm.salary, max: e.target.value },
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* facilites */}
          <fieldset className="space-y-1.5 md:col-span-2 mt-4" id="facilities">
            <legend className="text-sm font-medium">Facilities</legend>

            <CheckboxGroup
              options={FACILITY_OPTIONS}
              value={facilities ?? []}
              onChange={(next) => dispatch(setFormMerge({ facilities: next }))}
              columns={2}
            />
          </fieldset>
        </div>
      </div>
    </ScrollArea>
  );
};

export default BasicInfo;
