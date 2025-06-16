import React from "react";
import {
  Briefcase,
  Building,
  Calendar,
  // Facebook,
  // Github,
  Globe,
  // Instagram,
  // Linkedin,
  MapPin,
  // Twitter,
  // Youtube,
} from "lucide-react";
import { CompanyDetails } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CompanySidebarProps {
  company: CompanyDetails;
  children?: React.ReactNode;
}

// const socialIcons = {
//   linkedin: { icon: Linkedin, color: "hover:text-[#0077B5]" },
//   facebook: { icon: Facebook, color: "hover:text-[#1877F2]" },
//   twitter: { icon: Twitter, color: "hover:text-[#1DA1F2]" },
//   github: { icon: Github, color: "hover:text-[#333]" },
//   instagram: { icon: Instagram, color: "hover:text-[#E4405F]" },
//   youtube: { icon: Youtube, color: "hover:text-[#FF0000]" },
// } as const;

const CompanySidebar: React.FC<CompanySidebarProps> = ({ company, children }) => {
  return (
    <Card className="overflow-hidden border-gray-200 shadow-md transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="bg-primary/5 border-primary/10 flex items-center gap-2 border-b p-5">
          <Building className="text-primary h-5 w-5" />
          <h3 className="text-lg font-semibold">Company Information</h3>
        </div>
        <div className="space-y-5 p-5">
          {company.foundedYear && (
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Calendar className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Founded Year</p>
                <p className="text-muted-foreground text-sm">{company.foundedYear}</p>
              </div>
            </div>
          )}

          {company.locations && company.locations.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <MapPin className="text-primary h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Office Locations</p>
                <div className="text-muted-foreground mt-1 text-sm">
                  {company.locations.map((location, index) => (
                    <div key={index} className="mb-1 rounded-md bg-gray-50 p-2">
                      {location}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {company.industry && (
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Building className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Industry</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {company.industry.split(",").map((industry, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {industry.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {company.website && (
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Globe className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Website</p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm hover:underline"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}

          {company.openPositions !== undefined && (
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Briefcase className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Open Positions</p>
                <p className="text-muted-foreground text-sm">
                  {company.openPositions} {company.openPositions === 1 ? "position" : "positions"}
                </p>
              </div>
            </div>
          )}

          {company.profile?.skill_names && company.profile.skill_names.length > 0 && (
            <div className="mt-6 space-y-2 border-t pt-4">
              <p className="mb-2 text-sm font-medium">Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {company.profile.skill_names.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {children && <div className="mt-4 border-t pt-4">{children}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySidebar;
