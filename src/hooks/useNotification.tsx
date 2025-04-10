import { useEffect, useState } from "react";
import { Notification } from "@/types/notification";

// Mock data - replace with API call later
const mockNotifications: Notification[] = [
  {
    id: "1",
    message: "Your application for Frontend Developer at Google has been viewed",
    read: false,
    createdAt: new Date().toISOString(),
    type: "application",
    link: "/applications/1",
  },
  {
    id: "2",
    message: "New job matching your preferences: Senior React Developer",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    type: "job",
    link: "/jobs/2",
  },
  {
    id: "3",
    message: "Your profile has been updated successfully",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    type: "profile",
    link: "/profile",
  },
  {
    id: "4",
    message: "Your application for Data Scientist at Amazon has been rejected",
    read: true,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    type: "application",
    link: "/applications/5",
  },
];

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Replace with API call
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
