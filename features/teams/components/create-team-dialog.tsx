import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // Assuming you have a Separator component
import { PlusCircle, Search, X } from "lucide-react"; // Icons for search and dropdown
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Avatar component

interface TeamMemberItemProps {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  onRemove?: () => void;
}

const TeamMemberItem = ({
  name,
  email,
  role,
  avatarUrl,
  onRemove,
}: TeamMemberItemProps) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="font-semibold">
          {name
            .split(" ")
            .map((nameSeperate) => nameSeperate[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium ">
          {name}{" "}
          {role && <span className="text-xs font-normal ">({role})</span>}
        </p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
    </div>

    <X className="w-4 h-4 cursor-pointer" onClick={onRemove} />
  </div>
);

export function CreateTeamDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-sm:w-full shadow-lg hover:shadow-xl">
          <PlusCircle className="h-4 w-4" /> Add New Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl font-semibold">
                Add new team
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        {/* Form Content - Team Name */}
        <div className="grid gap-1">
          <Label htmlFor="team-name" className="text-sm font-medium">
            Team Name
          </Label>
          <Input id="team-name" defaultValue="" placeholder="Enter team name" />
        </div>

        {/* Form Content - Members */}
        <div className="grid gap-1">
          <Label className="text-sm font-medium">Team Members</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Add members by name of email"
              className="pl-10"
            />
          </div>

          <div className="mt-2 overflow-x-scroll max-h-[180px] no-scrollbar">
            <TeamMemberItem
              name="Frankie Sullivan"
              email="frankie@untitledui.com"
              role="owner"
              avatarUrl="/avatars/frankie.png" // Replace with actual paths
            />
            <TeamMemberItem
              name="Amélie Laurent"
              email="amélie@untitledui.com"
              role="TEAM_ADMIN"
              avatarUrl="/avatars/amelie.png"
            />
            <TeamMemberItem
              name="Katie Moss"
              email="katie@untitledui.com"
              role="editor"
              avatarUrl="/avatars/katie.png"
            />
            <TeamMemberItem
              name="Katie Moss"
              email="katie@untitledui.com"
              role="TEAM_MEMBER"
              avatarUrl="/avatars/katie.png"
            />
            <TeamMemberItem
              name="Katie Moss"
              email="katie@untitledui.com"
              role="editor"
              avatarUrl="/avatars/katie.png"
            />
            <TeamMemberItem
              name="Katie Moss"
              email="katie@untitledui.com"
              role="editor"
              avatarUrl="/avatars/katie.png"
            />
            <TeamMemberItem
              name="Katie Moss"
              email="katie@untitledui.com"
              role="editor"
              avatarUrl="/avatars/katie.png"
            />
          </div>
        </div>

        {/* Separator to clean up the bottom section */}
        <Separator className="my-4" />

        {/* Footer Section */}
        <DialogFooter className="flex flex-row justify-between items-center w-full gap-4">
          <Button variant="secondary" className="text-sm font-medium mr-auto">
            Reset to default
          </Button>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-primary">
              Add
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
