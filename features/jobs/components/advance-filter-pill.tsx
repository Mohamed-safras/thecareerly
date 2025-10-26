import PillButton from "@/components/pill-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FunnelX } from "lucide-react";
import { useState } from "react";

export default function AdvanceFilterPill() {
  const [remoteOnly, setRemoteOnly] = useState<boolean>(false);
  const [fullTime, setFullTime] = useState<boolean>(false);
  const [withReferral, setWithReferral] = useState<boolean>(false);

  return (
    <PillButton icon={FunnelX} label="Advance Filter">
      <DropdownMenuLabel>Advance Filter</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        checked={remoteOnly}
        onCheckedChange={(v) => setRemoteOnly(Boolean(v))}
      >
        Remote only
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={fullTime}
        onCheckedChange={(v) => setFullTime(Boolean(v))}
      >
        Full-time
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={withReferral}
        onCheckedChange={(v) => setWithReferral(Boolean(v))}
      >
        Has referral
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <div className="px-2 pb-1">
        <Button size="sm" className="h-8 w-full">
          Apply filters
        </Button>
      </div>
    </PillButton>
  );
}
