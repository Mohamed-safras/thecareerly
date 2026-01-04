"use client";
import { useState, useMemo, useCallback } from "react";
import { NotificationType } from "@/types/notification";
import { mockNotifications } from "../data/mock-notifications";
import {
  Notification,
  NotificationPreferences,
} from "@/interfaces/notification";
import { defaultNotificationPreferences } from "../data/preferences";

type TabValue = "all" | "unread" | "read";

export const useNotifications = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<NotificationType[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences
  );

  const filteredNotifications = useMemo(() => {
    let result = notifications;

    // Filter by tab
    if (activeTab === "unread") {
      result = result.filter((n) => !n.isRead);
    } else if (activeTab === "read") {
      result = result.filter((n) => n.isRead);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query)
      );
    }

    // Filter by selected types
    if (selectedTypes.length > 0) {
      result = result.filter((n) => selectedTypes.includes(n.type));
    }

    return result;
  }, [notifications, activeTab, searchQuery, selectedTypes]);

  const counts = useMemo(
    () => ({
      all: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      read: notifications.filter((n) => n.isRead).length,
    }),
    [notifications]
  );

  const unreadCount = counts.unread;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleType = useCallback((type: NotificationType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const updatePreferences = useCallback(
    (newPreferences: NotificationPreferences) => {
      setPreferences(newPreferences);
    },
    []
  );
  return {
    notifications: filteredNotifications,
    allNotifications: notifications,
    preferences,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedTypes,
    toggleType,
    counts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    deleteNotification,
    updatePreferences,
  };
};
