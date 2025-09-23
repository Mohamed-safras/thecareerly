import React from "react";

import {
  AudioWaveform,
  Blocks,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Calendar,
  ChartPie,
  Command,
  Frame,
  GalleryVerticalEnd,
  icons,
  Inbox,
  LayoutDashboard,
  Link,
  Map,
  MessageCircleQuestion,
  PieChart,
  Settings2,
  Speech,
  Trash2,
  User,
  UserRound,
  Users,
  UserStar,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "@/components/nav-secondary";
import { CREATE_JOB, HIRING_JOBS } from "@/constents/router-links";
import { useAppSelector } from "@/store/hooks";

const data = {
  teams: [
    {
      name: process.env.NEXT_PUBLIC_ORG_NAME!,
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
  NavMain: [
    {
      title: "Dashboard",
      url: "#",
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
  recuitment: [
    {
      title: "Jobs",
      url: HIRING_JOBS,
      icon: BriefcaseBusiness,
      isActive: true,
      items: [
        {
          title: "Add New Job",
          url: CREATE_JOB,
        },
        {
          title: "Job Posts",
          url: "#",
        },
      ],
    },
    {
      title: "Candidates",
      url: "#",
      icon: UserRound,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  organization: [
    {
      title: "Employee",
      icon: Users,
      url: "#",
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
      ],
    },
  ],

  //   projects: [
  //     {
  //       name: "Design Engineering",
  //       url: "#",
  //       icon: Frame,
  //     },
  //     {
  //       name: "Sales & Marketing",
  //       url: "#",
  //       icon: PieChart,
  //     },
  //     {
  //       name: "Travel",
  //       url: "#",
  //       icon: Map,
  //     },
  //   ],
};

const RectruiterAppSideBar = () => {
  const { user } = useAppSelector(({ user }) => user);

  return (
    <React.Fragment>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary sectionTitle="MENU" linearItems={data.NavMain} />
        <NavSecondary
          linearItems={[
            { title: "My Referrals", icon: Speech, url: "#" },
            { title: "Career Site", icon: Link, url: "#" },
          ]}
          collapsibleItems={data.recuitment}
          sectionTitle="RECRUITMENT"
        />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary
          collapsibleItems={data.organization}
          sectionTitle="ORGANIZATION"
          linearItems={[{ title: "Report", url: "#", icon: ChartPie }]}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser {...user} />
      </SidebarFooter>
      <SidebarRail />
    </React.Fragment>
  );
};

export default RectruiterAppSideBar;
