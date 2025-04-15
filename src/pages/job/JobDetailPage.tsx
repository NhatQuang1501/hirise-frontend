import React, { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";
import { Job } from "@/types/job";
import { jobsDataDetail, latestJobs } from "@/types/mockData";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobCarousel from "@/components/job/JobCarousel";
import JobHeader from "@/components/job/JobHeader";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { jobDetailMetadata } from "../../utils/joblMetadata";

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Sau này sẽ thay bằng API call thực tế
    const jobDetail = jobsDataDetail.find((job) => job.id === Number(id));
    setJob(jobDetail || null);

    // Cập nhật tiêu đề trang và meta tags
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
              <h2 className="mb-6 text-2xl font-bold">
                <ClipboardList className="text-primary mr-2 inline-block" />
                Job description
              </h2>

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
              company={{ id: job.company }}
              companyDescription={job.companyDescription}
              saved={saved}
              onSaveJob={handleSaveJob}
            />

            <SkillTags skills={job.skills} />
          </div>
        </div>

        {/* 4. Carousel: Latest jobs section */}
        <div className="border-primary/10 from-primary/10 to-secondary/20 mt-12 rounded-xl border bg-gradient-to-br px-14 py-8 shadow-lg">
          <JobCarousel
            jobs={latestJobs}
            title="Latest Jobs"
            description="Discover more opportunities that match your profile"
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
