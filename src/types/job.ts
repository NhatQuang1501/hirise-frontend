export interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  salary: string;
  location: string;
  time: string;
  skills: string[];
  experience: string;
  level: string;
  contractType: string;
  interviewProcess: string[];
  responsibilities: string[];
  basicRequirements: string[];
  preferredSkills: string[];
  benefits: string[];
  companyDescription: string;
}

export interface JobCardData {
  id: number;
  company: string;
  logo: string;
  title: string;
  salary: string;
  location: string;
  time: string;
  skills: string[];
}
