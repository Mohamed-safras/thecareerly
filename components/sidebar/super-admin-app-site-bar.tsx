import {
  AudioWaveform,
  BriefcaseBusiness,
  GalleryVerticalEnd,
  Inbox,
  LayoutDashboard,
  Link,
  Settings,
  ShieldCheck,
  Speech,
  Users,
  CircleUserRound,
  Calendar,
  Globe,
  CircleUser,
} from "lucide-react";

import { TeamSwitcher } from "@/components/team-switcher";

import { NavSecondary } from "@/components/nav-secondary";
import { useAppSelector } from "@/store/hooks";
import { getTeamsPath, getUsersPath } from "@/lib/utils";
import AppSideBar from "./app-site-bar";
import { getJobsPath } from "@/utils/generate-path";

const SuperAdminAppSideBar = () => {
  const { user } = useAppSelector(({ auth }) => auth);
  const jobsPath = getJobsPath(user?.organizationId, user?.teamId);
  const teamsPath = user && getTeamsPath(user.organizationId);
  const userAccounts = user && getUsersPath(user.organizationId);

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
        title: "Events",
        url: "/calander",
        icon: Calendar,
      },
      {
        title: "Site Builder",
        url: "/site-builder",
        icon: Globe,
      },
    ],
    organization: [
      {
        title: "Organization Users",
        icon: CircleUserRound,
        url: "#",
        items: [
          {
            title: "All Accounts",
            url: userAccounts ? userAccounts : "#",
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
        icon: Users,
        url: "#",
        items: [
          {
            title: "All Teams",
            url: teamsPath ? teamsPath : "#",
          },
          {
            title: "Team Templates",
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
        items: [
          {
            title: "Create New Job",
            url: jobsPath ? `${jobsPath}/create` : "#",
          },
          {
            title: "View Jobs",
            url: jobsPath ? `${jobsPath}` : "#",
          },
          {
            title: "Candidate Matcher",
            url: "/candidate-matcher",
          },
        ],
      },
    ],
    adminTools: [
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "Calander Sync",
            url: "/settings/calander-sync",
          },
        ],
      },
      // {
      //   title: "Audit Log",
      //   url: "#",
      //   icon: FileText,
      // },
    ],
  };

  return (
    <AppSideBar sidebarHeader={<TeamSwitcher teams={data.teams} />} user={user}>
      <NavSecondary sectionTitle="MENU" linearItems={data.menu} />
      <NavSecondary
        collapsibleItems={data.organization}
        sectionTitle="ORGANIZATION"
      />
      <NavSecondary
        linearItems={[
          { title: "Candidates", icon: Users, url: "/candidates" },
          { title: "My Referrals", icon: Speech, url: "#" },
          { title: "Career Page", icon: Link, url: "#" },
        ]}
        collapsibleItems={data.recruitment}
        sectionTitle="RECRUITMENT"
      />
      {/* <NavSecondary
        collapsibleItems={data.adminTools}
        sectionTitle="ADMIN TOOLS"
      /> */}
    </AppSideBar>
  );
};

export default SuperAdminAppSideBar;
