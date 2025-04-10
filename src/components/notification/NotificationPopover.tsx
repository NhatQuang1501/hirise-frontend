import { useState } from "react";
import { Bell, Check, CheckAll, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotification } from "@/hooks/useNotification";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NotificationBadge } from "./NotificationBadge";
import { NotificationList } from "./NotificationList";

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, markAllAsRead, notifications } = useNotification();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative transition-colors",
            unreadCount > 0 && "text-primary hover:text-primary/90",
            isOpen && "bg-muted",
          )}
          aria-label={`${unreadCount} unread notifications`}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && <NotificationBadge count={unreadCount} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                {unreadCount} new
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary text-xs"
              onClick={markAllAsRead}
            >
              {unreadCount > 0 ? (
                <>
                  <Eye className="mr-1.5 size-3.5" />
                  Mark all as read
                </>
              ) : (
                <>
                  <CheckAll className="mr-1.5 size-3.5" />
                  All caught up!
                </>
              )}
            </Button>
          )}
        </div>
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
