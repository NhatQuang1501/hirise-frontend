import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export const TagBadge = ({ children, variant = "secondary", className }: TagBadgeProps) => (
  <Badge variant={variant} className={cn("rounded-full px-3 py-1 text-sm font-normal", className)}>
    {children}
  </Badge>
);
