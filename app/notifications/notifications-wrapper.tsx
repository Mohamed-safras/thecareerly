"use client";
import { Card, CardContent } from "@/components/ui/card";
import { NotificationHeader } from "@/features/notifications/components/notification-header";
import { NotificationList } from "@/features/notifications/components/notification-list";
import { NotificationSearch } from "@/features/notifications/components/notification-search";
import { NotificationTabs } from "@/features/notifications/components/notification-tabs";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { NotificationPreferencesDialog } from "./notification-preferences-wrapper";

const NotificationsWrapper = () => {
  const [prefsDialogOpen, setPrefsDialogOpen] = useState(false);

  const {
    notifications,
    activeTab,
    preferences,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedTypes,
    toggleType,
    counts,
    unreadCount,
    markAllAsRead,
    clearAll,
    updatePreferences,
  } = useNotifications();

  const handleAction = (url: string) => {
    redirect(url);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast(`${unreadCount} notifications marked as read.`);
  };

  const handleClearAll = () => {
    clearAll();
    toast("All notifications have been removed.");
  };

  const handleSavePreferences = (prefs: typeof preferences) => {
    updatePreferences(prefs);
    toast.success("Notification preferences updated");
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}

      <Card className="p-0 shadow-none rounded-lg">
        <CardContent className="p-3 space-y-6">
          {/* Header */}
          <NotificationHeader
            onMarkAllAsRead={handleMarkAllAsRead}
            onOpenSettings={() => setPrefsDialogOpen(true)}
            onClearAll={handleClearAll}
          />

          {/* Search & Filter */}
          <NotificationSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTypes={selectedTypes}
            onTypeToggle={toggleType}
          />

          {/* Tabs */}
          <NotificationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          {/* Notification List */}
          <NotificationList
            notifications={notifications}
            onAction={handleAction}
          />
        </CardContent>
      </Card>

      <NotificationPreferencesDialog
        open={prefsDialogOpen}
        onOpenChange={setPrefsDialogOpen}
        preferences={preferences}
        onSave={handleSavePreferences}
      />
    </div>
  );
};

export default NotificationsWrapper;
