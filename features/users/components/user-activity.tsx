import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/types/user-profile";

export const UserInfoCard = ({ user }: { user: UserProfile | null }) => {
  if (!user) return null;

  return (
    <Card className="border shadow-none bg-background px-0 py-3">
      <CardContent className="grid grid-cols-3 md:grid-cols-4 gap-6 text-sm px-2">
        {user.id && <DetailItem label="User ID" value={user.id} />}

        {user.lastActive && (
          <DetailItem label="Last Active" value={user.lastActive} />
        )}

        {user.lastUpdated && (
          <DetailItem label="Last Updated" value={user.lastUpdated} />
        )}
      </CardContent>
    </Card>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <p className="text-muted-foreground text-xs">{label}</p>
    <p className="font-medium text-foreground truncate">{value}</p>
  </div>
);
