import React from "react";

import { NavUser } from "@/components/nav-user";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { UserProfile } from "@/types/user-profile";

interface AppSideBarProps {
  sidebarHeader?: React.ReactNode;
  user?: UserProfile | null;
  children?: React.ReactNode;
}

// const data = {
//     teams: [
//       {
//         name: process.env.NEXT_PUBLIC_APP_NAME!,
//         logo: GalleryVerticalEnd,
//         plan: "Enterprise",
//       },
//       {
//         name: "Acme Corp.",
//         logo: AudioWaveform,
//         plan: "Startup",
//       },
//       {
//         name: "Evil Corp.",
//         logo: Command,
//         plan: "Free",
//       },
//     ],
//     NavMain: [
//       {
//         title: "Dashboard",
//         url: "/connect/dashboard",
//         icon: LayoutDashboard,
//       },
//       {
//         title: "Inbox",
//         url: "#",
//         icon: Inbox,
//       },
//       {
//         title: "Calendar & Tasks",
//         url: "#",
//         icon: Calendar,
//       },
//     ],
//     recuitment: [
//       {
//         title: "Jobs",
//         url: jobsPath ? `${jobsPath}` : "#",
//         icon: BriefcaseBusiness,
//         isActive: true,
//         items: [
//           {
//             title: "Create New Job",
//             url: jobsPath ? `${jobsPath}/create` : "#",
//           },
//           {
//             title: "Job Posts",
//             url: jobsPath ? `${jobsPath}` : "#",
//           },
//         ],
//       },
//       {
//         title: "Candidates",
//         url: "#",
//         icon: UserRound,
//         items: [
//           {
//             title: "Genesis",
//             url: "#",
//           },
//           {
//             title: "Explorer",
//             url: "#",
//           },
//           {
//             title: "Quantum",
//             url: "#",
//           },
//         ],
//       },
//       // {
//       //   title: "Settings",
//       //   url: "#",
//       //   icon: Settings2,
//       //   items: [
//       //     {
//       //       title: "General",
//       //       url: "#",
//       //     },
//       //     {
//       //       title: "Team",
//       //       url: "#",
//       //     },
//       //     {
//       //       title: "Billing",
//       //       url: "#",
//       //     },
//       //     {
//       //       title: "Limits",
//       //       url: "#",
//       //     },
//       //   ],
//       // },
//     ],
//     organization: [
//       {
//         title: "Employee",
//         icon: Users,
//         url: "#",
//         items: [
//           {
//             title: "General",
//             url: "#",
//           },
//           {
//             title: "Team",
//             url: "#",
//           },
//         ],
//       },
//     ],

//     //   projects: [
//     //     {
//     //       name: "Design Engineering",
//     //       url: "#",
//     //       icon: Frame,
//     //     },
//     //     {
//     //       name: "Sales & Marketing",
//     //       url: "#",
//     //       icon: PieChart,
//     //     },
//     //     {
//     //       name: "Travel",
//     //       url: "#",
//     //       icon: Map,
//     //     },
//     //   ],
//   };

{
  /* <NavSecondary sectionTitle="MENU" linearItems={data.NavMain} />
        <NavSecondary
          linearItems={[
            { title: "My Referrals", icon: Speech, url: "#" },
            { title: "Career Site", icon: Link, url: "#" },
          ]}
          collapsibleItems={data.recuitment}
          sectionTitle="RECRUITMENT"
        /> */
}
{
  /* <NavProjects projects={data.projects} /> */
}
// <NavSecondary
//   collapsibleItems={data.organization}
//   sectionTitle="ORGANIZATION"
//   linearItems={[{ title: "Report", url: "#", icon: ChartPie }]}
// />

{
  /* <TeamSwitcher teams={data.teams} /> */
}

const AppSideBar = ({ sidebarHeader, children, user }: AppSideBarProps) => {
  return (
    <React.Fragment>
      {sidebarHeader && <SidebarHeader>{sidebarHeader}</SidebarHeader>}
      <SidebarContent>{children}</SidebarContent>

      <SidebarFooter>
        <NavUser {...user} />
      </SidebarFooter>
      <SidebarRail />
    </React.Fragment>
  );
};

export default AppSideBar;
