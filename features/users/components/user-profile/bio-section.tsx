// components/user-profile/BioSection.tsx
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserProfile } from "@/types/user-profile";
import { Label } from "@/components/ui/label";

interface BioSectionProps {
  user: UserProfile | null;
}

export const BioSection = ({ user }: BioSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Bio</Label>
        <Textarea
          placeholder="Tell us about yourself..."
          defaultValue={user?.bio}
          className="mt-1 min-h-[100px]"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Button size="sm" variant="ghost">
            <Plus className="w-4 h-4 mr-1" />
            {user?.skills ? "Add more" : "Add Your skills"}
          </Button>
        </div>
        {user?.skills && (
          <>
            <Label className="text-sm font-medium">Skills/Interests</Label>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
