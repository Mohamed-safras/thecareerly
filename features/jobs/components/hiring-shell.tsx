"use client";

import React from "react";
import SiteHeader from "@/components/site-header";
import SideHeaderBreadCrumb from "@/components/custom-breadcrump";
import { SearchForm } from "@/components/search-form";

export type BreadcrumbItem = { label: string; link: string };

export default function HeaderShell({
  children,
  breadCrumpPage,
  breadCrumbsItems,
}: {
  children?: React.ReactNode;
  breadCrumpPage: string;
  breadCrumbsItems: BreadcrumbItem[];
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b [--header-height:calc(--spacing(14))]">
      <SiteHeader>
        <SideHeaderBreadCrumb
          breadCrumpPage={breadCrumpPage}
          breadCrumpItems={breadCrumbsItems}
        />
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </SiteHeader>
      {children}
    </div>
  );
}
