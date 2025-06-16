import React, { useEffect, useState } from "react";
import { companyService } from "@/services/company";
import { jobService } from "@/services/job";
import { homeMetadata } from "@/utils/homeMetadata";
import { Loader2, Sparkles, Star } from "lucide-react";
import { Company } from "@/types/company";
import { JobCardData } from "@/types/job";
import CompanyCarousel from "@/components/company/CompanyCarousel";
import BenefitsSection from "@/components/home/BenefitsSection";
import HeroSection from "@/components/home/HeroSection";
import JobList from "@/components/home/JobList";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Badge } from "@/components/ui/badge";
import placeholderLogo from "@/assets/images/companyPlaceholder.png";

const DEFAULT_LOGO = placeholderLogo;

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // Update page title
  useEffect(() => {
    document.title = homeMetadata.title;
  }, []);

  // Fetch companies data from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const response = await companyService.getCompanies({
          page_size: 10,
          ordering: "-follower_count",
        });

        if (response?.data?.length > 0) {
          const formattedCompanies = response.data.map((company: any) => ({
            id: company.id,
            name: company.name,
            logo: company.logo || DEFAULT_LOGO,
            jobCount: company.job_count || 0,
            industry: company.industry || "Technology",
            location: company.location || "Vietnam",
            followerCount: company.follower_count || 0,
            isFollowing: company.is_following || false,
            newJobsToday: company.new_jobs_today || 0,
            description: company.description || "",
          }));
          setCompanies(formattedCompanies);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch jobs data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Build filter parameters based on current filter
        const filters: any = {
          page: 1,
          page_size: 8,
          status: "published",
        };

        // Add filter parameters based on activeFilter
        if (activeFilter === "latest") {
          filters.ordering = "-created_at";
        } else if (activeFilter === "remote") {
          filters.location_type = "remote";
        } else if (activeFilter === "freelance") {
          filters.job_type = "freelance";
        } else if (activeFilter === "featured") {
          filters.is_featured = true;
        }

        const response = await jobService.getJobs(filters);

        if (response?.data?.length > 0) {
          // Convert API data to JobCardData format
          const formattedJobs: JobCardData[] = response.data.map((job: any) => ({
            id: job.id,
            company: job.company?.name || job.company_name || "Unknown Company",
            logo: job.company?.logo || DEFAULT_LOGO,
            title: job.title,
            salary:
              job.min_salary && job.max_salary
                ? `${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()} ${job.currency}`
                : job.salary_display || "Negotiable",
            location: job.locations?.[0]?.address || job.location || "Remote",
            time: new Date(job.created_at).toLocaleDateString("en-US"),
            skills: job.skills?.map((skill: any) => skill.name) || [],
            city: job.city || "",
            city_display: job.city_display || "",
            is_saved: job.is_saved || false,
          }));

          setJobs(formattedJobs);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Unable to load job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Job opportunities section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="bg-primary/5 text-primary mb-2">
            <Sparkles className="mr-1 size-3" /> Latest Opportunities
          </Badge>
          <h2 className="text-3xl font-bold">
            Discover <span className="text-primary">Career Opportunities</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Find your next role from our curated selection of top tech positions
          </p>
        </div>

        {error ? (
          <div className="py-12 text-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <JobList
            jobs={jobs}
            loading={loading}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>

      {/* Featured companies section */}
      <section className="from-highlight to-highlight/30 relative bg-gradient-to-br py-16">
        <div className="bg-primary/10 absolute top-0 right-0 h-64 w-64 rounded-full opacity-70 blur-3xl"></div>
        <div className="bg-secondary/10 absolute bottom-0 left-20 h-80 w-80 rounded-full opacity-70 blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
              <Star className="mr-1 size-3" /> Top Employers
            </Badge>
            <h2 className="text-3xl font-bold">Featured Companies</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
              Work with the industry's leading technology companies
            </p>
          </div>

          {loadingCompanies ? (
            <div className="flex justify-center py-12">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : (
            <CompanyCarousel
              companies={companies}
              title="Featured Companies"
              description="Work with top technology companies"
              loading={false}
            />
          )}
        </div>
      </section>

      {/* Enhanced benefits section */}
      <BenefitsSection />

      {/* Enhanced newsletter section */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
