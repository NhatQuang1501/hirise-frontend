import React from "react";
import {
  Building2,
  Calendar,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import { CompanyDetails } from "@/types/company";

interface CompanySidebarProps {
  company: CompanyDetails;
  children?: React.ReactNode;
}

const socialIcons = {
  linkedin: { icon: Linkedin, color: "hover:text-[#0077B5]" },
  facebook: { icon: Facebook, color: "hover:text-[#1877F2]" },
  twitter: { icon: Twitter, color: "hover:text-[#1DA1F2]" },
  github: { icon: Github, color: "hover:text-[#333]" },
  instagram: { icon: Instagram, color: "hover:text-[#E4405F]" },
  youtube: { icon: Youtube, color: "hover:text-[#FF0000]" },
} as const;

const CompanySidebar = ({ company }: CompanySidebarProps) => {
  return (
    <div className="space-y-6 lg:top-24">
      {/* General Information */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">General Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="text-primary mt-1 size-5" />
            <div>
              <p className="text-sm font-medium">Industry</p>
              <p className="text-muted-foreground">{company.industry}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="text-primary mt-1 size-5" />
            <div>
              <p className="text-sm font-medium">Company size</p>
              <p className="text-muted-foreground">{company.size}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="text-primary mt-1 size-5" />
            <div>
              <p className="text-sm font-medium">Founded</p>
              <p className="text-muted-foreground">{company.founded}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Globe className="text-primary mt-1 size-5" />
            <div>
              <p className="text-sm font-medium">Website</p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {new URL(company.website).hostname}
              </a>
            </div>
          </div>
          {company.email && (
            <div className="flex items-start gap-3">
              <Mail className="text-primary mt-1 size-5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a href={`mailto:${company.email}`} className="text-primary hover:underline">
                  {company.email}
                </a>
              </div>
            </div>
          )}
          {company.phone && (
            <div className="flex items-start gap-3">
              <Phone className="text-primary mt-1 size-5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <a href={`tel:${company.phone}`} className="text-primary hover:underline">
                  {company.phone}
                </a>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <MapPin className="text-primary mt-1 size-5" />
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-muted-foreground">{company.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Replace the existing Social Media Links section with: */}
      {company.socialMedia && Object.keys(company.socialMedia).length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Connect with us</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(company.socialMedia).map(([platform, url]) => {
              if (!url) return null;
              const socialType = platform.toLowerCase() as keyof typeof socialIcons;
              const { icon: Icon, color } = socialIcons[socialType] || {
                icon: Globe,
                color: "hover:text-primary",
              };

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${color}`}
                  title={`Visit our ${platform}`}
                >
                  <Icon className="size-8" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanySidebar;
