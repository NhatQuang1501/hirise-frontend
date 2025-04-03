import React, { useEffect } from "react";
import BenefitsSection from "@/components/home/BenefitsSection";
import { CompanyCarousel } from "@/components/home/CompanyCarousel";
import HeroSection from "@/components/home/HeroSection";
import JobList from "@/components/home/JobList";
import NewsletterSection from "@/components/home/NewsletterSection";
import { homeMetadata } from "./homeMetadata";

// Dữ liệu mẫu (thực tế sẽ được lấy từ API/Redux/Context)
const jobsData = [
  {
    id: 1,
    company: "FPT Software",
    logo: "/company-logos/fpt.png",
    title: "Senior Frontend Developer",
    salary: "$1,500 - $2,500",
    location: "Hà Nội",
    time: "2 giờ trước",
    skills: ["ReactJS", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    company: "VNG Corporation",
    logo: "/company-logos/vng.png",
    title: "Backend Engineer - Python",
    salary: "$1,800 - $3,000",
    location: "TP. Hồ Chí Minh",
    time: "5 giờ trước",
    skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 3,
    company: "Tiki",
    logo: "/company-logos/tiki.png",
    title: "DevOps Engineer",
    salary: "$2,000 - $3,500",
    location: "Remote",
    time: "1 ngày trước",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
  {
    id: 4,
    company: "Shopee",
    logo: "/company-logos/shopee.png",
    title: "Data Engineer",
    salary: "$1,500 - $2,800",
    location: "TP. Hồ Chí Minh",
    time: "2 ngày trước",
    skills: ["Python", "Spark", "SQL"],
  },
  {
    id: 5,
    company: "Zalo",
    logo: "/company-logos/zalo.png",
    title: "Mobile Developer (iOS)",
    salary: "$1,700 - $2,700",
    location: "TP. Hồ Chí Minh",
    time: "3 ngày trước",
    skills: ["Swift", "iOS", "UIKit"],
  },
  {
    id: 6,
    company: "Grab",
    logo: "/company-logos/grab.png",
    title: "QA Engineer",
    salary: "$1,200 - $2,200",
    location: "Hà Nội",
    time: "3 ngày trước",
    skills: ["Selenium", "Cypress", "Automation"],
  },
  {
    id: 7,
    company: "NashTech",
    logo: "/company-logos/nashtech.png",
    title: "Solution Architect",
    salary: "$3,000 - $5,000",
    location: "TP. Hồ Chí Minh",
    time: "4 ngày trước",
    skills: ["AWS", "Microservices", "System Design"],
  },
  {
    id: 8,
    company: "Sendo",
    logo: "/company-logos/sendo.png",
    title: "UI/UX Designer",
    salary: "$1,300 - $2,300",
    location: "TP. Hồ Chí Minh",
    time: "5 ngày trước",
    skills: ["Figma", "Adobe XD", "UI Design"],
  },
];

const companiesData = [
  {
    id: 1,
    name: "FPT Software",
    logo: "/company-logos/fpt.png",
    jobCount: "120+",
    industry: "Software Development",
  },
  {
    id: 2,
    name: "VNG Corporation",
    logo: "/company-logos/vng.png",
    jobCount: "85+",
    industry: "Digital Products & Services",
  },
  {
    id: 3,
    name: "Shopee",
    logo: "/company-logos/shopee.png",
    jobCount: "50+",
    industry: "E-commerce",
  },
  {
    id: 4,
    name: "Tiki",
    logo: "/company-logos/tiki.png",
    jobCount: "45+",
    industry: "E-commerce",
  },
  {
    id: 5,
    name: "Momo",
    logo: "/company-logos/momo.png",
    jobCount: "30+",
    industry: "Fintech",
  },
  {
    id: 6,
    name: "VNPAY",
    logo: "/company-logos/vnpay.png",
    jobCount: "25+",
    industry: "Fintech",
  },
  {
    id: 7,
    name: "Grab",
    logo: "/company-logos/grab.png",
    jobCount: "40+",
    industry: "Transportation & Delivery",
  },
  {
    id: 8,
    name: "Zalo",
    logo: "/company-logos/zalo.png",
    jobCount: "35+",
    industry: "Social Media & Communications",
  },
];

const HomePage: React.FC = () => {
  // Cập nhật title cho trang - React 19 approach
  useEffect(() => {
    document.title = homeMetadata.title;
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <JobList jobs={jobsData} />
      <CompanyCarousel companies={companiesData} />
      <BenefitsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
