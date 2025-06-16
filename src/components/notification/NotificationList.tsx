import { Bell } from "lucide-react";
import { useNotification } from "@/types/useNotification";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";

export function NotificationList() {
  const { notifications, markAsRead } = useNotification();

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="bg-muted/70 rounded-full p-4">
          <Bell className="text-muted-foreground/70 size-7" />
        </div>
        <div className="space-y-1">
          <h4 className="text-foreground text-sm font-medium">No notifications yet</h4>
          <p className="text-muted-foreground text-xs">We'll notify you when something arrives</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[min(420px,70vh)] overflow-auto">
      <div>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onRead={markAsRead} />
        ))}
      </div>
    </ScrollArea>
  );
}
