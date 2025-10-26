import React from "react";

import {
  AudioWaveform,
  BarChart,
  BriefcaseBusiness,
  Calendar,
  ChartPie,
  Command,
  CreditCard,
  FileText,
  GalleryVerticalEnd,
  Group,
  Inbox,
  KeyRound,
  LayoutDashboard,
  Link,
  Settings,
  ShieldCheck,
  Speech,
  User,
  Users,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "@/components/nav-secondary";
import { useAppSelector } from "@/store/hooks";
import { getJobsPath } from "@/lib/utils";

const SuperAdminAppSideBar = () => {
  const { user } = useAppSelector(({ user }) => user);
  const jobsPath = getJobsPath(user?.organizationId, user?.teamId);

  const data = {
    teams: [
      {
        name: process.env.NEXT_PUBLIC_APP_NAME!,
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    menu: [
      {
        title: "Dashboard",
        url: "/connect/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Inbox",
        url: "#",
        icon: Inbox,
      },
      {
        title: "Calendar & Tasks",
        url: "#",
        icon: Calendar,
      },
    ],
    organization: [
      {
        title: "User Management",
        icon: Users,
        url: "#",
        items: [
          {
            title: "All Accounts",
            url: "#",
          },
          {
            title: "Pending Invitations",
            url: "#",
          },
          {
            title: "Account Requests",
            url: "#",
          },
        ],
      },
      {
        title: "Roles & Permissions",
        icon: ShieldCheck,
        url: "#",
        items: [
          {
            title: "Define Roles",
            url: "#",
          },
          {
            title: "Access Control List (ACL)",
            url: "#",
          },
          {
            title: "Account Requests",
            url: "#",
          },
        ],
      },
      {
        title: "Teams",
        icon: Group,
        url: "#",
        items: [
          {
            title: "All Teams",
            url: "#",
          },
          {
            title: "Team Templates",
            url: "#",
          },
        ],
      },
      {
        title: "Employees",
        icon: Users,
        url: "#",
        items: [
          {
            title: "Employee Directory",
            url: "#",
          },
        ],
      },
    ],
    recruitment: [
      {
        title: "Jobs",
        url: jobsPath ? `${jobsPath}` : "#",
        icon: BriefcaseBusiness,
        isActive: true,
        items: [
          {
            title: "Create New Job",
            url: jobsPath ? `${jobsPath}/create` : "#",
          },
          {
            title: "Job Posts",
            url: jobsPath ? `${jobsPath}` : "#",
          },
        ],
      },
    ],
    adminTools: [
      {
        title: "System Settings",
        url: "#",
        icon: Settings,
      },
      {
        title: "Billing & Subscription",
        url: "#",
        icon: CreditCard,
      },
      {
        title: "Audit Log",
        url: "#",
        icon: FileText,
      },
    ],
    // data: [
    //   {
    //     title: "Reports & Analytics",
    //     url: "#",
    //     icon: BarChart,
    //   },
    // ],
  };

  return (
    <React.Fragment>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary sectionTitle="MENU" linearItems={data.menu} />
        <NavSecondary
          collapsibleItems={data.organization}
          sectionTitle="ORGANIZATION"
        />
        <NavSecondary
          linearItems={[
            { title: "My Referrals", icon: Speech, url: "#" },
            { title: "Career Site", icon: Link, url: "#" },
          ]}
          collapsibleItems={data.recruitment}
          sectionTitle="RECRUITMENT"
        />
        <NavSecondary
          collapsibleItems={data.adminTools}
          sectionTitle="ADMIN TOOLS"
        />

        {/* <NavSecondary collapsibleItems={data.data} sectionTitle="DATA" /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser {...user} />
      </SidebarFooter>
      <SidebarRail />
    </React.Fragment>
  );
};

export default SuperAdminAppSideBar;
