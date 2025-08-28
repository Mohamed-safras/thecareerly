"use client";

import React, { useEffect, useRef, useState } from "react";
import MarkdownEditor from "@/components/markdowneditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";
import { TabsContent } from "@radix-ui/react-tabs";
import { ImageIcon, Upload, Wand2, XCircle } from "lucide-react";

import { Combobox, type ComboItem } from "@/components/combobox";
import { localStoreGet, localStoreSet } from "@/lib/localstore";
import { slugify } from "@/lib/utils";
import { jobTitleOptions } from "@/assets/jobtitles";
import type { JobForm } from "@/types/jobform";
import { putFile, removeFile } from "@/lib/uploadsVault";

// Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/store/jobFormSlice";
import { setLogoPreview as setLogoPreviewAction } from "@/store/uiSlice";

const LS_KEY = "job_title_options";

const ComposePanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm);
  const logoPreview = useAppSelector((s) => s.ui.logoPreview);

  // local: file input & job title options
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [titleOptions, setTitleOptions] =
    useState<ComboItem[]>(jobTitleOptions);

  // ---- helpers (no function payloads to Redux) ----
  function handleLogoChange(file?: File | null) {
    const f = file ?? null;

    if (f) {
      const id = putFile(f); // keep File outside Redux
      const url = URL.createObjectURL(f); // preview (string)
      dispatch(setFormMerge({ logoFileId: id })); // store only the id
      dispatch(setLogoPreviewAction(url)); // preview string is OK
    } else {
      // remove previous file if any
      removeFile(form.logoFileId);
      dispatch(setFormMerge({ logoFileId: null }));
      dispatch(setLogoPreviewAction(null));
    }
  }

  function onCreate(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;

    // prevent duplicates (case-insensitive by label)
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

  // load titles from localStorage and merge with defaults (stored wins)
  useEffect(() => {
    const stored = localStoreGet<ComboItem[]>(LS_KEY, []);
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

  // persist to localStorage whenever list changes
  useEffect(() => {
    localStoreSet<ComboItem[]>(LS_KEY, titleOptions);
  }, [titleOptions]);

  return (
    <TabsContent value="compose" className="mt-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Job Title via Combobox (search + create + no duplicates) */}
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title</Label>
          <Combobox
            id="job-title"
            items={titleOptions}
            value={
              titleOptions.find((o) => o.label === form.title)?.value ?? null
            }
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
            className="w-full"
            contentClassName="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={form.location}
            onChange={(e) =>
              dispatch(setFormMerge({ location: e.target.value }))
            }
            placeholder="City / Country"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 items-baseline md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="jobtype">Job Type</Label>
          <Select
            value={(form as JobForm & { jobType?: string }).jobType ?? ""}
            onValueChange={(v) =>
              dispatch(setFormMerge({ ...(form as JobForm), jobType: v }))
            }
          >
            <SelectTrigger id="jobtype" className="w-full">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {/* keep original options (including your 'remorte' key if needed) */}
              <SelectItem value="onsite">Onsite</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="remorte">Remort</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="include-multimedia">Include Multimedia</Label>
          <div id="include-multimedia" className="flex items-center gap-2">
            <Switch
              checked={form.includeMultimedia}
              onCheckedChange={(v) =>
                dispatch(setFormMerge({ includeMultimedia: v }))
              }
            />
            <span className="text-sm text-muted-foreground">
              Logos, banners, videos
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="salaryMin">Salary Range (optional)</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              id="salaryMin"
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={form.salaryMin}
              onChange={(e) =>
                dispatch(setFormMerge({ salaryMin: e.target.value }))
              }
            />
            <Input
              id="salaryMax"
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={form.salaryMax}
              onChange={(e) =>
                dispatch(setFormMerge({ salaryMax: e.target.value }))
              }
            />
            <Input
              id="currency"
              placeholder="Currency"
              value={form.currency}
              onChange={(e) =>
                dispatch(setFormMerge({ currency: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-logo">Company Logo</Label>
          <div id="company-logo" className="flex items-center gap-3">
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleLogoChange(e.target.files?.[0])}
            />
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-4 w-4" /> Upload
            </Button>

            {logoPreview ? (
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={logoPreview}
                  alt="logo"
                  className="rounded-full"
                />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground">
                <ImageIcon className="h-5 w-5" />
              </div>
            )}

            {logoPreview && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLogoChange(null)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="relative space-y-2">
        <Label id="description-label" htmlFor="description">
          Description
        </Label>
        <MarkdownEditor
          value={form.description}
          onChange={(v) => dispatch(setFormMerge({ description: v }))}
          classNames="relative"
        />
        <div className="absolute right-8 bottom-16">
          <Button className="w-12 h-12 rounded-full">
            <Wand2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-2" />
    </TabsContent>
  );
};

export default ComposePanel;
