import { z } from "zod";

export interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  salary: string;
  location: string;
  city?: string;
  city_display?: string;
  time: string;
  skills: string[];
  experience: string;
  level: string;
  contractType: string;
  interviewProcess: string[];
  responsibilities: string;
  requirements: string;
  benefits: string;
  companyDescription: string;
  description?: string;
}
export interface JobCardItem {
  id: string;
  company: string;
  logo: string;
  title: string;
  salary: string;
  location: string;
  city: string;
  city_display: string;
  time: string;
  skills: string[];
  is_saved: boolean;
  type?: string;
  level?: string;
}
export interface JobCardData {
  id: string | number;
  company: string;
  logo: string;
  title: string;
  salary: string;
  location: string;
  time: string;
  skills: string[];
  city: string;
  city_display: string;
  is_saved: boolean;
}

// Update jobFormSchema
export const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  companyId: z.string({ required_error: "Please select a company" }),
  location: z.string().min(2, { message: "Location cannot be empty" }),
  city: z.string({ required_error: "Please select a city" }),
  jobType: z.string({ required_error: "Please select job type" }),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  currency: z.string(),
  skills: z.array(z.string()).min(1, { message: "Please add at least 1 skill" }),
  level: z.string({ required_error: "Please select job level" }),
  deadline: z.string({ required_error: "Please select expired date" }),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  basicRequirements: z.string().optional(),
  preferredSkills: z.string().optional(),
  benefits: z.string().optional(),
  interviewProcess: z.array(z.string()).optional(),
  description: z.string().optional(),
  visibility: z.string().default("public"),
  status: z.enum(["Draft", "Published", "Closed"]),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;

export const DEFAULT_JOB_FORM_VALUES: JobFormValues = {
  title: "",
  companyId: "",
  location: "",
  city: "",
  jobType: "",
  salaryMin: "",
  salaryMax: "",
  currency: "VND",
  skills: [],
  level: "",
  // Xóa trường experience vì đã có level
  deadline: "",
  // Changed from arrays to strings
  responsibilities: "",
  requirements: "",
  basicRequirements: "",
  preferredSkills: "",
  benefits: "",
  interviewProcess: [],
  description: "",
  visibility: "public",
  status: "Draft",
};
