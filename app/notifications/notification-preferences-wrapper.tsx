import {
  Bell,
  Mail,
  Smartphone,
  CreditCard,
  Calendar,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { NotificationPreferences } from "@/interfaces/notification";

interface NotificationPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferences: NotificationPreferences;
  onSave: (preferences: NotificationPreferences) => void;
}

interface PreferenceItemProps {
  icon: typeof Bell;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function PreferenceItem({
  icon: Icon,
  label,
  description,
  checked,
  onCheckedChange,
}: PreferenceItemProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 group">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-muted transition-colors group-hover:bg-muted/80">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <Label htmlFor={label} className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        id={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="shrink-0"
      />
    </div>
  );
}

export function NotificationPreferencesDialog({
  open,
  onOpenChange,
  preferences,
  onSave,
}: NotificationPreferencesDialogProps) {
  const handleChange = (key: keyof NotificationPreferences, value: boolean) => {
    onSave({ ...preferences, [key]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </DialogTitle>
          <DialogDescription>
            Choose which billing alerts you want to receive
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <h4 className="text-sm font-medium text-muted-foreground px-1">
            Alert Types
          </h4>
          <div className="space-y-1">
            <PreferenceItem
              icon={AlertTriangle}
              label="Payment Failures"
              description="Get notified when a payment fails or is declined"
              checked={preferences.paymentFailures}
              onCheckedChange={(v) => handleChange("paymentFailures", v)}
            />
            <PreferenceItem
              icon={Calendar}
              label="Renewal Reminders"
              description="Receive reminders before your subscription renews"
              checked={preferences.renewalReminders}
              onCheckedChange={(v) => handleChange("renewalReminders", v)}
            />
            <PreferenceItem
              icon={CreditCard}
              label="Card Expiration Warnings"
              description="Be alerted when your card is about to expire"
              checked={preferences.cardExpirationWarnings}
              onCheckedChange={(v) => handleChange("cardExpirationWarnings", v)}
            />
            <PreferenceItem
              icon={DollarSign}
              label="Spending Limit Alerts"
              description="Get notified when approaching spending limits"
              checked={preferences.spendingLimitAlerts}
              onCheckedChange={(v) => handleChange("spendingLimitAlerts", v)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <h4 className="text-sm font-medium text-muted-foreground px-1">
            Delivery Methods
          </h4>
          <div className="space-y-1">
            <PreferenceItem
              icon={Mail}
              label="Email Notifications"
              description="Receive alerts via email"
              checked={preferences.emailNotifications}
              onCheckedChange={(v) => handleChange("emailNotifications", v)}
            />
            <PreferenceItem
              icon={Smartphone}
              label="Push Notifications"
              description="Receive alerts on your device"
              checked={preferences.pushNotifications}
              onCheckedChange={(v) => handleChange("pushNotifications", v)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
