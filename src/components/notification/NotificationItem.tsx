import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Mail,
  UserCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Notification } from "@/types/notification";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

const notificationIcons = {
  application: Briefcase,
  job: FileText,
  profile: UserCircle,
  system: AlertCircle,
  success: CheckCircle2,
  error: XCircle,
  message: Mail,
} as const;

const notificationColors = {
  application: "text-blue-600",
  job: "text-purple-600",
  profile: "text-emerald-600",
  system: "text-amber-600",
  success: "text-green-600",
  error: "text-rose-600",
  message: "text-indigo-600",
} as const;

const notificationBgColors = {
  application: "bg-blue-50",
  job: "bg-purple-50",
  profile: "bg-emerald-50",
  system: "bg-amber-50",
  success: "bg-green-50",
  error: "bg-rose-50",
  message: "bg-indigo-50",
} as const;

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type] || AlertCircle;
  const colorClass = notificationColors[notification.type];
  const bgColorClass = notificationBgColors[notification.type];

  return (
    <div
      className={cn(
        "group hover:bg-muted/40 flex cursor-pointer flex-wrap items-start gap-4 border-b p-4 transition-all",
        !notification.read && "bg-primary/5",
      )}
      onClick={() => onRead(notification.id)}
      role="button"
      tabIndex={0}
    >
      <div
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
          bgColorClass,
        )}
      >
        <Icon className={cn("size-4.5", colorClass)} />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <p
          className={cn(
            "text-foreground/90 text-sm leading-snug break-words",
            !notification.read && "font-medium",
          )}
        >
          {notification.message}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </span>
            {!notification.read && (
              <span className="bg-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm">
                New
              </span>
            )}
          </div>

          {notification.link && (
            <Link
              to={notification.link}
              className="inline-flex"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="link"
                size="sm"
                className="text-primary h-auto cursor-pointer px-2 py-1 text-xs font-medium"
              >
                View <ArrowRight className="-ml-0.5 size-3" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
