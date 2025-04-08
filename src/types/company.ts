export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  rating: number;
  reviewCount: number;
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
