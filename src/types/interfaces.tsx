import { Company } from "@/types/company";
import { CompanyDetails } from "@/types/company";

export interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  confirmButtonClassName?: string;
}

export interface TagInputProps {
  placeholder?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  className?: string;
}

export interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  suggestions?: string[];
}

export interface CompanyCarouselProps {
  companies: Company[];
  title?: string;
  description?: string;
  viewAllLink?: string;
}

export interface CompanyHeaderProps {
  company: CompanyDetails;
  isFollowing: boolean;
  onFollow: () => void;
  className?: string;
}

export interface CompanyInfoProps {
  company: {
    id: string;
  };
  companyDescription: string;
  saved: boolean;
  onSaveJob: () => void;
}

export interface CompanyJobsProps {
  companyId: string;
  openPositions: number;
}

export interface CompanyTabsProps {
  companyName: string;
  companyLocation: string;
  followerCount: number;
  activeSection: string;
  onTabClick: (section: string) => void;
  className?: string;
}

export interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  salary: string;
  location: string;
  time: string;
  skills: string[];
}

export interface JobCarouselProps {
  jobs: Job[];
}
