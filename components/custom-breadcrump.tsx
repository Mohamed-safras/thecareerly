import React, { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface CustomBreadcrumpProps {
  breadCrumpPage: string;
  breadCrumpItems?: { link: string; label: string }[];
}

const CustomBreadcrumpProps: FC<CustomBreadcrumpProps> = ({
  breadCrumpPage,
  breadCrumpItems,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumpItems && (
          <React.Fragment>
            {breadCrumpItems?.map((breadCrumpItem, idx) => (
              <React.Fragment key={idx + breadCrumpItem.link}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={breadCrumpItem.link}>
                    {breadCrumpItem.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            ))}
          </React.Fragment>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage>{breadCrumpPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumpProps;
