import { useEffect, useRef, useState } from "react";
import { companyService } from "@/services/company";
import { AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { CompanyDetails } from "@/types/company";
import { JobCardItem } from "@/types/job";
import api from "@/config/api";
import { cn } from "@/lib/utils";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanySidebar from "@/components/company/CompanySidebar";
import CompanyTabs from "@/components/company/CompanyTabs";
import StickyCompanyInfo from "@/components/company/StickyCompanyInfo";
import JobListingSection from "@/components/job/JobListingSection";
import SocialMediaLinks from "@/components/section/SocialMediaLinks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [companyJobs, setCompanyJobs] = useState<JobCardItem[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch company details
        const response = await api.get(`/companies/${id}`);
        const companyData = response.data;

        // Transform API data to match CompanyDetails interface
        const formattedCompany: CompanyDetails = {
          id: companyData.id,
          name: companyData.profile.name,
          description: companyData.profile.description,
          logo: companyData.profile.logo || "/placeholder-company-logo.png",
          location: companyData.profile.location_names?.[0] || "No location specified",
          website: companyData.profile.website || "",
          foundedYear: companyData.profile.founded_year,
          size: "", // API doesn't provide this
          industry: companyData.profile.industry_names?.join(", ") || "",
          openPositions: 0, // Will be updated after fetching jobs
          followerCount: 0, // API doesn't provide this
          isFollowing: false, // API doesn't provide this
          employees: [], // API doesn't provide this
          benefits: companyData.profile.benefits,
          locations: companyData.profile.location_names || [],
          socialMedia: {
            website: companyData.profile.website || "",
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: "",
          },
          rating: 0, // API doesn't provide this
          reviews: [], // API doesn't provide this
          profile: {
            // Lưu toàn bộ dữ liệu profile để sử dụng sau này
            ...companyData.profile,
          },
        };

        setCompany(formattedCompany);
        updateMetadata(formattedCompany);

        if (!id) return;
        // Fetch company jobs
        await fetchCompanyJobs(id);
      } catch (error: any) {
        console.error("Error fetching company:", error);
        setError(error.response?.data?.message || "Failed to load company details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id]);

  // Fetch company jobs
  const fetchCompanyJobs = async (companyId: string) => {
    try {
      // Sử dụng companyService thay vì api trực tiếp
      const response = await companyService.getCompanyJobs(companyId);

      // Xử lý dữ liệu
      const jobsData = response.data || [];

      console.log("Jobs data:", jobsData);

      // Transform API data to match JobCardItem interface
      const formattedJobs: JobCardItem[] = jobsData.map((job: any) => ({
        id: job.id,
        company: job.company_name || company?.name || "",
        logo: job.company?.logo || company?.logo || "/placeholder-company-logo.png",
        title: job.title,
        salary: job.salary_display || "",
        location:
          job.locations?.length > 0 ? job.locations[0].address : job.city_display || "Remote",
        city: job.city || "",
        city_display: job.city_display || "",
        time: new Date(job.created_at).toLocaleDateString(),
        skills: job.skills?.map((skill: any) => skill.name) || [],
        is_saved: job.is_saved || false,
        type: job.job_type || "",
        level: job.experience_level || "",
      }));

      setCompanyJobs(formattedJobs);

      // Update open positions count
      if (company) {
        setCompany({
          ...company,
          openPositions: formattedJobs.length,
        });
      }
    } catch (error) {
      console.error("Error fetching company jobs:", error);
    }
  };

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

  // Follow/Unfollow company
  const handleFollowToggle = () => {
    // In a real app, this would make an API call to follow/unfollow
    setIsFollowing(!isFollowing);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  // Error state
  if (error || !company) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive" className="mx-auto max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "Failed to load company details. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Main Company Header */}
      <CompanyHeader
        company={company}
        isFollowing={isFollowing}
        onFollow={handleFollowToggle}
        className="border-b bg-white px-4 py-6 lg:px-8 lg:py-8"
      />

      <div className="relative">
        {/* Sticky Company Info */}
        <StickyCompanyInfo
          company={company}
          isFollowing={isFollowing}
          onFollow={handleFollowToggle}
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

                {company.benefits && (
                  <div className="mt-8">
                    <h3 className="mb-3 text-xl font-semibold">Benefits</h3>
                    <div className="prose max-w-none">
                      <p>{company.benefits}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* Jobs Section */}
              <section ref={jobsRef} className="scroll-mt-48">
                <JobListingSection
                  title={`Opening Jobs (${companyJobs.length})`}
                  jobs={companyJobs}
                  viewType="list"
                  emptyMessage="No job openings at the moment. Check back later!"
                  className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md lg:p-8"
                />
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-48 space-y-6">
                <CompanySidebar company={company}>
                  {company.website && (
                    <SocialMediaLinks
                      links={{
                        website: company.website,
                        facebook: "",
                        twitter: "",
                        linkedin: "",
                        instagram: "",
                      }}
                      className="mt-4"
                    />
                  )}
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
