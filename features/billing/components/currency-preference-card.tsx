import { Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  availableCurrencies,
  CurrencyPreference,
} from "@/interfaces/billing-settings";

interface CurrencyPreferenceCardProps {
  currency: CurrencyPreference;
  onChange: (currency: CurrencyPreference) => void;
}

export function CurrencyPreferenceCard({
  currency,
  onChange,
}: CurrencyPreferenceCardProps) {
  const handleChange = (code: string) => {
    const selected = availableCurrencies.find((c) => c.code === code);
    if (selected) {
      onChange(selected);
    }
  };

  return (
    <Card className="p-3 border group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <Coins className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold">Currency</h3>
        </div>
      </div>

      <Select value={currency.code} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span className="font-mono">{currency.symbol}</span>
              <span>{currency.name}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableCurrencies.map((curr) => (
            <SelectItem key={curr.code} value={curr.code}>
              <span className="flex items-center gap-2">
                <span className="font-mono w-6">{curr.symbol}</span>
                <span>{curr.name}</span>
                <span className="text-muted-foreground">({curr.code})</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
}
