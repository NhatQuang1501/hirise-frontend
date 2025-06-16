import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import jobService from "@/services/job";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { JobCardItem } from "@/types/job";
import { useAuth } from "@/hooks/useAuth";
import JobCard from "@/components/job/JobCard";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Button } from "@/components/ui/button";

// Interface for saved job data from API
interface SavedJobApiData {
  id: string;
  job: {
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
  };
  created_at: string;
}

export function SavedJobsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<JobCardItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const { user } = useAuth();

  // Convert API data to JobCardItem format
  const mapApiDataToJobCardItem = (savedJobData: SavedJobApiData): JobCardItem => {
    const job = savedJobData.job;
    return {
      id: job.id,
      company: job.company_name,
      logo: job.company.logo || "/placeholder-logo.png",
      title: job.title,
      salary: job.salary_display,
      city: job.city,
      city_display: job.city_display,
      location: job.locations.length > 0 ? job.locations[0].address : "Remote",
      time: formatTimeAgo(new Date(job.created_at)),
      skills: job.skills.map((skill) => skill.name),
      is_saved: true, // Luôn là true vì đây là danh sách job đã lưu
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

  // Fetch saved jobs
  const fetchSavedJobs = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      // Call the API to get saved jobs for the current user
      const response = await jobService.getApplicantSavedJobs(user.id, {
        page,
        page_size: 10,
      });

      // Convert API data to JobCardItem format
      if (Array.isArray(response.data.data)) {
        const jobItems = response.data.data.map(mapApiDataToJobCardItem);
        setSavedJobs(jobItems);

        // Cập nhật thông tin phân trang
        setPagination({
          currentPage: response.data.current_page || 1,
          totalPages: response.data.total_pages || 1,
          totalItems: response.data.count || 0,
        });
      } else if (Array.isArray(response.data)) {
        // Nếu response.data là mảng (không có data nested)
        const jobItems = response.data.map(mapApiDataToJobCardItem);
        setSavedJobs(jobItems);

        // Fallback pagination nếu API không trả về thông tin phân trang
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: jobItems.length,
        });
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error: any) {
      setError(error.message || "Unable to load saved jobs");
      toast.error("Failed to load saved jobs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSavedJobs(1);
    }
  }, [user?.id]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchSavedJobs(page);
  };

  // Handle save/unsave job
  const handleSaveJob = async (jobId: string) => {
    try {
      await jobService.unsaveJob(jobId);
      toast.success("Job removed from saved jobs");
      fetchSavedJobs(pagination.currentPage);
    } catch (error) {
      console.error("Error removing job from saved jobs:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Handle job view
  const handleViewJob = (jobId: string) => {
    window.open(ROUTES.PUBLIC.JOBS.DETAIL.replace(":id", jobId), "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-primary mr-2 h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
        <p>{error}</p>
        <button
          className="mt-4 rounded-md bg-red-100 px-4 py-2 font-medium text-red-600 hover:bg-red-200"
          onClick={() => fetchSavedJobs(1)}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!savedJobs.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="mb-2 text-lg font-medium">You haven't saved any jobs yet</h3>
        <p className="text-muted-foreground mb-4">Save jobs you're interested in to review later</p>
        <Link to="/jobs">
          <Button>Find Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Saved jobs list */}
      <div className="grid gap-4">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSaveJob={() => handleSaveJob(job.id)}
            onClick={() => handleViewJob(job.id)}
            layout="list"
          />
        ))}
      </div>

      {/* Pagination */}
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
            {pagination.totalItems} saved jobs
          </p>
        </div>
      )}
    </div>
  );
}
