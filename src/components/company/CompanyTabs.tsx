import React from "react";
import { MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyTabsProps {
  companyName: string;
  companyLocation: string;
  followerCount: number;
  activeSection: string;
  onTabClick: (section: string) => void;
  className?: string;
}

const CompanyTabs = ({ 
  companyName, 
  companyLocation,
  followerCount,
  activeSection, 
  onTabClick,
  className 
}: CompanyTabsProps) => {
  return (
    <div className={cn("border-b", className)}>
      <div className="lg:col-span-8 mx-auto max-w-screen-xl px-4">
        {/* Remove company info since it's now in the sticky header */}
        <div className="flex space-x-8">
          {[
            { id: "about", label: "Company Profile" },
            { id: "jobs", label: "Opening Jobs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={cn(
                "relative py-4 text-sm font-medium transition-colors",
                "hover:text-primary focus-visible:outline-none",
                activeSection === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTabs;