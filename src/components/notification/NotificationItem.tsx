import { formatDistanceToNow } from "date-fns";
import {
  AlertCircle,
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
  application: "text-blue-500",
  job: "text-purple-500",
  profile: "text-green-500",
  system: "text-orange-500",
  success: "text-green-500",
  error: "text-red-500",
  message: "text-blue-500",
} as const;

export function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type] || AlertCircle;
  const colorClass = notificationColors[notification.type];

  const content = (
    <div
      className={cn(
        "group hover:bg-muted/50 flex cursor-pointer items-start gap-4 border-b p-4 transition-colors",
        !notification.read && "bg-primary/5",
      )}
      onClick={() => onRead(notification.id)}
      role="button"
      tabIndex={0}
    >
      <div className={cn("mt-1 size-8 shrink-0 rounded-full p-2", `${colorClass}/10`)}>
        <Icon className={cn("size-4", colorClass)} />
      </div>
      <div className="flex-1 space-y-1">
        <p
          className={cn(
            "text-foreground/90 text-sm leading-snug",
            !notification.read && "font-medium",
          )}
        >
          {notification.message}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </span>
          {!notification.read && (
            <span className="bg-primary/10 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
              New
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return notification.link ? <Link to={notification.link}>{content}</Link> : content;
}
