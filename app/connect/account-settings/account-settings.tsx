"use client";
import { AccountActionsSection } from "@/features/users/components/user-profile/account-actions-section";
import { AvatarSection } from "@/features/users/components/user-profile/avatar-section";
import { BioSection } from "@/features/users/components/user-profile/bio-section";
import { PersonalInfoSection } from "@/features/users/components/user-profile/personal-info-section";
import { SecuritySection } from "@/features/users/components/user-profile/security-section";
import { SocialLinksSection } from "@/features/users/components/user-profile/social-links-section";
import { SectionCard } from "@/features/users/components/user-profile/section-card";
import { useAppSelector } from "@/store/hooks";

export const AccountSettingsPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-muted/20 to-background p-6">
      <div className=" space-y-6">
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
