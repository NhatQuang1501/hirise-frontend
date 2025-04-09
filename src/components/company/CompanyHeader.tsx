import React from "react";
import { MapPin, Users } from "lucide-react";
import { CompanyDetails } from "@/types/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CompanyHeaderProps {
  company: CompanyDetails;
  isFollowing: boolean;
  onFollow: () => void;
  className?: string;
}

const CompanyHeader = ({ company, isFollowing, onFollow, className }: CompanyHeaderProps) => {
  return (
    <div className={cn("container mx-auto", className)}>
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="h-24 w-24 rounded-xl object-contain lg:h-32 lg:w-32"
        />
        <div className="flex-1">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold lg:text-4xl">{company.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground h-5 w-5" />
                  <span className="text-muted-foreground">{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-primary h-5 w-5" />
                  <span className="text-muted-foreground">
                    {company.followerCount.toLocaleString()} followers
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={onFollow}
              variant={isFollowing ? "secondary" : "default"}
              className="w-full sm:w-auto"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
