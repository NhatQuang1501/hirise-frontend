import { useEffect, useState } from "react";
import { Bell, Check, Eye } from "lucide-react";
import { useNotification } from "@/types/useNotification";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NotificationBadge } from "./NotificationBadge";
import { NotificationList } from "./NotificationList";

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState("w-[380px]");
  const { unreadCount, markAllAsRead, notifications } = useNotification();

  // Responsive width adjustment
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setContentWidth("w-[calc(100vw-32px)]");
      } else {
        setContentWidth("w-[380px]");
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative mr-4 transition-colors",
            unreadCount > 0 && "text-primary hover:text-primary/90",
            isOpen && "bg-muted",
          )}
          aria-label={`${unreadCount} unread notifications`}
        >
          <Bell className="size-5" />
          {unreadCount > 0 && <NotificationBadge count={unreadCount} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(contentWidth, "border-border/60 border p-0 shadow-lg")}
        align="end"
        sideOffset={8}
        alignOffset={0}
      >
        <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3.5">
          <div className="flex items-center gap-2">
            <Bell className="text-primary size-4" />
            <h3 className="text-primary font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-primary/15 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                {unreadCount} new
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "hover:bg-primary/5 text-xs font-medium",
                unreadCount > 0
                  ? "text-muted-foreground hover:text-primary"
                  : "text-green-600 hover:text-green-700",
              )}
              onClick={markAllAsRead}
            >
              {unreadCount > 0 ? (
                <>
                  <Eye className="mr-1.5 size-3.5" />
                  Mark all as read
                </>
              ) : (
                <>
                  <Check className="mr-1.5 size-3.5" />
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
