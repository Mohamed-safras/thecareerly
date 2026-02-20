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
import { AlertCircle, Search } from "lucide-react";
import CheckboxGroup from "@/components/check-box-group";
import {
  CURRENCY_OPTIONS,
  JOB_TYPES,
  EXPRIENCE_LEVEL,
  PAY_PERIOD,
  WORK_PREFERENCE,
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
  experienceLevelValue,
  jobTypeValue,
  payPeriodTypeValue,
  workPreferenceTypeValue,
} from "@/types/job";
import { Switch } from "@/components/ui/switch";

export interface BasicInfoProps {
  jobForm: JobFormData;
  formType: string;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
  replaceForm: ActionCreatorWithPayload<JobFormData>;
  formErrorType: string;
}

const StepJobDetails: React.FC<BasicInfoProps> = ({
  jobForm,
  formType,
  setFormMerge,
  replaceForm,
  formErrorType,
}) => {

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

  return (
    <div className="space-y-6 rounded border p-3 max-h-[600px] overflow-y-scroll">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* title */}
          <div className="space-y-3">
            <Label htmlFor="job-title">Job Title *</Label>
            <Input
                  id="job-title"
                  type="text"
                  placeholder="e.g., Senior Engineer"
                  value={title}
                  onChange={(event) =>
                    dispatch(
                      setFormMerge({
                        title: event.target.value.trim(),
                      }),
                    )
                  }
                />
            {byForm?.[`${formErrorType}_job_details`]?.title && (
              <Alert variant="destructive" className="h-fit text-sm p-3">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  {byForm?.[`${formErrorType}_job_details`]?.title}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* needs to do rate limiting */}
          <TypeaheadLocation
            value={location}
            onChange={(value) => dispatch(setFormMerge({ location: value }))}
            fieldError={byForm?.[`${formErrorType}_job_details`]?.location}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 items-baseline md:grid-cols-2">
          {/* work preference */}
          <div className="space-y-3">
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
            {byForm?.[`${formErrorType}_job_details`]?.workPreference && (
              <Alert variant="destructive" className="h-fit text-sm p-3">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  {byForm?.[`${formErrorType}_job_details`]?.workPreference}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* job type */}
          <div className="space-y-3">
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
            {byForm?.[`${formErrorType}_job_details`]?.employmentType && (
              <Alert variant="destructive" className="h-fit text-sm p-3">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  {byForm?.[`${formErrorType}_job_details`]?.employmentType}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 items-baseline md:grid-cols-2">
          {/* job seiority */}
          <div className="space-y-3">
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
            {byForm?.[`${formErrorType}_job_details`]?.jobSeniority && (
              <Alert variant="destructive" className="h-fit text-sm p-3">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  {byForm?.[`${formErrorType}_job_details`]?.jobSeniority}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* salary */}
        <p className="text-sm font-semibold">Salary Range</p>
        <div className="grid grid-cols-1">
          <div className="space-y-3 md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-3">
                <Label htmlFor="salaryMin">Min</Label>
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

              <div className="space-y-3">
                <Label htmlFor="salaryMax">Max</Label>
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

              <div className="space-y-3">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={currency as currencyOptionTypeValue | undefined}
                  onValueChange={(value) =>
                    dispatch(
                      setFormMerge({
                        salary: {
                          ...jobForm.salary,
                          currency: value as currencyOptionTypeValue,
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

              <div className="space-y-3">
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
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={jobForm.salary.showOnPosting}
                onCheckedChange={(checked) =>
                  dispatch(
                    setFormMerge({
                      salary: { ...jobForm.salary, showOnPosting: checked },
                    }),
                  )
                }
              />
              <Label className="font-normal text-sm">
                Show salary on posting
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="skills">Required Skills</Label>
          <Input
            id="skills"
            placeholder="e.g., React, TypeScript (comma separated)"
            value={jobForm.skills}
            onChange={(event) =>
              dispatch(setFormMerge({ skills: event.target.value.split(",") }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StepJobDetails;
