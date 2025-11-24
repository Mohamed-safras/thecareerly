import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PermissionModule,
  PermissionState,
  RolePermissionsMap,
  formatName,
} from "@/constents/user-actions";

interface PermissionTableProps {
  permissions: RolePermissionsMap;
  onPermissionChange: (
    module: PermissionModule,
    permissionKey: keyof PermissionState,
    checked: boolean
  ) => void;
  allModules: PermissionModule[];
  permissionKeys: Array<keyof PermissionState>;
}

export const PermissionTable = ({
  permissions,
  onPermissionChange,
  allModules,
  permissionKeys,
}: PermissionTableProps) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[180px]">Module</TableHead>
            {permissionKeys.map((key) => (
              <TableHead key={key} className="text-center">
                {formatName(key)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allModules.map((module) => (
            <TableRow key={module}>
              {/* Module Name */}
              <TableCell className="font-medium">
                {formatName(module)}
              </TableCell>

              {/* Checkbox Group for Module */}
              {permissionKeys.map((key) => {
                const isChecked = permissions[module][key];

                return (
                  <TableCell key={key} className="text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        id={`${module}-${key}`}
                        checked={isChecked}
                        onCheckedChange={(checked: boolean) =>
                          onPermissionChange(module, key, checked)
                        }
                        aria-label={`${formatName(module)} ${formatName(key)}`}
                      />
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
