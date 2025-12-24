"use client";
import { useState } from "react";
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Link2,
  Link2Off,
  RefreshCw,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface CalendarAccount {
  id: string;
  provider: "google" | "outlook";
  email: string;
  connected: boolean;
  lastSync?: string;
  calendars: {
    id: string;
    name: string;
    color: string;
    enabled: boolean;
  }[];
}

interface SyncSettings {
  autoSync: boolean;
  syncFrequency: string;
  createEvents: boolean;
  updateEvents: boolean;
  deleteEvents: boolean;
  sendReminders: boolean;
  reminderTime: string;
}

const mockAccounts: CalendarAccount[] = [
  {
    id: "1",
    provider: "google",
    email: "recruiter@company.com",
    connected: true,
    lastSync: "2024-01-15T10:30:00",
    calendars: [
      { id: "c1", name: "Work Calendar", color: "#4285F4", enabled: true },
      { id: "c2", name: "Interview Schedule", color: "#34A853", enabled: true },
      { id: "c3", name: "Personal", color: "#EA4335", enabled: false },
    ],
  },
  {
    id: "2",
    provider: "outlook",
    email: "hr@company.com",
    connected: false,
    calendars: [],
  },
];

export const CalendarSync = () => {
  const [accounts, setAccounts] = useState<CalendarAccount[]>(mockAccounts);
  const [settings, setSettings] = useState<SyncSettings>({
    autoSync: true,
    syncFrequency: "15",
    createEvents: true,
    updateEvents: true,
    deleteEvents: false,
    sendReminders: true,
    reminderTime: "30",
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectProvider, setConnectProvider] = useState<
    "google" | "outlook" | null
  >(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnect = (provider: "google" | "outlook") => {
    setConnectProvider(provider);
  };

  const confirmConnect = () => {
    if (!connectProvider) return;

    setIsConnecting(true);
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.provider === connectProvider
            ? {
                ...acc,
                connected: true,
                lastSync: new Date().toISOString(),
                calendars:
                  connectProvider === "outlook"
                    ? [
                        {
                          id: "o1",
                          name: "Calendar",
                          color: "#0078D4",
                          enabled: true,
                        },
                        {
                          id: "o2",
                          name: "Interviews",
                          color: "#107C10",
                          enabled: true,
                        },
                      ]
                    : acc.calendars,
              }
            : acc
        )
      );
      setIsConnecting(false);
      setConnectProvider(null);
      toast.success(
        `${
          connectProvider === "google" ? "Google" : "Outlook"
        } Calendar connected successfully`
      );
    }, 1500);
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, connected: false, calendars: [] } : acc
      )
    );
    toast.success("Calendar disconnected");
  };

  const toggleCalendar = (accountId: string, calendarId: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId
          ? {
              ...acc,
              calendars: acc.calendars.map((cal) =>
                cal.id === calendarId ? { ...cal, enabled: !cal.enabled } : cal
              ),
            }
          : acc
      )
    );
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.connected ? { ...acc, lastSync: new Date().toISOString() } : acc
        )
      );
      toast.success("Calendars synced successfully");
    }, 2000);
  };

  const formatLastSync = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getProviderIcon = (provider: "google" | "outlook") => {
    if (provider === "google") {
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      );
    }
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="#0078D4"
          d="M21.17 2.06H2.83A.83.83 0 0 0 2 2.89v18.22c0 .46.37.83.83.83h18.34c.46 0 .83-.37.83-.83V2.89a.83.83 0 0 0-.83-.83zM10.5 18.39H5.78v-8.72h4.72v8.72zm6.72 0h-4.72V9.67h4.72v8.72zm0-10.06h-4.72V5.61h4.72v2.72z"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">
            Calendar Integration
          </h2>
          <p className="text-sm text-muted-foreground">
            Sync your interviews with external calendars
          </p>
        </div>
        <Button
          onClick={handleSync}
          disabled={isSyncing || !accounts.some((a) => a.connected)}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync Now"}
        </Button>
      </div> */}

      <div className="grid gap-3 lg:grid-cols-2">
        {/* Connected Accounts */}
        <Card className="shadow-none rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Link2 className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <CardDescription>Manage your calendar connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {getProviderIcon(account.provider)}
                    <div className="min-w-0">
                      <p className="font-medium capitalize">
                        {account.provider} Calendar
                      </p>
                      {account.connected && (
                        <p className="truncate text-sm text-muted-foreground">
                          {account.email}
                        </p>
                      )}
                    </div>
                  </div>
                  {account.connected ? (
                    <Badge
                      variant="outline"
                      className="shrink-0 border-status-active text-status-active"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="shrink-0">
                      Not Connected
                    </Badge>
                  )}
                </div>

                {account.connected ? (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Last synced:
                      </span>
                      <span>{formatLastSync(account.lastSync)}</span>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <p className="text-sm font-medium">Calendars to sync:</p>
                      {account.calendars.map((cal) => (
                        <div
                          key={cal.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: cal.color }}
                            />
                            <span className="text-sm">{cal.name}</span>
                          </div>
                          <Switch
                            checked={cal.enabled}
                            onCheckedChange={() =>
                              toggleCalendar(account.id, cal.id)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-3 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDisconnect(account.id)}
                    >
                      <Link2Off className="h-4 w-4" />
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="mt-4 w-full gap-3"
                    onClick={() => handleConnect(account.provider)}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Connect{" "}
                    {account.provider === "google" ? "Google" : "Outlook"}
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sync Settings */}
        <Card className="shadow-none rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
              <Settings className="h-5 w-5" />
              Sync Settings
            </CardTitle>
            <CardDescription>
              Configure how interviews sync with your calendars
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-sync</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync calendar changes
                </p>
              </div>
              <Switch
                checked={settings.autoSync}
                onCheckedChange={(checked) =>
                  setSettings((s) => ({ ...s, autoSync: checked }))
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Sync Frequency</Label>
              <Select
                value={settings.syncFrequency}
                onValueChange={(value) =>
                  setSettings((s) => ({ ...s, syncFrequency: value }))
                }
                disabled={!settings.autoSync}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm font-medium">Event Sync Options</p>

              <div className="flex items-center justify-between">
                <Label className="font-normal">Create new events</Label>
                <Switch
                  checked={settings.createEvents}
                  onCheckedChange={(checked) =>
                    setSettings((s) => ({ ...s, createEvents: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-normal">Update existing events</Label>
                <Switch
                  checked={settings.updateEvents}
                  onCheckedChange={(checked) =>
                    setSettings((s) => ({ ...s, updateEvents: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-normal">Delete cancelled events</Label>
                <Switch
                  checked={settings.deleteEvents}
                  onCheckedChange={(checked) =>
                    setSettings((s) => ({ ...s, deleteEvents: checked }))
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified before interviews
                  </p>
                </div>
                <Switch
                  checked={settings.sendReminders}
                  onCheckedChange={(checked) =>
                    setSettings((s) => ({ ...s, sendReminders: checked }))
                  }
                />
              </div>

              <div className="space-y-3">
                <Label>Reminder Time</Label>
                <Select
                  value={settings.reminderTime}
                  onValueChange={(value) =>
                    setSettings((s) => ({ ...s, reminderTime: value }))
                  }
                  disabled={!settings.sendReminders}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes before</SelectItem>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connect Calendar Dialog */}
      <Dialog
        open={!!connectProvider}
        onOpenChange={() => setConnectProvider(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {connectProvider && getProviderIcon(connectProvider)}
              Connect {connectProvider === "google" ? "Google" : "Outlook"}{" "}
              Calendar
            </DialogTitle>
            <DialogDescription>
              You&apos;ll be redirected to{" "}
              {connectProvider === "google" ? "Google" : "Microsoft"} to
              authorize access to your calendar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Permissions requested:</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3" />
                  View your calendar events
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3" />
                  Create and modify events
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3" />
                  Send event invitations
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setConnectProvider(null)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmConnect}
              disabled={isConnecting}
              className="w-full gap-2 sm:w-auto"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  Continue to{" "}
                  {connectProvider === "google" ? "Google" : "Microsoft"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
