import { useState } from "react";
import { Receipt, Pencil, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { TaxInfo } from "@/interfaces/billing-settings";

interface TaxInfoCardProps {
  taxInfo: TaxInfo | null;
  onSave: (taxInfo: TaxInfo) => void;
}

const taxIdTypes = [
  { value: "vat", label: "VAT Number" },
  { value: "gst", label: "GST Number" },
  { value: "ein", label: "EIN (US)" },
  { value: "other", label: "Other" },
];

export function TaxInfoCard({ taxInfo, onSave }: TaxInfoCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<TaxInfo>>(
    taxInfo || { isExempt: false }
  );

  const handleSave = () => {
    onSave({
      taxId: formData.taxId,
      taxIdType: formData.taxIdType as TaxInfo["taxIdType"],
      businessName: formData.businessName,
      isExempt: formData.isExempt || false,
    });
    setDialogOpen(false);
  };

  return (
    <>
      <Card className="p-3 border group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Tax / VAT Information</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFormData(taxInfo || { isExempt: false });
              setDialogOpen(true);
            }}
          >
            {taxInfo?.taxId ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {taxInfo?.taxId ? (
          <div className="space-y-2">
            {taxInfo.businessName && (
              <p className="text-sm font-medium">{taxInfo.businessName}</p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {taxIdTypes.find((t) => t.value === taxInfo.taxIdType)?.label ||
                  "Tax ID"}
                :
              </span>
              <span className="text-sm font-mono">{taxInfo.taxId}</span>
            </div>
            {taxInfo.isExempt && (
              <Badge variant="secondary" className="mt-2">
                Tax Exempt
              </Badge>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No tax information added
          </p>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tax / VAT Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name (Optional)</Label>
              <Input
                id="businessName"
                value={formData.businessName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxIdType">Tax ID Type</Label>
              <Select
                value={formData.taxIdType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    taxIdType: value as TaxInfo["taxIdType"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {taxIdTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID Number</Label>
              <Input
                id="taxId"
                value={formData.taxId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, taxId: e.target.value })
                }
                placeholder="XX-XXXXXXX"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label>Tax Exempt</Label>
                <p className="text-sm text-muted-foreground">
                  Mark as tax exempt organization
                </p>
              </div>
              <Switch
                checked={formData.isExempt}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isExempt: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
