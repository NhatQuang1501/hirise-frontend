interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  return (
    <div className="animate-in fade-in-50 slide-in-from-top-1 bg-destructive text-destructive-foreground ring-background absolute -top-1.5 -right-1.5 flex size-[20px] items-center justify-center rounded-full text-[10px] font-semibold shadow-sm ring-2">
      {count > 20 ? "20+" : count}
    </div>
  );
}
