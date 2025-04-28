import { z } from "zod";

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

export const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  companyId: z.string({ required_error: "Please select a company" }),
  location: z.string().min(2, { message: "Location cannot be empty" }),
  jobType: z.string({ required_error: "Please select job type" }),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  currency: z.string().default("VND"),
  skills: z.array(z.string()).min(1, { message: "Please add at least 1 skill" }),
  level: z.string({ required_error: "Please select job level" }),
  experience: z.string({ required_error: "Please select experience level" }),
  deadline: z.string({ required_error: "Please select expired date" }),
  responsibilities: z.array(z.string()).optional(),
  basicRequirements: z.array(z.string()).optional(),
  preferredSkills: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
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
  jobType: "",
  salaryMin: "",
  salaryMax: "",
  currency: "VND",
  skills: [],
  level: "",
  experience: "",
  deadline: "",
  responsibilities: [],
  basicRequirements: [],
  preferredSkills: [],
  benefits: [],
  interviewProcess: [],
  description: "",
  visibility: "public",
  status: "Draft",
};
