import { PhoneInput } from "@/components/phone-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/types/user-profile";

export const EditUserForm = ({
  user,
  isDisable,
}: {
  user: UserProfile | null;
  isDisable: boolean;
}) => {
  if (!user) return null;
  return (
    <div className="space-y-2 bg-background p-2 border rounded-lg">
      <UserPlaceHolder
        label={"Name"}
        value={user.name ? user.name : ""}
        isDisabled={isDisable}
        // onChange={(e) => {}}
      />
      <UserPlaceHolder
        label={"Email"}
        value={user.email ? user.email : ""}
        isDisabled={isDisable}
      />

      <div>
        <Label className="text-sm">Phone</Label>
        <PhoneInput value={user.phone} />
      </div>
    </div>
  );
};

const UserPlaceHolder = ({
  label,
  value,
  isDisabled,
  onChange,
}: {
  label: string;
  value: string;
  isDisabled: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <Label className="text-sm">{label}</Label>
    <Input
      placeholder={value}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
    />
  </div>
);

export default EditUserForm;
