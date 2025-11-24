// components/user-profile/AccountActionsSection.tsx
import { Button } from "@/components/ui/button";

export const AccountActionsSection = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button variant="outline" className="flex-1">
        Log out of all devices
      </Button>
      <Button variant="destructive" className="flex-1">
        Delete my account
      </Button>
    </div>
  );
};
