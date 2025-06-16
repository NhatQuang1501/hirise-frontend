export interface ApiCompany {
  id: string;
  username: string;
  email: string;
  role: string;
  is_verified: boolean;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
  profile: {
    name: string;
    website: string;
    logo: string | null;
    description: string;
    benefits: string;
    founded_year: number | null;
    locations: string[];
    industries: string[];
    skills: string[];
    location_names: string[];
    industry_names: string[];
    skill_names: string[];
    follower_count: number;
  };
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  total_pages: number;
  data: T[];
}

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
  website?: string;
  foundedYear?: number | null;
  industries?: string[];
  locations?: string[];
  skills?: string[];
}

export interface CompanyCardProps {
  company: Company;
  onFollowToggle?: (companyId: string) => void;
}

export interface CompanyDetails {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  website: string;
  foundedYear: number;
  size: string;
  industry: string;
  openPositions: number;
  followerCount: number;
  isFollowing: boolean;
  employees: any[];
  benefits: string;
  locations: string[];
  socialMedia: {
    website: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  rating: number;
  reviews: any[];
  profile?: {
    skill_names?: string[];
    [key: string]: any;
  };
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
