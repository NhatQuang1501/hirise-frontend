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
