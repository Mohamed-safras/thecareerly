import React from "react";

import { NavUser } from "@/components/nav-user";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { UserProfile } from "@/types/user-profile";
import UpgradeTrigger from "@/features/billing/components/upgrade-trigger";

interface AppSideBarProps {
  sidebarHeader?: React.ReactNode;
  user?: UserProfile | null;
  children?: React.ReactNode;
}

const AppSideBar = ({ sidebarHeader, children, user }: AppSideBarProps) => {
  const sidebar = useSidebar();
  return (
    <React.Fragment>
      {sidebarHeader && <SidebarHeader>{sidebarHeader}</SidebarHeader>}
      <SidebarContent>{children}</SidebarContent>

      <SidebarFooter>
        {sidebar.open && <UpgradeTrigger />}
        <NavUser {...user} />
      </SidebarFooter>
      <SidebarRail />
    </React.Fragment>
  );
};

export default AppSideBar;
