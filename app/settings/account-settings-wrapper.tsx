"use client";
import { AccountActionsSection } from "@/features/settings/components/account-actions-section";
import { AvatarSection } from "@/features/settings/components/avatar-section";
import { BioSection } from "@/features/settings/components/bio-section";
import { PersonalInfoSection } from "@/features/settings/components/personal-info-section";
import { SecuritySection } from "@/features/settings/components/security-section";
import { SocialLinksSection } from "@/features/settings/components/social-links-section";
import { SectionCard } from "@/features/settings/components/section-card";
import { useAppSelector } from "@/store/hooks";

export const AccountSettingsWrapper = () => {
  const { user } = useAppSelector(({ auth }) => auth);

  const avatar = { url: user?.avatar, name: user?.name };

  const profile = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    location: "",
    company: user?.organizationName,
  };

  const preferences = {
    bio: "",
    jobTitle: "",
    skills: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/20 to-background">
      <div className="space-y-3">
        <AvatarSection avatar={avatar} />

        <SectionCard title="Personal Information">
          <PersonalInfoSection profile={profile} />
        </SectionCard>

        <SectionCard title="Bio & Interests">
          <BioSection preferences={preferences} />
        </SectionCard>

        <SectionCard title="Account Security">
          <SecuritySection />
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
