import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Job, JobCardData } from "@/types/job";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobCarousel from "@/components/job/JobCarousel";
import JobHeader from "@/components/job/JobHeader";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { jobDetailMetadata } from "./joblMetadata";

// Mẫu dữ liệu (sau này sẽ được lấy từ API)
const jobsData: Job[] = [
  {
    id: 1,
    company: "FPT Software",
    logo: "/company-logos/fpt.png",
    title: "Senior React Developer",
    salary: "$2,500 - $3,500",
    location: "Hanoi",
    time: "1 day ago",
    skills: ["React", "TypeScript", "NodeJS"],
    experience: "3-5 years",
    level: "Senior",
    contractType: "Full-time",
    interviewProcess: ["Phone interview", "Technical interview", "Contract proposal"],
    responsibilities: [
      "Develop and maintain web applications using React, Redux, and TypeScript",
      "Collaborate with the backend team to integrate APIs and optimize performance",
      "Design and implement technical solutions that meet business requirements",
      "Develop and maintain frontend architecture, ensuring scalability and maintainability",
      "Work in an Agile/Scrum environment",
    ],
    basicRequirements: [
      "3-5 years of experience with React and modern frontend technologies",
      "Proficient in JavaScript/TypeScript, HTML5, CSS3",
      "Deep understanding of React Hooks, Redux, and state management",
      "Experience with RESTful APIs and GraphQL",
      "Knowledge of web performance optimization best practices",
    ],
    preferredSkills: [
      "Experience with Next.js, Gatsby, or other React frameworks",
      "Knowledge of testing with Jest, React Testing Library, and Cypress",
      "Experience with CI/CD pipelines",
      "Experience with UI libraries like Material-UI, Ant Design, or Tailwind CSS",
      "Excellent communication skills in English",
    ],
    benefits: [
      "Competitive salary and performance-based rewards",
      "Comprehensive health insurance for employees and their families",
      "Flexible work schedule and remote work policy",
      "International, dynamic work environment",
      "Continuous professional development training",
      "Team building activities and company events",
    ],
    companyDescription:
      "FPT Software is a leading IT company in Vietnam, specializing in providing software services and solutions to global customers.",
  },
  {
    id: 2,
    company: "VNG Corporation",
    logo: "/company-logos/vng.png",
    title: "DevOps Engineer",
    salary: "$2,000 - $3,000",
    location: "Ho Chi Minh City",
    time: "2 days ago",
    skills: ["Docker", "Kubernetes", "AWS"],
    experience: "2-4 years",
    level: "Middle",
    contractType: "Full-time",
    interviewProcess: ["Phone interview", "Technical interview", "Contract proposal"],
    responsibilities: [
      "Design and implement CI/CD solutions",
      "Manage and optimize systems on AWS and Kubernetes",
      "Automate software development processes",
      "Monitor and ensure system availability",
      "Build internal tools to improve development processes",
    ],
    basicRequirements: [
      "2-4 years of experience with DevOps and Cloud Infrastructure",
      "Experience with Docker, Kubernetes, and container orchestration",
      "Proficient in AWS and other cloud services",
      "Experience with CI/CD tools like Jenkins, GitLab CI, GitHub Actions",
      "Strong knowledge of networking, security, and monitoring",
    ],
    preferredSkills: [
      "Certifications in AWS, Google Cloud, or Azure",
      "Experience with IaC using Terraform or CloudFormation",
      "Experience with ELK stack or other logging/monitoring solutions",
      "Knowledge of microservices and cloud-native architecture",
      "Scripting skills with Python, Bash, or Go",
    ],
    benefits: [
      "Modern and dynamic work environment",
      "Opportunities to learn and grow in the latest technology field",
      "Attractive salary and regular performance evaluations",
      "Health insurance and other benefits",
      "Team building activities and company events",
      "Flexible work schedule and remote work policy",
    ],
    companyDescription:
      "VNG is one of the leading internet and technology companies in Vietnam, with a thriving ecosystem of technology products and digital services with millions of users.",
  },
];

// Mẫu dữ liệu công việc mới nhất
const latestJobs: JobCardData[] = [
  {
    id: 3,
    company: "Shopee",
    logo: "/company-logos/shopee.png",
    title: "Frontend Developer",
    salary: "$1,800 - $2,500",
    location: "Ho Chi Minh City",
    time: "3 days ago",
    skills: ["JavaScript", "React", "CSS"],
  },
  {
    id: 4,
    company: "Tiki",
    logo: "/company-logos/tiki.png",
    title: "Product Manager",
    salary: "$2,000 - $3,000",
    location: "Ho Chi Minh City",
    time: "4 days ago",
    skills: ["Agile", "Scrum", "Product Development"],
  },
  {
    id: 5,
    company: "Momo",
    logo: "/company-logos/momo.png",
    title: "Backend Engineer",
    salary: "$2,200 - $3,200",
    location: "Ho Chi Minh City",
    time: "2 days ago",
    skills: ["Java", "Spring Boot", "Microservices"],
  },
  {
    id: 6,
    company: "VNPAY",
    logo: "/company-logos/vnpay.png",
    title: "Data Engineer",
    salary: "$2,000 - $2,800",
    location: "Hanoi",
    time: "3 days ago",
    skills: ["Python", "SQL", "Data Pipeline"],
  },
];

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Sau này sẽ thay bằng API call thực tế
    const jobDetail = jobsData.find((job) => job.id === Number(id));
    setJob(jobDetail || null);

    // Cập nhật tiêu đề trang và meta tags - React 19 approach
    if (jobDetail) {
      document.title = `${jobDetail.title} - ${jobDetail.company} | HiRise`;

      // Sử dụng metadata từ file riêng trong trường hợp không có dữ liệu chi tiết
      const metaDescriptionContent = `Apply for the position of ${jobDetail.title} at ${jobDetail.company}. ${jobDetail.basicRequirements[0]}`;

      // Tạo meta description
      updateMetaTag("name", "description", metaDescriptionContent || jobDetailMetadata.description);

      // Tạo meta OG title
      updateMetaTag("property", "og:title", `${jobDetail.title} - ${jobDetail.company} | HiRise`);

      // Tạo meta OG description
      updateMetaTag(
        "property",
        "og:description",
        `Apply for the position of ${jobDetail.title} at ${jobDetail.company}. Salary: ${jobDetail.salary}`,
      );
    }

    // Cuộn lên đầu trang
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

  const handleSaveJob = () => {
    setSaved(!saved);
    // Thêm logic lưu công việc vào API sau này
  };

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        {/* 1. Header - Thông tin cơ bản công việc */}
        <JobHeader job={job} saved={saved} onSaveJob={handleSaveJob} />

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 2. Chi tiết công việc */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
              <h2 className="mb-6 text-2xl font-bold">Job description</h2>

              {/* Responsibilities */}
              <JobResponsibilities responsibilities={job.responsibilities} />

              {/* Requirements */}
              <JobRequirements
                basicRequirements={job.basicRequirements}
                preferredSkills={job.preferredSkills}
              />

              {/* Benefits */}
              <JobBenefits benefits={job.benefits} />
            </div>
          </div>

          {/* 3. Công ty & Nút CTA */}
          <div className="lg:col-span-1">
            <CompanyInfo
              company={job.company}
              companyDescription={job.companyDescription}
              saved={saved}
              onSaveJob={handleSaveJob}
            />

            <SkillTags skills={job.skills} />
          </div>
        </div>

        {/* 4. Carousel: Công việc mới nhất */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Latest jobs</h2>
          <JobCarousel jobs={latestJobs} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
