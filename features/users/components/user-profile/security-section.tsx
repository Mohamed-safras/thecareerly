// components/user-profile/SecuritySection.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/types/user-profile";

interface SecuritySectionProps {
  user: UserProfile | null;
}
export const SecuritySection = ({ user }: SecuritySectionProps) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        {user?.email && (
          <div>
            <Label>Email</Label>
            <Input
              defaultValue={user?.email}
              disabled
              className="mt-1 max-w-md"
            />
          </div>
        )}

        <Button variant="outline" size="sm">
          Change email
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value="••••••••"
            disabled
            className="mt-1 max-w-md"
          />
        </div>
        <Button variant="outline" size="sm">
          Change password
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>2-Step Verification</Label>
          <p className="text-xs text-muted-foreground mt-1">
            Add an additional layer of security to your account during login.
          </p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <Label>Support Access</Label>
          <p className="text-xs text-muted-foreground mt-1">
            You have granted us access until Aug 31, 2025, 8:40 PM.
          </p>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  );
};
