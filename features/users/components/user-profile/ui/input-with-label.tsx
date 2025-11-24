// components/user-profile/ui/InputWithLabel.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const InputWithLabel = ({
  label,
  prefix,
  ...props
}: {
  label: string;
  prefix?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <Label>{label}</Label>
    <div className="relative mt-1">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          {prefix}
        </span>
      )}
      <Input className={prefix ? "pl-10" : ""} {...props} />
    </div>
  </div>
);
