import React, { useEffect, useState } from "react";
import { jobService } from "@/services/job";
import { jobDetailMetadata } from "@/utils/joblMetadata";
import { format } from "date-fns";
import { ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Job } from "@/types/job";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobCarousel from "@/components/job/JobCarousel";
import JobDescription from "@/components/job/JobDescription";
import JobHeader from "@/components/job/JobHeader";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Interface for job data from API
interface JobLocation {
  id: string;
  address: string;
  country: string;
  description: string;
}

interface JobIndustry {
  id: string;
  name: string;
}

interface JobSkill {
  id: string;
  name: string;
  description: string;
}

interface JobCompany {
  id: string;
  name: string;
  website: string;
  logo: string | null;
  description: string;
  benefits: string;
  founded_year: number;
  locations: string[];
  industries: string[];
  skills: string[];
  location_names: string[];
  industry_names: string[];
  skill_names: string[];
}

interface JobDetail {
  id: string;
  title: string;
  company: JobCompany;
  company_name: string;
  description: string;
  responsibilities: string | string[];
  requirements: string;
  benefits: string | string[];
  status: string;
  status_display: string;
  job_type: string;
  experience_level: string;
  min_salary: number | null;
  max_salary: number | null;
  currency: string;
  is_salary_negotiable: boolean;
  salary_display: string;
  closed_date: string;
  locations: JobLocation[];
  industries: JobIndustry[];
  skills: JobSkill[];
  created_at: string;
  updated_at: string;
  application_count: number;
  is_saved: boolean;
  city: string;
  city_display: string;
  preferred_skills: string;
}

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [basicRequirements, setBasicRequirements] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const jobData = await jobService.getJobById(id);

        // Process text fields with line breaks into arrays
        jobData.responsibilities = jobData.responsibilities
          ? jobData.responsibilities.split("\n").filter((item: string) => item.trim() !== "")
          : [];

        // Process requirements and preferred_skills directly from API
        const requirements = jobData.requirements || "";
        const preferredSkills = jobData.preferred_skills || "";

        setBasicRequirements(requirements.split("\n").filter((item: string) => item.trim() !== ""));

        setPreferredSkills(
          preferredSkills.split("\n").filter((item: string) => item.trim() !== ""),
        );

        jobData.benefits = jobData.benefits
          ? jobData.benefits.split("\n").filter((item: string) => item.trim() !== "")
          : [];

        setJob(jobData);
        setSaved(jobData.is_saved);

        // Update page title and meta tags
        document.title = `${jobData.title} - ${jobData.company_name} | HiRise`;

        const metaDescriptionContent = `Apply for the position of ${jobData.title} at ${jobData.company_name}. ${jobData.description.substring(0, 100)}...`;

        // Create meta description
        updateMetaTag(
          "name",
          "description",
          metaDescriptionContent || jobDetailMetadata.description,
        );

        // Create OG title meta tag
        updateMetaTag(
          "property",
          "og:title",
          `${jobData.title} - ${jobData.company_name} | HiRise`,
        );

        // Create OG description meta tag
        updateMetaTag(
          "property",
          "og:description",
          `Apply for the position of ${jobData.title} at ${jobData.company_name}. Salary: ${jobData.salary_display}`,
        );
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    const metaTag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (metaTag) {
      metaTag.setAttribute("content", content);
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute(attributeName, attributeValue);
      newMetaTag.setAttribute("content", content);
      document.head.appendChild(newMetaTag);
    }
  };

  const handleSaveJob = async () => {
    try {
      if (saved) {
        await jobService.unsaveJob(id!);
        toast.success("Job removed from saved jobs");
      } else {
        await jobService.saveJob(id!);
        toast.success("Job saved successfully");
      }
      setSaved(!saved);
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatExperienceLevel = (level: string): string => {
    switch (level.toLowerCase()) {
      case "intern":
        return "Intern";
      case "fresher":
        return "Fresher";
      case "junior":
        return "Junior";
      case "middle":
        return "Middle";
      case "senior":
        return "Senior";
      case "lead":
        return "Lead";
      case "manager":
        return "Manager";
      default:
        return capitalizeFirstLetter(level);
    }
  };

  const formatJobType = (type: string): string => {
    switch (type.toLowerCase()) {
      case "full time":
        return "Full-time";
      case "part time":
        return "Part-time";
      case "contract":
        return "Contract";
      case "freelance":
        return "Freelance";
      case "internship":
        return "Internship";
      default:
        return capitalizeFirstLetter(type);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-4">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <ClipboardList className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Job not found"}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Create job object for JobHeader component
  const jobForHeader: Job = {
    id: job.id,
    title: job.title,
    company: job.company_name,
    logo: job.company.logo || "/placeholder-logo.png",
    salary: job.salary_display,
    location: job.locations.length > 0 ? job.locations[0].address : "Remote",
    city: job.city || "",
    city_display: job.city_display || "N/A",
    time: format(new Date(job.created_at), "MMM dd, yyyy"),
    skills: job.skills.map((skill) => skill.name),
    experience: capitalizeFirstLetter(job.experience_level),
    level: formatExperienceLevel(job.experience_level),
    contractType: formatJobType(job.job_type),
    interviewProcess: ["Phone interview", "Technical assessment", "Onsite interview"],
    responsibilities: Array.isArray(job.responsibilities)
      ? job.responsibilities.join("\n")
      : job.responsibilities,
    requirements: job.requirements,
    preferred_skills: job.preferred_skills,
    benefits: Array.isArray(job.benefits) ? job.benefits.join("\n") : job.benefits,
    companyDescription: job.company.description,
    description: job.description,
  };

  // Mock similar jobs for carousel
  const similarJobs = [
    {
      id: 1,
      title: "Similar Position 1",
      company: "Company A",
      logo: "/placeholder-logo.png",
      salary: "$80K - $100K",
      location: "Remote",
      city_display: "New York",
      time: "2 days ago",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      title: "Similar Position 2",
      company: "Company B",
      logo: "/placeholder-logo.png",
      salary: "$75K - $95K",
      location: "Remote",
      city_display: "San Francisco",
      time: "3 days ago",
      skills: ["React", "JavaScript", "CSS"],
    },
    {
      id: 3,
      title: "Similar Position 3",
      company: "Company C",
      logo: "/placeholder-logo.png",
      salary: "$85K - $105K",
      location: "Remote",
      city_display: "Boston",
      time: "1 week ago",
      skills: ["React", "Redux", "API"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <JobHeader job={jobForHeader} saved={saved} onSaveJob={handleSaveJob} />

          <div className="mt-8">
            <SkillTags skills={job.skills.map((skill) => skill.name)} />
          </div>

          <div className="mt-8">
            <JobDescription description={job.description} />
          </div>

          <div className="mt-8">
            <JobResponsibilities responsibilities={job.responsibilities} />
          </div>

          <div className="mt-8">
            <JobRequirements
              basicRequirements={basicRequirements}
              preferredSkills={preferredSkills}
            />
          </div>

          <div className="mt-8">
            <JobBenefits benefits={job.benefits} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Similar Jobs</h2>
            <div className="mt-4">
              <JobCarousel jobs={similarJobs} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <CompanyInfo
              company={{
                id: job.company.id,
                name: job.company.name,
                website: job.company.website,
                founded_year: job.company.founded_year,
                location_names: job.company.location_names,
                industry_names: job.company.industry_names || [],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
