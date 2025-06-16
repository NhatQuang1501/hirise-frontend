// File: hirise-frontend/src/components/dashboard/NotificationsDropdown.tsx
import React, { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Notification interface
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationsDropdown: React.FC = () => {
  // Example notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Applicant",
      message: "John Smith applied for Senior React Developer position",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Interview Reminder",
      message: "You have an interview with Emily Brown at 3:00 PM today",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Job Status",
      message: 'Your "Product Designer" job has been published successfully',
      time: "2 days ago",
      read: true,
    },
  ]);

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((note) => (note.id === notificationId ? { ...note, read: true } : note)),
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="bg-primary absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            {notifications.map((note) => (
              <DropdownMenuItem
                key={note.id}
                className="cursor-pointer p-3"
                onClick={() => markAsRead(note.id)}
              >
                <div className={`${note.read ? "opacity-60" : "font-medium"} space-y-1`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{note.title}</span>
                    <span className="text-muted-foreground text-xs">{note.time}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">{note.message}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-center text-sm">
              View All Notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center justify-center py-6 text-center">
            <BellOff className="mb-2 size-6 opacity-40" />
            <p className="text-sm">No new notifications</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
