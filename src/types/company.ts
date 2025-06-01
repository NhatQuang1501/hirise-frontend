export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  jobCount: number;
  followerCount: number;
  isFollowing: boolean;
  newJobsToday: number;
  description: string;
}

export interface CompanyCardProps {
  company: Company;
  onFollowToggle?: (companyId: string) => void;
}

export interface CompanyDetails extends Company {
  size: string;
  founded: string;
  type: string;
  website: string;
  email?: string;
  phone?: string;
  address: string;
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
  openPositions: number;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  cvLink: string;
  matchingScore?: number;
  applyDate: string;
  status: "New" | "Reviewing" | "Interviewed" | "Offered" | "Rejected";
}

export interface CompanyJob {
  id: string;
  title: string;
  companyId?: string;
  company: string;
  logo?: string | null;
  location: string;
  city?: string;
  city_display?: string;
  contractType: string;
  salary: string;
  skills: string[];
  level: string;
  experience: string;
  deadline: string;
  status: JobStatus;
  description?: string;
  responsibilities: string[];
  basicRequirements: string[];
  preferredSkills: string[];
  benefits: string[];
  interviewProcess: string[];
  companyDescription: string;
  applicationCount?: number;
  applicantCount?: number;
  createdDate?: string;
  time?: string;
}

export type JobStatus = "Draft" | "Published" | "Closed";
