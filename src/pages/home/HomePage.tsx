import React, { useEffect, useState } from "react";
import { jobService } from "@/services/job";
import { homeMetadata } from "@/utils/homeMetadata";
import { JobCardData } from "@/types/job";
import { topCompaniesData } from "@/types/mockData";
import api from "@/config/api";
import CompanyCarousel from "@/components/company/CompanyCarousel";
import BenefitsSection from "@/components/home/BenefitsSection";
import HeroSection from "@/components/home/HeroSection";
import JobList from "@/components/home/JobList";
import NewsletterSection from "@/components/home/NewsletterSection";
// Import logo images
import fptLogo from "@/assets/images/fpt.png";
import shopeeLogo from "@/assets/images/shopee.png";
import tikiLogo from "@/assets/images/tiki.png";

const DEFAULT_LOGO = fptLogo;

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [companies, setCompanies] = useState(topCompaniesData);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  // Cập nhật title cho trang
  useEffect(() => {
    document.title = homeMetadata.title;
  }, []);

  // Lấy dữ liệu companies từ API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const response = await api.get("/companies/");

        if (response.data?.results?.length > 0) {
          const formattedCompanies = response.data.results.slice(0, 5).map((company: any) => ({
            id: company.id,
            name: company.name,
            logo: getCompanyLogo(company.name) || DEFAULT_LOGO, // Use custom function to get logo
            jobCount: company.job_count || 0,
            industry: company.industry || "",
            location: company.location || "Vietnam",
            followerCount: company.follower_count || 0,
            isFollowing: false,
            newJobsToday: company.new_jobs_today || 0,
            description: company.description || "",
          }));
          setCompanies(formattedCompanies);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        // Giữ lại dữ liệu mẫu nếu có lỗi
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  // Lấy dữ liệu jobs từ API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Xây dựng tham số lọc dựa trên bộ lọc hiện tại
        const filters: any = {
          page: 1,
          page_size: 8,
          status: "published",
        };

        // Thêm tham số lọc dựa trên activeFilter
        if (activeFilter === "latest") {
          filters.ordering = "-created_at";
        } else if (activeFilter === "remote") {
          filters.location = "remote";
        } else if (activeFilter === "freelance") {
          filters.job_type = "freelance";
        }

        const response = await jobService.getJobs(filters);
        console.log("API Response:", response); // For debugging

        // Use data array instead of results
        const jobResults = response?.data || [];
        console.log("Job Results:", jobResults); // For debugging

        // Chuyển đổi dữ liệu từ API sang định dạng JobCardData
        const formattedJobs: JobCardData[] = jobResults.map((job: any) => ({
          id: job.id,
          company: job.company?.name || job.company_name || "Unknown Company",
          logo: getCompanyLogo(job.company?.name || job.company_name) || DEFAULT_LOGO,
          title: job.title,
          salary:
            job.min_salary && job.max_salary
              ? `${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()} ${job.currency}`
              : job.salary_display || "Negotiable",
          location: job.locations?.[0]?.address || "Remote",
          time: new Date(job.created_at).toLocaleDateString("en-US"),
          skills: job.skills?.map((skill: any) => skill.name) || [],
        }));

        console.log("Formatted Jobs:", formattedJobs); // For debugging
        setJobs(formattedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Can't load job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [activeFilter]);

  // Helper function để lấy logo dựa trên tên công ty
  const getCompanyLogo = (companyName?: string): string => {
    if (!companyName) return DEFAULT_LOGO;

    const name = companyName.toLowerCase();
    if (name.includes("fpt")) return fptLogo;
    if (name.includes("tiki")) return tikiLogo;
    if (name.includes("shopee")) return shopeeLogo;

    return DEFAULT_LOGO;
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-col">
      <HeroSection />

      {error ? (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <JobList
          jobs={jobs}
          loading={loading}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      )}

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <CompanyCarousel
            companies={companies}
            title="Featured Companies"
            description="Work with top technology companies"
            loading={loadingCompanies}
          />
        </div>
      </section>
      <BenefitsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
