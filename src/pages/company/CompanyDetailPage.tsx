import { useEffect, useRef, useState } from "react";
import { companyService } from "@/services/company";
import { formatQuillContent } from "@/utils/formatQuillContent";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  Briefcase,
  Building,
  ChevronDown,
  ChevronUp,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CompanyDetails } from "@/types/company";
import { JobCardItem } from "@/types/job";
import api from "@/config/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanySidebar from "@/components/company/CompanySidebar";
import CompanyTabs from "@/components/company/CompanyTabs";
import JobListingSection from "@/components/job/JobListingSection";
import SocialMediaLinks from "@/components/section/SocialMediaLinks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import companyPlaceholder from "@/assets/images/companyPlaceholder.png";

const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [companyJobs, setCompanyJobs] = useState<JobCardItem[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Thêm state để quản lý việc hiển thị nội dung đầy đủ hoặc rút gọn
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullBenefits, setShowFullBenefits] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!id) return;

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
          logo: companyData.profile.logo || companyPlaceholder,
          location: companyData.profile.location_names?.[0] || "No location specified",
          website: companyData.profile.website || "",
          foundedYear: companyData.profile.founded_year,
          size: "", // API doesn't provide this
          industry: companyData.profile.industry_names?.join(", ") || "",
          openPositions: 0, // Will be updated after fetching jobs
          followerCount: companyData.profile.follower_count || 0,
          isFollowing: false, // Will be updated after checking follow status
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
        setFollowerCount(formattedCompany.followerCount);
        updateMetadata(formattedCompany);

        // Fetch company jobs
        await fetchCompanyJobs(id);

        // Check follow status if user is applicant
        if (user?.role === "applicant") {
          await checkFollowStatus(id);
        }
      } catch (error: any) {
        console.error("Error fetching company:", error);
        setError(error.response?.data?.message || "Failed to load company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id, user?.role]);

  // Check if user is following the company
  const checkFollowStatus = async (companyId: string) => {
    try {
      const response = await companyService.checkFollowStatus(companyId);
      setIsFollowing(response.is_following);

      // Update company state with follow status
      if (company) {
        setCompany({
          ...company,
          isFollowing: response.is_following,
        });
      }
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  // Fetch company jobs
  const fetchCompanyJobs = async (companyId: string) => {
    try {
      // Sử dụng companyService thay vì api trực tiếp
      const response = await companyService.getCompanyJobs(companyId);

      // Xử lý dữ liệu
      const jobsData = response.data || [];

      // Transform API data to match JobCardItem interface
      const formattedJobs: JobCardItem[] = jobsData.map((job: any) => ({
        id: job.id,
        company: job.company_name || company?.name || "",
        logo: job.company?.logo || company?.logo || companyPlaceholder,
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
      const scrollPosition = window.scrollY;

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
  const handleFollowToggle = async () => {
    if (!id || user?.role !== "applicant") {
      toast.error("Only applicants can follow companies");
      return;
    }

    try {
      if (isFollowing) {
        await companyService.unfollowCompany(id);
        setFollowerCount((prev) => Math.max(0, prev - 1));
      } else {
        await companyService.followCompany(id);
        setFollowerCount((prev) => prev + 1);
      }

      setIsFollowing(!isFollowing);

      // Update company state
      if (company) {
        setCompany({
          ...company,
          isFollowing: !isFollowing,
          followerCount: isFollowing
            ? Math.max(0, company.followerCount - 1)
            : company.followerCount + 1,
        });
      }
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
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
      {/* Hero section with gradient background */}
      <div className="from-primary/10 to-secondary/10 relative bg-gradient-to-br">
        {/* Abstract shapes decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="bg-accent absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl"></div>
          <div className="bg-primary-foreground absolute top-40 right-10 h-96 w-96 rounded-full blur-3xl"></div>
        </div>

        {/* Main Company Header */}
        <CompanyHeader
          company={company}
          isFollowing={isFollowing}
          onFollow={handleFollowToggle}
          className="relative z-10 border-b bg-white/80 px-4 py-8 backdrop-blur-sm lg:px-8 lg:py-10"
        />
      </div>

      <div className="relative">
        {/* Navigation Tabs */}
        <div
          className={cn(
            "sticky top-16 z-20 transition-all duration-300",
            "top-16",
            "bg-background shadow-sm",
          )}
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <CompanyTabs
                  companyName={company.name}
                  companyLocation={company.location}
                  followerCount={followerCount}
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
              {/* Company Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                <div className="from-primary/5 to-primary/10 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br p-4 text-center shadow-sm">
                  <div className="bg-primary/10 mb-2 rounded-full p-3">
                    <Briefcase className="text-primary h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold">{company.openPositions}</span>
                  <span className="text-muted-foreground text-sm">Open Jobs</span>
                </div>

                <div className="from-secondary/5 to-secondary/10 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br p-4 text-center shadow-sm">
                  <div className="bg-secondary/10 mb-2 rounded-full p-3">
                    <Users className="text-secondary h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold">{followerCount}</span>
                  <span className="text-muted-foreground text-sm">Followers</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-4 text-center shadow-sm">
                  <div className="mb-2 rounded-full bg-amber-200/40 p-3">
                    <Building className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-xl font-bold">{company.foundedYear || "N/A"}</span>
                  <span className="text-muted-foreground text-sm">Founded</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center shadow-sm">
                  <div className="mb-2 rounded-full bg-blue-200/40 p-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xl font-bold">{company.locations?.length || 1}</span>
                  <span className="text-muted-foreground text-sm">Locations</span>
                </div>
              </motion.div>

              {/* About Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                ref={aboutRef}
                className={cn(
                  "scroll-mt-48 rounded-xl bg-white p-6 shadow-sm lg:p-8",
                  "border border-gray-100 transition-all duration-300 hover:shadow-md",
                )}
              >
                <h2 className="mb-6 flex items-center text-2xl font-bold">
                  <span className="bg-primary/10 mr-3 rounded-full p-2">
                    <Building className="text-primary h-5 w-5" />
                  </span>
                  About {company.name}
                </h2>

                <div className="prose max-w-none">
                  <div
                    className={cn(
                      "relative leading-relaxed",
                      !showFullDescription && "max-h-[200px] overflow-hidden",
                    )}
                    dangerouslySetInnerHTML={{
                      __html: formatQuillContent(company.description) || "No description provided.",
                    }}
                  ></div>

                  {/* Gradient overlay when content is collapsed */}
                  {!showFullDescription && (
                    <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                  )}

                  {/* See more/less button */}
                  <div className="mt-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-primary hover:text-primary/80 mx-auto flex items-center"
                    >
                      {showFullDescription ? (
                        <>
                          <ChevronUp className="mr-1 h-4 w-4" />
                          See less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-1 h-4 w-4" />
                          See more
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {company.benefits && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="mb-4 flex items-center text-xl font-semibold">
                      <span className="bg-secondary/10 mr-3 rounded-full p-2">
                        <Award className="text-secondary h-5 w-5" />
                      </span>
                      Benefits & Perks
                    </h3>
                    <div className="prose relative max-w-none">
                      <div
                        className={cn(
                          "leading-relaxed",
                          !showFullBenefits && "max-h-[200px] overflow-hidden",
                        )}
                        dangerouslySetInnerHTML={{
                          __html: formatQuillContent(company.benefits),
                        }}
                      />

                      {/* Gradient overlay when content is collapsed */}
                      {!showFullBenefits && (
                        <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                      )}

                      {/* See more/less button */}
                      <div className="mt-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFullBenefits(!showFullBenefits)}
                          className="text-primary hover:text-primary/80 mx-auto flex items-center"
                        >
                          {showFullBenefits ? (
                            <>
                              <ChevronUp className="mr-1 h-4 w-4" />
                              See less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="mr-1 h-4 w-4" />
                              See more
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {company.profile?.skill_names && company.profile.skill_names.length > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="mb-4 text-lg font-semibold">Technologies & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.profile.skill_names.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-primary/10 text-primary hover:bg-primary/20 border-0"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>

              {/* Jobs Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                ref={jobsRef}
                className="scroll-mt-48"
              >
                <JobListingSection
                  title={`Opening Jobs (${companyJobs.length})`}
                  jobs={companyJobs}
                  viewType="list"
                  emptyMessage={
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Briefcase className="text-muted-foreground mb-3 h-12 w-12" />
                      <h3 className="mb-2 text-lg font-semibold">No Open Positions</h3>
                      <p className="text-muted-foreground max-w-md">
                        {company.name} doesn't have any open positions at the moment. Check back
                        later or follow the company to get updates.
                      </p>
                      {user?.role === "applicant" && !isFollowing && (
                        <Button onClick={handleFollowToggle} className="mt-4" variant="outline">
                          <Star className="mr-2 h-4 w-4" />
                          Follow {company.name}
                        </Button>
                      )}
                    </div>
                  }
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:p-8"
                />
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-48 space-y-6"
              >
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

                {/* CTA Card */}
                {user?.role === "applicant" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="from-primary to-secondary mt-6 rounded-xl bg-gradient-to-br p-6 text-white shadow-md"
                  >
                    <h3 className="mb-3 text-lg font-semibold">Interested in {company.name}?</h3>
                    <p className="mb-4 text-sm text-white/90">
                      Follow {company.name} to receive notifications about new job opportunities and
                      updates.
                    </p>
                    <Button
                      onClick={handleFollowToggle}
                      className="text-primary w-full bg-white hover:bg-white/90"
                      size="lg"
                    >
                      <Star className={`mr-2 h-4 w-4 ${isFollowing ? "fill-primary" : ""}`} />
                      {isFollowing ? "Following" : "Follow Company"}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
