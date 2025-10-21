import PillButton from "@/components/pill-button";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Shapes } from "lucide-react";

export default function CategoryPill({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (item: string) =>
    value.includes(item)
      ? onChange(value.filter((v) => v !== item))
      : onChange([...value, item]);

  return (
    <PillButton icon={Shapes} label={label} className="h-8">
      <DropdownMenuLabel>Categories</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {items.map((item, idx) => (
        <DropdownMenuCheckboxItem
          key={item + idx}
          checked={value.includes(item)}
          onCheckedChange={() => toggle(item)}
        >
          {item}
        </DropdownMenuCheckboxItem>
      ))}
    </PillButton>
  );
}
