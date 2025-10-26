import PillButton from "@/components/pill-button";
import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MapPin, MapPinHouse } from "lucide-react";

export default function LocationPill({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <PillButton icon={MapPin} label={label}>
      <DropdownMenuLabel>Location</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
        {items.map((item) => (
          <DropdownMenuRadioItem key={item.id} value={item.id}>
            {item.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </PillButton>
  );
}
