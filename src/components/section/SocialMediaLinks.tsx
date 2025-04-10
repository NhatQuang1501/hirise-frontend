import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialMediaLinksProps {
  links: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    github?: string;
  };
  className?: string;
}

const SocialMediaLinks = ({ links, className }: SocialMediaLinksProps) => {
  const socialIcons = {
    linkedin: { icon: Linkedin, color: "hover:text-[#0077B5]" },
    facebook: { icon: Facebook, color: "hover:text-[#1877F2]" },
    twitter: { icon: Twitter, color: "hover:text-[#1DA1F2]" },
    github: { icon: Github, color: "hover:text-[#333]" },
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {Object.entries(links).map(([platform, url]) => {
        if (!url) return null;
        const { icon: Icon, color } = socialIcons[platform as keyof typeof socialIcons];
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-muted-foreground transition-colors", color)}
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLinks;
