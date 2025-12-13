import HeaderShell from "@/features/jobs/components/hiring-shell";
import { AccountSettingsPage } from "./account-settings";

export default function AccountSettings() {
  return (
    <HeaderShell breadCrumbPage="Account Settings">
      <AccountSettingsPage />
    </HeaderShell>
  );
}
