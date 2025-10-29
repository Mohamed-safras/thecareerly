"use client";

import React from "react";
import SiteHeader from "@/components/site-header";
import SideHeaderBreadCrumb from "@/components/custom-breadcrump";
import { SearchForm } from "@/components/search-form";

export type BreadcrumbItem = { label: string; link: string };

export default function HeaderShell({
  children,
  breadCrumbPage,
  breadCrumbsItems,
}: {
  children?: React.ReactNode;
  breadCrumbPage: string;
  breadCrumbsItems?: BreadcrumbItem[];
}) {
  return (
    <div className="min-h-screen w-full [--header-height:calc(--spacing(14))]">
      <SiteHeader>
        <SideHeaderBreadCrumb
          breadCrumpPage={breadCrumbPage}
          breadCrumpItems={breadCrumbsItems}
        />
      </SiteHeader>
      {children}
    </div>
  );
}
