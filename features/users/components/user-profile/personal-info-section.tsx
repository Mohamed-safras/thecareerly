// components/user-profile/PersonalInfoSection.tsx

import { PhoneInput } from "@/components/phone-input";
import { InputWithLabel } from "./ui/input-with-label";
import { UserProfile } from "@/types/user-profile";

interface PersonalInfoSectionProps {
  user: UserProfile | null;
}

export const PersonalInfoSection = ({ user }: PersonalInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {user?.name && (
        <InputWithLabel label="First Name" defaultValue={user?.name} />
      )}
      <InputWithLabel label="Last Name" defaultValue="Frederin" />
      {user?.email && (
        <div className="md:col-span-2">
          <InputWithLabel label="Email Address" defaultValue={user?.email} />
        </div>
      )}

      {user?.phone && (
        <div className="md:col-span-2">
          <PhoneInput defaultValue={user?.phone} />
        </div>
      )}
    </div>
  );
};
