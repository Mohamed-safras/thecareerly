"use client";

import * as React from "react";

import { Sidebar } from "@/components/ui/sidebar";

import RectruiterAppSideBar from "@/features/users/components/recruiter-app-site-bar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <RectruiterAppSideBar />
    </Sidebar>
  );
}
