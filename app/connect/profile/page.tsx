// app/profile/page.tsx

import HeaderShell from "@/features/jobs/components/hiring-shell";
import { UserProfilePage } from "./user-profile";

export default function ProfilePage() {
  return (
    <HeaderShell breadCrumbPage="Account Settings">
      <UserProfilePage />
    </HeaderShell>
  );
}
