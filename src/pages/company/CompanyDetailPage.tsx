import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyDetails } from "@/types/company";
import { jobsData, mockCompanyData } from "@/types/mockData";
import { cn } from "@/lib/utils";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanySidebar from "@/components/company/CompanySidebar";
import CompanyTabs from "@/components/company/CompanyTabs";
import StickyCompanyInfo from "@/components/company/StickyCompanyInfo";
import JobListingSection from "@/components/job/JobListingSection";
import SocialMediaLinks from "@/components/section/SocialMediaLinks";

const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        // Replace with actual API call
        setCompany(mockCompanyData);
        updateMetadata(mockCompanyData);
      } catch (error) {
        console.error("Error fetching company:", error);
        // Handle error (show toast, error boundary, etc.)
      }
    };

    fetchCompany();
  }, [id]);

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current || !jobsRef.current) return;

      const headerHeight = 64; // Approximate height of the main header
      const scrollPosition = window.scrollY;

      // Show/hide sticky header based on scroll position
      setShowStickyHeader(scrollPosition > headerHeight);

      // Existing scroll spy logic
      const aboutOffset = aboutRef.current.offsetTop;
      const jobsOffset = jobsRef.current.offsetTop;
      const scrollWithOffset = scrollPosition + 150;

      if (scrollWithOffset >= jobsOffset) {
        setActiveSection("jobs");
      } else if (scrollWithOffset >= aboutOffset) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (section: string) => {
    const targetRef = section === "about" ? aboutRef : jobsRef;
    if (!targetRef.current) return;

    const offset = 100; // Header height + some padding
    const elementPosition = targetRef.current.offsetTop - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  // Update metadata
  const updateMetadata = (company: CompanyDetails) => {
    document.title = `${company.name} - Company Profile | HiRise`;

    const description = `Explore career opportunities at ${company.name}. ${company.openPositions} open positions. ${company.description.slice(0, 150)}...`;

    // Update meta tags
    updateMetaTag("description", description);
    updateOGTag("title", document.title);
    updateOGTag("description", description);
    updateOGTag("image", company.logo);
  };

  const updateMetaTag = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  const updateOGTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="og:${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", `og:${property}`);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  // Loading state
  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Main Company Header */}
      <CompanyHeader
        company={company}
        isFollowing={isFollowing}
        onFollow={() => setIsFollowing(!isFollowing)}
        className="border-b bg-white px-4 py-6 lg:px-8 lg:py-8"
      />

      <div className="relative">
        {/* Sticky Company Info */}
        <StickyCompanyInfo
          company={company}
          isFollowing={isFollowing}
          onFollow={() => setIsFollowing(!isFollowing)}
          isVisible={showStickyHeader}
          className="fixed top-16 right-0 left-0 z-30"
        />

        {/* Navigation Tabs */}
        <div
          className={cn(
            "sticky top-16 z-20 transition-all duration-300",
            showStickyHeader ? "top-32" : "top-16",
            "bg-background", // Match background color with the page
          )}
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <CompanyTabs
                  companyName={company.name}
                  companyLocation={company.location}
                  followerCount={company.followerCount}
                  activeSection={activeSection}
                  onTabClick={scrollToSection}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-8">
              {/* About Section */}
              <section
                ref={aboutRef}
                className={cn(
                  "scroll-mt-48 rounded-xl bg-white p-6 shadow-sm lg:p-8",
                  "transition-shadow duration-300 hover:shadow-md",
                )}
              >
                <h2 className="mb-4 text-2xl font-bold">About {company.name}</h2>
                <div className="prose max-w-none">
                  <p>{company.description}</p>
                </div>
              </section>

              {/* Jobs Section */}
              <section ref={jobsRef} className="scroll-mt-48">
                <JobListingSection
                  title={`Opening Jobs (${company.openPositions})`}
                  jobs={jobsData}
                  viewType="list"
                  itemsPerPage={5}
                  className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md lg:p-8"
                />
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <CompanySidebar company={company}>
                  <SocialMediaLinks links={company.socialMedia} className="mt-4" />
                </CompanySidebar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
