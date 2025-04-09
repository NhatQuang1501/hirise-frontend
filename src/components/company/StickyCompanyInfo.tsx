import React from "react";
import { MapPin, Users } from "lucide-react";
import { CompanyDetails } from "@/types/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StickyCompanyInfoProps {
  company: CompanyDetails;
  isFollowing: boolean;
  onFollow: () => void;
  isVisible: boolean;
  className?: string;
}

const StickyCompanyInfo = ({
  company,
  isFollowing,
  onFollow,
  isVisible,
  className,
}: StickyCompanyInfoProps) => {
  return (
    <div
      className={cn(
        "border-b bg-white transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-10 w-10 rounded-lg object-contain"
            />
            <div>
              <h2 className="text-lg font-semibold">{company.name}</h2>
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{company.followerCount.toLocaleString()} followers</span>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={onFollow} variant={isFollowing ? "secondary" : "default"} size="sm">
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCompanyInfo;
