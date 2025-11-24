"use client";
import { AccountActionsSection } from "@/features/users/components/user-profile/account-actions-section";
import { AvatarSection } from "@/features/users/components/user-profile/avatar-section";
import { BioSection } from "@/features/users/components/user-profile/bio-section";
import { PersonalInfoSection } from "@/features/users/components/user-profile/personal-info-section";
import { SecuritySection } from "@/features/users/components/user-profile/security-section";
import { SocialLinksSection } from "@/features/users/components/user-profile/social-links-section";
import { SectionCard } from "@/features/users/components/user-profile/ui/section-card";
import { useAppSelector } from "@/store/hooks";

export const UserProfilePage = () => {
  const { user } = useAppSelector(({ user }) => user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/20 to-background p-6">
      <div className=" space-y-6">
        <AvatarSection user={user} />

        <SectionCard title="Personal Information">
          <PersonalInfoSection user={user} />
        </SectionCard>

        <SectionCard title="Bio & Interests">
          <BioSection user={user} />
        </SectionCard>

        <SectionCard title="Account Security">
          <SecuritySection user={user} />
        </SectionCard>

        <SectionCard title="Social Media">
          <SocialLinksSection />
        </SectionCard>

        <SectionCard title="Account Actions">
          <AccountActionsSection />
        </SectionCard>
      </div>
    </div>
  );
};
