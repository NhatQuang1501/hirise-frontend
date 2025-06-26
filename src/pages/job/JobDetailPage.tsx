import React, { useEffect, useState } from "react";
import { jobService } from "@/services/job";
import { jobDetailMetadata } from "@/utils/joblMetadata";
import { format } from "date-fns";
import { ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobCarousel from "@/components/job/JobCarousel";
import JobDescription from "@/components/job/JobDescription";
import JobHeader from "@/components/job/JobHeader";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Interface cho dữ liệu job từ API
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
  responsibilities: string;
  requirements: string;
  benefits: string;
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

        // Xử lý các trường văn bản có dấu xuống dòng thành mảng
        jobData.responsibilities = jobData.responsibilities
          ? jobData.responsibilities.split("\n").filter((item: string) => item.trim() !== "")
          : [];

        // Xử lý requirements và preferred_skills trực tiếp từ API
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

        // Cập nhật tiêu đề trang và meta tags
        document.title = `${jobData.title} - ${jobData.company_name} | HiRise`;

        const metaDescriptionContent = `Apply for the position of ${jobData.title} at ${jobData.company_name}. ${jobData.description.substring(0, 100)}...`;

        // Tạo meta description
        updateMetaTag(
          "name",
          "description",
          metaDescriptionContent || jobDetailMetadata.description,
        );

        // Tạo meta OG title
        updateMetaTag(
          "property",
          "og:title",
          `${jobData.title} - ${jobData.company_name} | HiRise`,
        );

        // Tạo meta OG description
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

  // Chuyển đổi dữ liệu API sang định dạng cần thiết cho các component
  const formatJobForDisplay = (jobData: JobDetail) => {
    return {
      id: jobData.id,
      title: jobData.title,
      company: jobData.company_name,
      logo: jobData.company.logo || "/placeholder-logo.png",
      salary: jobData.salary_display,
      location: jobData.locations.length > 0 ? jobData.locations[0].address : "Remote",
      city: jobData.city || "",
      city_display: jobData.city_display || "N/A",
      time: format(new Date(jobData.created_at), "MMM dd, yyyy"),
      skills: jobData.skills.map((skill) => skill.name),
      experience: capitalizeFirstLetter(jobData.experience_level),
      level: formatExperienceLevel(jobData.experience_level),
      contractType: formatJobType(jobData.job_type),
      interviewProcess: ["Phone interview", "Technical assessment", "Onsite interview"],
      companyDescription: jobData.company.description,
      responsibilities:
        typeof jobData.responsibilities === "string"
          ? jobData.responsibilities
          : String(jobData.responsibilities || ""),
      requirements:
        typeof jobData.requirements === "string"
          ? jobData.requirements
          : String(jobData.requirements || ""),
      preferred_skills:
        typeof jobData.preferred_skills === "string"
          ? jobData.preferred_skills
          : String(jobData.preferred_skills || ""),
      benefits:
        typeof jobData.benefits === "string" ? jobData.benefits : String(jobData.benefits || ""),
    };
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
        return "Full time";
      case "part time":
        return "Part time";
      case "contract":
        return "Contract";
      case "freelance":
        return "Freelance";
      default:
        return capitalizeFirstLetter(type);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "The job you're looking for doesn't exist or has been removed."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const formattedJob = formatJobForDisplay(job);

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        {/* 1. Header - Thông tin cơ bản công việc */}
        <JobHeader job={formattedJob} saved={saved} onSaveJob={handleSaveJob} />

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 2. Chi tiết công việc */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
              <h2 className="mb-6 text-2xl font-bold">
                <ClipboardList className="text-primary mr-2 inline-block" />
                Job Details
              </h2>

              {/* Description */}
              <JobDescription description={job.description} className="mb-8" />

              {/* Responsibilities */}
              <JobResponsibilities responsibilities={job.responsibilities || []} />

              {/* Requirements */}
              <JobRequirements
                basicRequirements={basicRequirements}
                preferredSkills={preferredSkills}
              />

              {/* Benefits */}
              <JobBenefits benefits={job.benefits || []} />
            </div>
          </div>

          {/* 3. Công ty & Nút CTA */}
          <div className="lg:col-span-1">
            <CompanyInfo
              company={{
                id: job.company.id || job.company_name.toLowerCase().replace(/\s+/g, "-"),
                name: job.company.name,
                website: job.company.website,
                founded_year: job.company.founded_year,
                location_names: job.company.locations,
                industry_names: job.company.industry_names || []
              }}
            />

            <SkillTags skills={job.skills.map((skill) => skill.name)} />
          </div>
        </div>

        {/* 4. Carousel: Similar jobs section */}
        <div className="border-primary/10 from-primary/10 to-secondary/20 mt-12 rounded-xl border bg-gradient-to-br px-14 py-8 shadow-lg">
          <JobCarousel
            jobs={[]} // Sẽ được thay thế bằng API call để lấy các job liên quan
            title="Similar Jobs"
            description="Discover more opportunities that match your profile"
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
