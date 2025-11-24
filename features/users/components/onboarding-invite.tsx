// src/components/onboarding/ReusableOnboardingInviteStep.tsx

"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Shadcn/UI Imports
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { updateOnboardingInfo } from "@/store/slice/user-onboarding-slice";
import { useAppSelector } from "@/store/hooks";

// --- 2. MOCK DATA (Should be moved to constants/props in a large app) ---
const EXPIRY_OPTIONS = ["3 Days", "7 Days", "14 Days", "30 Days"];

// --- 3. REUSABLE SECTION COMPONENT ---

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className = "",
}) => (
  <div className={cn("p-4 shadow-none border rounded-lg", className)}>
    <h3 className="text-md font-semibold mb-2">{title}</h3>
    <div className="space-y-1.5">{children}</div>
  </div>
);

interface DynamicFormFieldProps<T> {
  label: string;
  field: {
    value: T;
    onChange: (value: T) => void;
  };
  render: (field: {
    value: T;
    onChange: (value: T) => void;
  }) => React.ReactNode;
  className?: string;
}

function DynamicFormField<T>({
  label,
  field,
  render,
  className = "",
}: DynamicFormFieldProps<T>) {
  return (
    <div
      className={`flex flex-row items-center justify-between py-1 ${className}`}
    >
      <h4 className="text-sm">{label}</h4>
      <div>{render(field)}</div>
    </div>
  );
}

const OnboardingInviteStep = () => {
  const { onboardingInfo } = useAppSelector(({ onboarding }) => onboarding);
  const dispatch = useDispatch();
  const userActiveSheduleDate = onboardingInfo.userActiveSheduleDate
    ? new Date(onboardingInfo.userActiveSheduleDate)
    : null;
  return (
    <div className="max-h-[200px] md:max-h-[300px] overflow-y-scroll no-scrollbar p-2 md:p-4 border rounded-lg">
      <div className="space-y-2">
        {/* --- Section 1: Invite Options --- */}
        <FormSection title="Invite Options">
          <DynamicFormField
            label="Send Invite Email"
            field={{
              onChange: (value) =>
                dispatch(updateOnboardingInfo({ sendInviteEmail: value })),
              value: onboardingInfo.sendInviteEmail,
            }}
            render={(field) => (
              <div className="flex flex-row items-center justify-between">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />

          <DynamicFormField
            label="Invite Expiry"
            field={{
              value: onboardingInfo.inviteExpiry ?? "",
              onChange: (value: string) =>
                dispatch(updateOnboardingInfo({ inviteExpiry: value })),
            }}
            render={(field) => (
              <div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiry duration" />
                    </SelectTrigger>
                  </div>
                  <SelectContent>
                    {EXPIRY_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </FormSection>

        {/* --- Section 2: Account Settings & Activation --- */}
        <FormSection title="Account Settings">
          {/* Employment Start Date */}
          {/* Account Activation Radio/Toggle Look (Tight Vertical Spacing) */}
          <div className="space-y-2">
            <h4 className="text-sm">Account Activation</h4>
            <div className="space-y-2">
              {/* Activate Immediately */}
              <div
                className={cn(
                  "flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-all",
                  onboardingInfo.activationMethod === "immediately"
                    ? "border bg-foreground/5"
                    : "hover:bg-foreground/5"
                )}
                onClick={() =>
                  dispatch(
                    updateOnboardingInfo({ activationMethod: "immediately" })
                  )
                }
              >
                <input
                  type="radio"
                  id="activate-immediately"
                  value="immediately"
                  checked={onboardingInfo.activationMethod === "immediately"}
                  onChange={() =>
                    dispatch(
                      updateOnboardingInfo({ activationMethod: "immediately" })
                    )
                  }
                  className="h-4 w-4 accent-background cursor-pointer"
                />
                <label
                  htmlFor="activate-immediately"
                  className="font-normal text-sm cursor-pointer"
                >
                  Activate immediately
                </label>
              </div>

              {/* Activate on Start Date */}
              <div
                className={cn(
                  "flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-all",
                  onboardingInfo.activationMethod === "schedule_date"
                    ? "border bg-foreground/5"
                    : "hover:bg-foreground/5"
                )}
                onClick={() =>
                  dispatch(
                    updateOnboardingInfo({ activationMethod: "schedule_date" })
                  )
                }
              >
                <input
                  type="radio"
                  id="activate-start-date"
                  value="start_date"
                  checked={onboardingInfo.activationMethod === "schedule_date"}
                  onChange={() =>
                    dispatch(
                      updateOnboardingInfo({
                        activationMethod: "schedule_date",
                      })
                    )
                  }
                  className="h-4 w-4 accent-background cursor-pointer"
                />
                <label
                  htmlFor="activate-start-date"
                  className="font-normal text-sm cursor-pointer"
                >
                  Activate on scheduled date
                </label>
              </div>
            </div>
          </div>

          {onboardingInfo.activationMethod !== "immediately" && (
            <DynamicFormField
              label="User Activate Schedule Date"
              field={{
                value: userActiveSheduleDate,
                onChange: (date: Date | null) =>
                  dispatch(
                    updateOnboardingInfo({
                      userActiveSheduleDate: date ? date.toISOString() : null,
                    })
                  ),
              }}
              render={(field) => (
                <div className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        required={true}
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          )}
        </FormSection>

        {/* --- Section 4: First Login Rules --- */}
        <FormSection title="First Login Rules">
          <DynamicFormField
            label="Reset password required"
            field={{
              value: onboardingInfo.resetPasswordRequired,
              onChange: (value: boolean) =>
                dispatch(
                  updateOnboardingInfo({ resetPasswordRequired: value })
                ),
            }}
            render={(field) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />

          <DynamicFormField
            label="Enable 2FA on first login"
            field={{
              value: onboardingInfo.enable2FA,
              onChange: (value: boolean) =>
                dispatch(updateOnboardingInfo({ enable2FA: value })),
            }}
            render={(field) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </FormSection>
      </div>
    </div>
  );
};

export default OnboardingInviteStep;
