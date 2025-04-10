import { Bell } from "lucide-react";
import { useNotification } from "@/hooks/useNotification";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";

export function NotificationList() {
  const { notifications, markAsRead } = useNotification();

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <div className="bg-muted rounded-full p-3">
          <Bell className="text-muted-foreground size-6" />
        </div>
        <h4 className="text-muted-foreground text-sm font-medium">No notifications yet</h4>
        <p className="text-muted-foreground text-xs">We'll notify you when something arrives</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[calc(100vh-12rem)] min-h-[350px]">
      <div className="divide-border">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onRead={markAsRead} />
        ))}
      </div>
    </ScrollArea>
  );
}
