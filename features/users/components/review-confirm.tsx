import React from "react";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

const ReviewConfirm = () => {
  const { basicInfo, roleInfo, onboardingInfo } = useAppSelector(
    ({ onboarding }) => onboarding
  );

  return (
    <div className="max-h-[200px] md:max-h-[300px] overflow-y-scroll no-scrollbar p-2 md:p-4 border rounded-lg">
      <div className="space-y-2">
        {/* --- 1. Basic Info Section --- */}
        <div className="p-2 border rounded-lg">
          <h3 className="text-base font-medium pb-1">Basic Info</h3>
          <div className="space-y-1">
            <DataBlock label="Full Name" value={basicInfo.fullName} />
            <DataBlock label="Email" value={basicInfo.email} />
            <DataBlock label="Phone" value={basicInfo.phone} />
          </div>
        </div>

        {/* --- 2. Role & Permissions Section --- */}
        <div className="p-2 border rounded-lg">
          <h3 className="text-base font-medium pb-1">Role & Permissions</h3>
          <div className="space-y-1">
            <DataBlock label="Assigned Role" value={roleInfo.role} />

            {/* Permissions: Display as a bulleted list or simplified summary */}
            <div className="py-2 border-b last:border-b-0">
              <span className="block text-sm font-medium text-muted-foreground mb-2">
                Permissions Summary
              </span>

              {/* Render Permission Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {Object.entries(roleInfo.permissions).map(
                  ([moduleKey, actions]) => (
                    <div
                      key={moduleKey}
                      className="p-3 border rounded-lg bg-muted/20 shadow-sm"
                    >
                      <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">
                        {moduleKey.replaceAll("_", " ")}
                      </h4>
                      <ul className="space-y-1">
                        {Object.entries(actions).map(([actionKey, value]) => (
                          <li
                            key={actionKey}
                            className="flex items-center gap-2"
                          >
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                value ? "bg-green-500" : "bg-muted-foreground"
                              }`}
                            ></span>
                            <span
                              className={`capitalize ${
                                value
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {actionKey.replace("can", "")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. Onboarding & Invite Section --- */}
        <div className="p-2 border rounded-lg">
          <h3 className="text-base font-medium pb-1">Onboarding & Invite</h3>
          <div className="space-y-1">
            <div className="p-2 border rounded-lg">
              <DataBlock
                label="Send Invite Email"
                value={onboardingInfo.sendInviteEmail}
                isBool
              />
              <DataBlock
                label="Invite Expiry"
                value={onboardingInfo.inviteExpiry}
              />
            </div>

            <div className="p-2 border rounded-lg">
              {onboardingInfo.activationMethod !== "immediately" &&
                onboardingInfo.userActiveSheduleDate && (
                  <DataBlock
                    label="User Active Schedule Date"
                    value={new Date(
                      onboardingInfo.userActiveSheduleDate
                    ).toLocaleString()}
                  />
                )}
              <DataBlock
                label="Account Activation"
                value={formatActivation(onboardingInfo.activationMethod)}
              />
            </div>

            <div className="p-2 border rounded-lg">
              <DataBlock
                label="Reset password required"
                value={onboardingInfo.resetPasswordRequired}
                isBool
              />
              <DataBlock
                label="Enable 2FA"
                value={onboardingInfo.enable2FA}
                isBool
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewConfirm;

interface DataBlockProps {
  label: string;
  value: React.ReactNode;
  isBool?: boolean;
}

// A tight div structure for displaying a single key-value pair
const DataBlock = ({ label, value, isBool = false }: DataBlockProps) => (
  <div className="flex justify-between items-start py-2 border-b last:border-b-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="text-sm text-right">
      {isBool ? <BooleanIcon value={value as boolean} /> : value}
    </div>
  </div>
);

const formatActivation = (method: string) =>
  method === "schedule_date" ? "On Schedule Date" : "Immediately";

const BooleanIcon = ({ value }: { value: boolean }) => (
  <span
    className={cn("text-sm", value ? "text-green-500" : "text-destructive")}
  >
    {value ? "Yes" : "No"}
  </span>
);
