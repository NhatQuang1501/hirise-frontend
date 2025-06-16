import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import jobService, { JobFilter } from "@/services/job";
import { jobListMetadata } from "@/utils/joblMetadata";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  LayoutGrid,
  LayoutList,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { JobCardItem } from "@/types/job";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import JobCard from "@/components/job/JobCard";
import AdvancedFilters from "@/components/search/AdvancedFilters";
import SearchBar from "@/components/search/SearchBar";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Button } from "@/components/ui/button";

// Type định nghĩa cho filter state
interface FilterState {
  jobCategory: string[];
  location: string[];
  city: string[];
  salaryRange: string;
  jobLevel: string[];
  contractType: string[];
  experience: string;
  postDate: string;
}

// Type cho job data từ API
interface JobData {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo: string | null;
  };
  company_name: string;
  status: string;
  job_type: string;
  experience_level: string;
  salary_display: string;
  city: string;
  city_display: string;
  locations: Array<{
    id: string;
    address: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
  created_at: string;
  updated_at: string;
  application_count: number;
  is_saved: boolean;
  saved_count: number;
}

// Chuyển đổi dữ liệu job từ API sang JobCardItem cho UI
const mapJobDataToCardItem = (job: JobData): JobCardItem => {
  return {
    id: job.id,
    company: job.company_name,
    logo: job.company?.logo || "/placeholder-logo.png",
    title: job.title,
    salary: job.salary_display,
    city: job.city,
    city_display: job.city_display,
    location: job.locations && job.locations.length > 0 ? job.locations[0].address : "Remote",
    time: formatTimeAgo(new Date(job.created_at)),
    skills: job.skills.map((skill) => skill.name),
    is_saved: job.is_saved,
    type: job.job_type,
    level: job.experience_level,
  };
};

// Format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
};

const JobListPage: React.FC = () => {
  // const [jobs, setJobs] = useState<JobData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobCardItem[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobCardItem[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    jobCategory: [],
    location: [],
    city: [],
    salaryRange: "",
    jobLevel: [],
    contractType: [],
    experience: "",
    postDate: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Phân trang cho featured jobs (có thể hiển thị tối đa 4 công việc mỗi trang)
  const [featuredPagination, setFeaturedPagination] = useState({
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: 0,
  });

  const { user } = useAuth();
  const isApplicant = user?.role === "applicant";

  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      // Chuẩn bị tham số filter
      const filters: JobFilter = {
        page,
        page_size: 10,
        status: "published", // Chỉ lấy job đã được đăng
      };

      // Thêm từ khóa tìm kiếm nếu có
      if (keyword && keyword.trim() !== "") {
        filters.search = keyword.trim();
      }

      // Thêm filter loại công việc - Sửa đổi tại đây
      if (activeFilters.contractType && activeFilters.contractType.length > 0) {
        // Đảm bảo giá trị được chuẩn hóa để khớp với backend
        // Gửi một giá trị duy nhất nếu chỉ có 1 giá trị, không phải là array
        filters.job_type =
          activeFilters.contractType.length === 1
            ? activeFilters.contractType[0]
            : activeFilters.contractType.join(",");
      }

      // Thêm filter cấp độ kinh nghiệm - Sửa đổi tương tự
      if (activeFilters.jobLevel && activeFilters.jobLevel.length > 0) {
        filters.experience_level =
          activeFilters.jobLevel.length === 1
            ? activeFilters.jobLevel[0]
            : activeFilters.jobLevel.join(",");
      }

      // Thêm filter thành phố - Sửa đổi tương tự
      if (activeFilters.city && activeFilters.city.length > 0) {
        filters.city =
          activeFilters.city.length === 1 ? activeFilters.city[0] : activeFilters.city.join(",");
      }

      // Thêm filter theo mức lương - Sửa đổi phần xử lý salary range
      if (activeFilters.salaryRange && activeFilters.salaryRange !== "") {
        // Kiểm tra nếu salaryRange không phải là "any"
        if (activeFilters.salaryRange !== "any") {
          // Parse salaryRange nếu nó có định dạng như "1000000-2000000"
          const range = activeFilters.salaryRange.split("-");
          if (range.length === 2) {
            if (range[0]) filters.min_salary_gte = range[0];
            if (range[1]) filters.max_salary_lte = range[1];
          }
        }
      }

      // Thêm log để debug
      console.log("Sending filter parameters:", filters);

      const response = await jobService.getJobs(filters);

      // Lưu trữ dữ liệu gốc
      // setJobs(response.data);

      // Chuyển đổi dữ liệu để hiển thị
      const jobItems = response.data.map(mapJobDataToCardItem);
      setFilteredJobs(jobItems);

      // Lấy featured jobs (sắp xếp theo application_count)
      const allJobs = [...response.data]
        .sort((a, b) => b.application_count - a.application_count)
        .map(mapJobDataToCardItem);

      setFeaturedJobs(allJobs);
      setFeaturedPagination((prev) => ({
        ...prev,
        totalItems: allJobs.length,
      }));

      // Cập nhật thông tin phân trang
      setPagination({
        currentPage: response.current_page,
        totalPages: response.total_pages,
        totalItems: response.count,
      });

      // Cập nhật tiêu đề trang và meta tags
      document.title = "Job Listings | HiRise";
      updateMetaTag("name", "description", jobListMetadata.description);
      updateMetaTag("property", "og:title", "Job Listings | HiRise");
      updateMetaTag("property", "og:description", jobListMetadata.description);
      updateCanonicalLink(window.location.href);
    } catch (error: any) {
      setError(error.message || "Unable to load job listings");
      toast.error("Failed to load job listings");
    } finally {
      setIsLoading(false);
    }
  };

  // Call API when component mounts or filters change
  useEffect(() => {
    fetchJobs(1);
    setFeaturedPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [keyword, activeFilters]);

  // Handle search
  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  // Handle filter changes
  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchJobs(page);
  };

  // Handle featured jobs pagination
  const handleFeaturedPageChange = (direction: "prev" | "next") => {
    setFeaturedPagination((prev) => {
      const totalPages = Math.ceil(prev.totalItems / prev.itemsPerPage);
      if (direction === "prev" && prev.currentPage > 1) {
        return { ...prev, currentPage: prev.currentPage - 1 };
      } else if (direction === "next" && prev.currentPage < totalPages) {
        return { ...prev, currentPage: prev.currentPage + 1 };
      }
      return prev;
    });
  };

  // Get current featured jobs based on pagination
  const getCurrentFeaturedJobs = () => {
    const { currentPage, itemsPerPage } = featuredPagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return featuredJobs.slice(startIndex, endIndex);
  };

  // Handle save job
  const handleSaveJob = async (jobId: string) => {
    if (!isApplicant) {
      return;
    }

    try {
      const jobIndex = filteredJobs.findIndex((job) => job.id === jobId);
      if (jobIndex === -1) return;

      const job = filteredJobs[jobIndex];

      if (job.is_saved) {
        // Nếu job đã được lưu, bỏ lưu
        await jobService.unsaveJob(jobId);
        toast.success("Job removed from saved jobs");

        // Cập nhật trạng thái trong danh sách job
        setFilteredJobs((prev) => {
          const updated = [...prev];
          updated[jobIndex] = { ...updated[jobIndex], is_saved: false };
          return updated;
        });

        // Cập nhật trạng thái trong danh sách featured jobs
        const featuredJobIndex = featuredJobs.findIndex((job) => job.id === jobId);
        if (featuredJobIndex !== -1) {
          setFeaturedJobs((prev) => {
            const updated = [...prev];
            updated[featuredJobIndex] = { ...updated[featuredJobIndex], is_saved: false };
            return updated;
          });
        }
      } else {
        // Nếu job chưa được lưu, lưu lại
        await jobService.saveJob(jobId);
        toast.success("Job saved successfully");

        // Cập nhật trạng thái trong danh sách job
        setFilteredJobs((prev) => {
          const updated = [...prev];
          updated[jobIndex] = { ...updated[jobIndex], is_saved: true };
          return updated;
        });

        // Cập nhật trạng thái trong danh sách featured jobs
        const featuredJobIndex = featuredJobs.findIndex((job) => job.id === jobId);
        if (featuredJobIndex !== -1) {
          setFeaturedJobs((prev) => {
            const updated = [...prev];
            updated[featuredJobIndex] = { ...updated[featuredJobIndex], is_saved: true };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Handle job view
  const handleViewJob = (jobId: string) => {
    window.open(ROUTES.PUBLIC.JOBS.DETAIL.replace(":id", jobId), "_blank");
  };

  // Update meta tags
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

  // Update canonical link
  const updateCanonicalLink = (href: string) => {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", href);
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", href);
      document.head.appendChild(link);
    }
  };

  // Calculate total pages for featured jobs
  const featuredTotalPages = Math.ceil(
    featuredPagination.totalItems / featuredPagination.itemsPerPage,
  );

  return (
    <>
      {/* Search & Filters */}
      <div className="from-primary/10 to-background bg-gradient-to-b py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-3xl font-bold">Find Your Dream Job</h1>
          <p className="text-muted-foreground mb-8">
            Discover opportunities that match your skills and experience
          </p>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <SearchBar onSearch={handleSearch} initialValue={keyword} />
            <AdvancedFilters onChange={handleFilterChange} initialFilters={activeFilters} />
          </div>
        </div>
      </div>

      {/* Main content with two-column layout */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main job listings */}
          <div className="w-full lg:w-3/4">
            {/* Job listing controls */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Job Listings</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <LayoutList className="size-5" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="size-5" />
                </Button>
              </div>
            </div>

            {/* Job listings */}
            {isLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-32 animate-pulse rounded-lg bg-gray-200" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
                <p>{error}</p>
                <button
                  className="mt-4 rounded-md bg-red-100 px-4 py-2 font-medium text-red-600 hover:bg-red-200"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-12 text-center">
                <h3 className="mb-2 text-xl font-semibold">No Jobs Found</h3>
                <p className="text-gray-600">There are no jobs matching your search criteria.</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid" ? "grid gap-6 sm:grid-cols-2" : "flex flex-col gap-4"
                }
              >
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSaveJob={() => handleSaveJob(job.id)}
                    onClick={() => handleViewJob(job.id)}
                    layout={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination - Using ResponsivePagination component */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <ResponsivePagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  className="py-2"
                />
                <p className="text-muted-foreground mt-2 text-center text-sm">
                  Showing {(pagination.currentPage - 1) * 10 + 1}-
                  {Math.min(pagination.currentPage * 10, pagination.totalItems)} of{" "}
                  {pagination.totalItems} jobs
                </p>
              </div>
            )}
          </div>

          {/* Featured jobs sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-4 rounded-lg border border-gray-200 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">Featured Jobs</h3>

                {/* Featured jobs pagination controls - Enhanced design */}
                {featuredTotalPages > 1 && (
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      disabled={featuredPagination.currentPage === 1}
                      onClick={() => handleFeaturedPageChange("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-muted-foreground px-2 text-xs font-medium">
                      {featuredPagination.currentPage}/{featuredTotalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      disabled={featuredPagination.currentPage === featuredTotalPages}
                      onClick={() => handleFeaturedPageChange("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {featuredJobs.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {getCurrentFeaturedJobs().map((job) => (
                    <div
                      key={job.id}
                      className="hover:border-primary/30 group relative cursor-pointer rounded-md border border-gray-100 p-4 transition-colors"
                      onClick={() => handleViewJob(job.id)}
                    >
                      {/* Save button chỉ hiển thị với applicant */}
                      {user?.role === "applicant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "absolute top-1 right-1 z-10 rounded-full opacity-70 transition-opacity group-hover:opacity-100",
                            job.is_saved ? "text-rose-500" : "text-gray-400 hover:text-gray-600",
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveJob(job.id);
                          }}
                        >
                          <Bookmark className={`size-4 ${job.is_saved ? "fill-rose-500" : ""}`} />
                        </Button>
                      )}

                      {/* Company and title */}
                      <div className="mb-3 flex items-center gap-2">
                        <div className="relative size-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-50">
                          <img
                            src={job.logo || "/placeholder-logo.png"}
                            alt={job.company}
                            className="size-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <span className="line-clamp-1 block text-xs text-gray-500">
                            {job.company}
                          </span>
                          <h4 className="group-hover:text-primary line-clamp-1 text-sm font-medium transition-colors">
                            {job.title}
                          </h4>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <DollarSign className="text-primary/70 size-3" />
                          <span className="truncate">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="text-primary/70 size-3" />
                          <span className="truncate">{job.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {job.skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-primary/5 text-primary rounded-full px-2 py-0.5 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 2 && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            +{job.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md bg-gray-50/50 p-8 text-center">
                  <p className="text-sm text-gray-500">No featured jobs available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobListPage;
