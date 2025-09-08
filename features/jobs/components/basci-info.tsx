"use client";

import React, { useEffect, useState } from "react";

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
import { slugify } from "@/lib/utils";
import { jobTitleOptions } from "@/data/jobtitles";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/features/jobs/jobs-slice";
import { employmentTypeValue } from "@/types/employment";
import { workPreferenceTypeValue } from "@/types/work-arrangments";

import { FormErrors } from "@/types/form-errors";
import { Search } from "lucide-react";
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

const LOCAL_STORE_KEY = "job_title_options";

const BasicInfo: React.FC = () => {
  const [titleOptions, setTitleOptions] =
    useState<ComboItem[]>(jobTitleOptions);

  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm);

  const {
    title,
    employmentType,
    workPreference,
    jobSeniority,
    facilities,
    minimumQualificationLevel,
    location,
    salary: { min, max, currency, payPeriod },
  } = form;

  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  function onCreate(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;

    const existing = titleOptions.find(
      (o) => o.label.toLowerCase().trim() === trimmed.toLowerCase()
    );
    if (existing) {
      dispatch(setFormMerge({ title: existing.label }));
      return existing;
    }

    const newItem: ComboItem = {
      value: slugify(trimmed) || trimmed,
      label: trimmed,
    };
    setTitleOptions((prev) => [...prev, newItem]);
    dispatch(setFormMerge({ title: trimmed }));
    return newItem;
  }

  // load & persist titles (localStorage)
  useEffect(() => {
    const stored = localStoreGet<ComboItem[]>(LOCAL_STORE_KEY, []);
    const safeStored = Array.isArray(stored) ? stored : [];
    const byLabel = new Map<string, ComboItem>();
    for (const it of jobTitleOptions) byLabel.set(it.label.toLowerCase(), it);
    for (const it of safeStored) {
      if (it && typeof it.label === "string" && typeof it.value === "string") {
        byLabel.set(it.label.toLowerCase(), it);
      }
    }
    setTitleOptions(Array.from(byLabel.values()));
  }, []);
  useEffect(() => {
    localStoreSet<ComboItem[]>(LOCAL_STORE_KEY, titleOptions);
  }, [titleOptions]);

  // Auto-apply AI output into Description (replace), with duplicate guard

  const hasError = (k: keyof FormErrors) => Boolean(errors[k]);
  const show = (k: keyof FormErrors) => showErrors && hasError(k);

  return (
    <div className="space-y-4 rounded border p-4">
      <h2>Basic Infomation</h2>
      <Separator />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="job-title">Job Title</Label>
          <Combobox
            id="job-title"
            items={titleOptions}
            value={titleOptions.find((o) => o.label === title)?.value ?? null}
            onChange={(_, item) =>
              dispatch(setFormMerge({ title: item?.label ?? "" }))
            }
            allowCreate
            onCreate={onCreate}
            placeholder="Select title..."
            inputPlaceholder="Search titles..."
            emptyMessage="No matching titles."
            createPrefix="Create"
            matchTriggerWidth
            className={`w-full ${
              show("title")
                ? "border-destructive ring-destructive/20 ring-[3px]"
                : ""
            }`}
            contentClassName="w-full"
          />
          {show("title") && (
            <p id="job-title-error" className="text-xs text-destructive mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <TypeaheadLocation
          value={location}
          onChange={(v) => dispatch(setFormMerge({ location: v }))}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 items-baseline md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="work-preference">Work Preference</Label>
          <Select
            value={workPreference as workPreferenceTypeValue | undefined}
            onValueChange={(v) =>
              dispatch(
                setFormMerge({ workPreference: v as workPreferenceTypeValue })
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
        </div>

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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 items-baseline md:grid-cols-2">
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
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="qualification-level">
            Minimum Qualification level required
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
                  minimumQualificationLevel: v as qualificationLevelTypeValue,
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
        </div>
      </div>

      <h2>Salary & Facilites</h2>
      <Separator />

      <div className="grid grid-cols-1">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="salaryMin">Salary Range (optional)</Label>
          <div className="grid grid-cols-4 gap-2">
            <Select
              value={currency as currencyOptionTypeValue | undefined}
              onValueChange={(v) =>
                dispatch(
                  setFormMerge({
                    salary: {
                      ...form.salary,
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
            <Input
              id="salaryMin"
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={min}
              onChange={(e) =>
                dispatch(
                  setFormMerge({
                    salary: { ...form.salary, min: e.target.value },
                  })
                )
              }
            />
            <Input
              id="salaryMax"
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={max}
              onChange={(e) =>
                dispatch(
                  setFormMerge({
                    salary: { ...form.salary, max: e.target.value },
                  })
                )
              }
            />

            <Select
              value={payPeriod as payPeriodTypeValue | undefined}
              onValueChange={(v) =>
                dispatch(
                  setFormMerge({
                    salary: {
                      ...form.salary,
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
        </div>
      </div>

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
  );
};

export default BasicInfo;
