"use client";

import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Contrast,
  CreditCard,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { UserProfile } from "@/types/user-profile";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/slice/auth-slice";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { CONNECT } from "@/constents/router-links";
import { PaletteSwitcher } from "./palette-switcher";

export function NavUser(user: UserProfile | null) {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const { avatar, name, email } = user ?? {};

  const signOut = () => {
    auth.logout();
    dispatch(clearUser());
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {avatar ? (
                  <AvatarImage
                    src={avatar}
                    alt={name || "User Avatar"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="rounded-lg">
                  {name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={avatar || ""}
                    alt={name || "User Avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {name?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => redirect(`${CONNECT}/account-settings`)}
              >
                <BadgeCheck />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex items-center gap-2"
                    asChild
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem>
                      <Contrast />
                      Appearance
                      <ChevronRight className="ml-auto" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup>
                      <PaletteSwitcher />
                      <ModeToggle />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => redirect("/billing")}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => redirect("/notifications")}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
