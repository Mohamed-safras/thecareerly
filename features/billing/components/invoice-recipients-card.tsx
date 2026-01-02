import { useState } from "react";
import { Mail, Plus, Trash2, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { InvoiceRecipient } from "@/interfaces/billing-settings";

interface InvoiceRecipientsCardProps {
  recipients: InvoiceRecipient[];
  onAdd: (recipient: InvoiceRecipient) => void;
  onRemove: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

export function InvoiceRecipientsCard({
  recipients,
  onAdd,
  onRemove,
  onSetPrimary,
}: InvoiceRecipientsCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (email) {
      onAdd({
        id: crypto.randomUUID(),
        email,
        name: name || undefined,
        isPrimary: recipients.length === 0,
      });
      setEmail("");
      setName("");
      setDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="p-3 border card-interactive group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold">Invoice Recipients</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {recipients.length > 0 ? (
          <div className="space-y-3">
            {recipients.map((recipient) => (
              <div
                key={recipient.id}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={() => onSetPrimary(recipient.id)}
                    className={cn(
                      "p-1 rounded transition-colors",
                      recipient.isPrimary
                        ? "text-warning"
                        : "text-muted-foreground hover:text-warning"
                    )}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        recipient.isPrimary && "fill-current"
                      )}
                    />
                  </button>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {recipient.name || recipient.email}
                    </p>
                    {recipient.name && (
                      <p className="text-xs text-muted-foreground truncate">
                        {recipient.email}
                      </p>
                    )}
                  </div>
                  {recipient.isPrimary && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      Primary
                    </Badge>
                  )}
                </div>
                {!recipient.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => onRemove(recipient.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No recipients added</p>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Invoice Recipient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Email Address</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="billing@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientName">Name (Optional)</Label>
              <Input
                id="recipientName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Billing Department"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!email}>
              Add Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
