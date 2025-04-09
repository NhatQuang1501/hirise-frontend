import React, { useEffect } from "react";
import { jobsData, topCompaniesData } from "@/types/mockData";
import CompanyCarousel from "@/components/company/CompanyCarousel";
import BenefitsSection from "@/components/home/BenefitsSection";
import HeroSection from "@/components/home/HeroSection";
import JobList from "@/components/home/JobList";
import NewsletterSection from "@/components/home/NewsletterSection";
import { homeMetadata } from "./homeMetadata";

// Dữ liệu mẫu (thực tế sẽ được lấy từ API/Redux/Context)

const HomePage: React.FC = () => {
  // Cập nhật title cho trang - React 19 approach
  useEffect(() => {
    document.title = homeMetadata.title;
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <JobList jobs={jobsData} />
      <section className="border-y bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <CompanyCarousel
            companies={topCompaniesData}
            title="Featured Companies"
            description="Work with the best companies in tech"
          />
        </div>
      </section>
      <BenefitsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
