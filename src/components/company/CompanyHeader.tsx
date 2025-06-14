import React from "react";
import { Building, Globe, MapPin, Users } from "lucide-react";
import { CompanyDetails } from "@/types/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CompanyHeaderProps {
  company: CompanyDetails;
  isFollowing: boolean;
  onFollow: () => void;
  className?: string;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  company,
  isFollowing,
  onFollow,
  className,
}) => {
  return (
    <header className={cn("", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          {/* Company Logo */}
          <div className="h-20 w-20 overflow-hidden rounded-lg border bg-white p-1 shadow-sm md:h-24 md:w-24">
            <img
              src={company.logo || "/placeholder-company-logo.png"}
              alt={`${company.name} logo`}
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-company-logo.png";
              }}
            />
          </div>

          {/* Company Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold md:text-3xl">{company.name}</h1>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600 md:justify-start">
              {company.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
              )}

              {company.industry && (
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{company.industry}</span>
                </div>
              )}

              {company.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Follow Button */}
          <div>
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={onFollow}
              className="w-full md:w-auto"
            >
              <Users className="mr-2 h-4 w-4" />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
