// src/features/users/components/user-profile-dialog.tsx (Refactored for Dialog)

import React, { ReactNode, use } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Use Dialog components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Archive,
  BadgeCheck,
  Briefcase,
  BriefcaseBusiness,
  Link,
} from "lucide-react";
import { UserProfile } from "@/types/user-profile";
import { userStatus } from "@/constents/action-colors";
import { USER_STATUS } from "@/constents/user-actions";
import { Button } from "@/components/ui/button";

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  children?: ReactNode;
}

const UserProfileDialog = ({
  isOpen,
  onClose,
  user,
  children,
}: UserProfileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" p-0 gap-0 overflow-hidden shadow-2xl">
        {/* HEADER / BANNER SECTION */}
        <div className="relative flex flex-col p-3">
          <div
            className="h-25 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage:
                // Placeholder image matching the color/style of the screenshot
                "url('https://images.unsplash.com/photo-1706166483854-67182e829575?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Profile Picture and Buttons */}
          <DialogHeader className="px-2 mb-2">
            <div className="flex justify-between items-end -mt-10">
              <div className="relative">
                {user.name && user.avatar && (
                  <Avatar className="h-20 w-20 rounded-full border-4 border-background shadow-lg">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                      className="object-cover"
                    />

                    <AvatarFallback className="rounded-full text-xl font-bold bg-muted">
                      {user.name?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Verified Check on Avatar */}
                <div className="absolute bottom-0 right-0 p-[2px] bg-background rounded-full">
                  <BadgeCheck className="h-4 w-4 text-primary fill-background" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" className="text-sm font-semibold">
                  <Link className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
                <Button variant="outline" className="text-sm font-semibold">
                  <BriefcaseBusiness className="h-4 w-4 mr-1" />
                  View Jobs By User
                </Button>
              </div>
            </div>

            {/* User Name and Email */}
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <span>{user.name}</span>
              <Badge
                variant="outline"
                className="flex items-center font-semibold"
              >
                <div
                  className={`w-1 h-1 mr-2 rounded-full ${
                    userStatus[user.status as USER_STATUS]
                  } animate-ping`}
                />
                <span className="text-muted-foreground">{user.status}</span>
              </Badge>
            </DialogTitle>

            {user.name && (
              <p className="text-sm text-start text-muted-foreground">
                {user.email}
              </p>
            )}
          </DialogHeader>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
