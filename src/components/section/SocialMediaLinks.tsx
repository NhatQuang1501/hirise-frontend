import React from "react";
import { ExternalLink, Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialMediaLinks {
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  [key: string]: string | undefined; // Thêm index signature cho các platform tùy chỉnh
}

interface SocialMediaLinksProps {
  links: SocialMediaLinks;
  className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ links, className }) => {
  // Định nghĩa icon cho mỗi platform
  const socialIcons: Record<string, { icon: React.ReactNode; label: string }> = {
    website: { icon: <Globe className="h-5 w-5" />, label: "Website" },
    facebook: { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    twitter: { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    linkedin: { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    instagram: { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
  };

  // Lọc ra những link thực sự có giá trị
  const validLinks = Object.entries(links).filter(([_, value]) => value && value.trim() !== "");

  if (validLinks.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {validLinks.map(([platform, url]) => {
        // Kiểm tra xem platform có trong socialIcons không
        const iconInfo = socialIcons[platform];

        // Nếu không có icon được định nghĩa, sử dụng icon mặc định
        const icon = iconInfo?.icon || <ExternalLink className="h-5 w-5" />;
        const label = iconInfo?.label || platform.charAt(0).toUpperCase() + platform.slice(1);

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:border-primary hover:bg-primary/5 border-border flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
            title={label}
          >
            {icon}
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
