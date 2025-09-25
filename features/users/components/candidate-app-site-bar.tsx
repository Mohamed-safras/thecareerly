import React from "react";

import {
  AudioWaveform,
  BriefcaseBusiness,
  Calendar,
  ChartPie,
  Command,
  GalleryVerticalEnd,
  Inbox,
  LayoutDashboard,
  Link,
  Speech,
  UserRound,
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
import { CREATE_JOB, JOBS } from "@/constents/router-links";
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

const CandidateAppSideBar = () => {
  const { user } = useAppSelector(({ user }) => user);

  return (
    <React.Fragment>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary sectionTitle="MENU" linearItems={data.NavMain} />
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

export default CandidateAppSideBar;
