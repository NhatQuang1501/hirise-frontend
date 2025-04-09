import React, { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TabContentSectionProps {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  children: ReactNode;
  viewAllLink?: string;
  onViewAll?: () => void;
}

const TabContentSection: React.FC<TabContentSectionProps> = ({
  title,
  icon,
  iconColor = "text-primary",
  children,
  viewAllLink,
  onViewAll,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <div className={iconColor}>{icon}</div>
          <span>{title}</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary flex items-center gap-1"
          onClick={onViewAll}
        >
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
};

export default TabContentSection;
