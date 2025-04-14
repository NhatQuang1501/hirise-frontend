export type JobStatus = 'Draft' | 'Published' | 'Closed';

export interface RecruiterJob extends Job {
  status: JobStatus;
  applicantCount: number;
  createdDate: string;
  deadline: string;
  companyId: string;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  cvLink: string;
  matchingScore?: number;
  applyDate: string;
  status: 'New' | 'Reviewing' | 'Interviewed' | 'Offered' | 'Rejected';
}