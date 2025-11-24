// src/components/user/BasicUserInfo.tsx

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mocked imports for Select/Dropdown

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector } from "@/store/hooks";
import { updateBasicInfo } from "@/store/slice/user-onboarding-slice";
import { PhoneInput } from "@/components/phone-input";
// import { FieldError } from "@/types/form-errors";

const BasicInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
  // ... add all other fields
});

type BasicInfoFormValues = z.infer<typeof BasicInfoSchema>;

const BasicUserInfo = () => {
  const dispatch = useDispatch();
  const { basicInfo } = useAppSelector(({ onboarding }) => onboarding);

  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: basicInfo,
    mode: "onBlur",
  });

  return (
    <div className="max-h-[200px] md:max-h-[300px] overflow-y-scroll no-scrollbar p-2 md:p-4 border rounded-lg">
      <div id="basic-info-form" className="space-y-2">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            {...form.register("fullName")}
            placeholder="Enter user's full name"
            value={basicInfo.fullName}
            onChange={(e) =>
              dispatch(updateBasicInfo({ fullName: e.target.value }))
            }
          />
          {form.formState.errors.fullName && (
            <p className="text-xs text-destructive">
              {form.formState.errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            {...form.register("email")}
            placeholder="Enter user email"
            onChange={(e) =>
              dispatch(updateBasicInfo({ email: e.target.value }))
            }
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone
          </Label>
          <PhoneInput />
        </div>
      </div>
    </div>
  );
};

export default BasicUserInfo;
