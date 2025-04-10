interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  return (
    <div className="animate-in fade-in slide-in-from-top-1 bg-destructive text-destructive-foreground ring-background absolute -top-1 -right-1 flex size-[18px] items-center justify-center rounded-full text-[10px] font-medium ring-2">
      {count > 99 ? "99+" : count}
    </div>
  );
}
