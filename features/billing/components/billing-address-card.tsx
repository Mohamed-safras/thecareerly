import { useState } from "react";
import { MapPin, Pencil, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillingAddress } from "@/interfaces/billing-settings";

interface BillingAddressCardProps {
  address: BillingAddress | null;
  onSave: (address: BillingAddress) => void;
}

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
];

export function BillingAddressCard({
  address,
  onSave,
}: BillingAddressCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<BillingAddress>>(
    address || {}
  );

  const handleSave = () => {
    if (
      formData.line1 &&
      formData.city &&
      formData.postalCode &&
      formData.country
    ) {
      onSave({
        id: address?.id || crypto.randomUUID(),
        line1: formData.line1,
        line2: formData.line2,
        city: formData.city,
        state: formData.state || "",
        postalCode: formData.postalCode,
        country: formData.country,
      });
      setDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="p-3 border group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Billing Address</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFormData(address || {});
              setDialogOpen(true);
            }}
          >
            {address ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {address ? (
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="text-foreground font-medium">{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>
              {countries.find((c) => c.code === address.country)?.name ||
                address.country}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No billing address added
          </p>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {address ? "Edit Billing Address" : "Add Billing Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                value={formData.line1 || ""}
                onChange={(e) =>
                  setFormData({ ...formData, line1: e.target.value })
                }
                placeholder="123 Main Street"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                id="line2"
                value={formData.line2 || ""}
                onChange={(e) =>
                  setFormData({ ...formData, line2: e.target.value })
                }
                placeholder="Apt 4B"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  value={formData.state || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
