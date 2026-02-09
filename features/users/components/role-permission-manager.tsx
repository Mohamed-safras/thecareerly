"use client";

import React, { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  PermissionState,
  formatName,
  ALL_MODULES,
  PERMISSION_KEYS,
  PermissionModule,
} from "@/const/user-actions";
import { Roles } from "@/lib/role";
import { PermissionTable } from "./permission-table";
import { useDispatch } from "react-redux";
import {
  DEFAULT_PERMISSIONS_MAP,
  updateRoleInfo,
} from "@/store/slice/user-onboarding-slice";
import { useAppSelector } from "@/store/hooks";

const RolePermissionManager = () => {
  const dispatch = useDispatch();
  const { roleInfo } = useAppSelector(({ onboarding }) => onboarding);

  const availableRoles = useMemo(() => Object.values(Roles), []);

  const handleRoleChange = (roleValue: string) => {
    const role = roleValue as Roles;
    dispatch(
      updateRoleInfo({
        role,
        permissions:
          DEFAULT_PERMISSIONS_MAP[role] ||
          DEFAULT_PERMISSIONS_MAP[Roles.TEAM_MEMBER],
      }),
    );
  };

  const handlePermissionUpdate = (
    module: PermissionModule,
    permissionKey: keyof PermissionState,
    checked: boolean,
  ) => {
    dispatch(
      updateRoleInfo({
        permissions: {
          ...roleInfo.permissions,
          [module]: {
            ...roleInfo.permissions[module],
            [permissionKey]: checked,
          },
        },
      }),
    );
  };

  return (
    <div className="max-h-[200px] md:max-h-[300px] overflow-y-scroll no-scrollbar p-2 md:p-4 border rounded-lg space-y-2">
      {/* Role Selection */}
      <div className="grid grid-cols-1 space-y-2">
        <Label htmlFor="role-select" className="shrink-0">
          Select Role to Manage Permissions:
        </Label>
        <Select onValueChange={handleRoleChange} value={roleInfo.role}>
          <SelectTrigger id="role-select" className="w-full">
            <SelectValue placeholder="Select a Role" />
          </SelectTrigger>
          <SelectContent>
            {availableRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {formatName(role)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <PermissionTable
        permissions={roleInfo.permissions}
        onPermissionChange={handlePermissionUpdate}
        allModules={ALL_MODULES}
        permissionKeys={PERMISSION_KEYS}
      />
    </div>
  );
};

export default RolePermissionManager;
