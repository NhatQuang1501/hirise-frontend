import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import jobService, { JobFilter } from "@/services/job";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CompanyJob, JobStatus } from "@/types/company";
import { CustomDialog } from "@/components/popup/CustomDialog";
import CompanyJobCard from "@/components/recruitment/CompanyJobCard";
import CompanyJobFilters from "@/components/recruitment/CompanyJobFilters";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Button } from "@/components/ui/button";

interface JobFilterState {
  jobLevel: string[];
  contractType: string[];
  city: string[];
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const CompanyJobList: React.FC = () => {
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState<CompanyJob[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeStatus, setActiveStatus] = useState<JobStatus | "All">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Job deletion dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  // Job closure dialog state
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [jobToClose, setJobToClose] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<JobFilterState>({
    jobLevel: [],
    contractType: [],
    city: [],
  });

  // Fetch jobs with filters
  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const filters: JobFilter = {
        page,
        page_size: 10,
      };

      // Add status filter
      if (activeStatus !== "All") {
        filters.status = activeStatus.toLowerCase();
      }

      // Add search keyword filter
      if (searchKeyword) {
        filters.search = searchKeyword;
      }

      // Add additional filters if available
      if (activeFilters) {
        // Filter by contract type
        if (activeFilters.contractType && activeFilters.contractType.length > 0) {
          filters.job_type = activeFilters.contractType.join(",");
        }

        // Filter by job level
        if (activeFilters.jobLevel && activeFilters.jobLevel.length > 0) {
          filters.experience_level = activeFilters.jobLevel.join(",");
        }

        // Filter by city
        if (activeFilters.city && activeFilters.city.length > 0) {
          filters.city = activeFilters.city.join(",");
        }
      }

      const response = await jobService.getMyJobs(filters);

      setFilteredJobs(response.data.map(formatJobForCard));
      setPagination({
        currentPage: response.current_page,
        totalPages: response.total_pages,
        totalItems: response.count,
      });
    } catch (error: any) {
      setError(error.message || "Failed to fetch jobs");
      toast.error("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and fetch jobs when filters change
  useEffect(() => {
    fetchJobs(1);
  }, [searchKeyword, activeStatus]);

  // Handle search
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    fetchJobs(1);
  };

  // Handle filter changes
  const handleFilterChange = (filters: JobFilterState) => {
    setActiveFilters(filters);
    fetchJobs(1);
  };

  // Handle status filter change
  const handleStatusChange = (status: JobStatus | "All") => {
    setActiveStatus(status);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchJobs(page);
  };

  // Job action handlers
  const handleViewJob = (id: string) => {
    navigate(ROUTES.COMPANY.JOBS.DETAIL.replace(":id", id));
  };

  const handleEditJob = (id: string) => {
    navigate(ROUTES.COMPANY.JOBS.EDIT.replace(":id", id));
  };

  const handleCreateJob = () => {
    navigate(ROUTES.COMPANY.JOBS.CREATE);
  };

  // Show delete dialog
  const showDeleteDialog = (id: string) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle job deletion
  const confirmDeleteJob = async () => {
    if (jobToDelete) {
      try {
        await jobService.deleteJob(jobToDelete);
        toast.success("Job deleted successfully");
        fetchJobs(pagination.currentPage);
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      } finally {
        setDeleteDialogOpen(false);
        setJobToDelete(null);
      }
    }
  };

  // Show close job dialog
  const showCloseDialog = (id: string) => {
    setJobToClose(id);
    setCloseDialogOpen(true);
  };

  // Handle job closure
  const confirmCloseJob = async () => {
    if (jobToClose) {
      try {
        await jobService.closeJob(jobToClose);
        toast.success("Job closed successfully");
        fetchJobs(pagination.currentPage);
      } catch (error) {
        console.error("Error closing job:", error);
        toast.error("Failed to close job");
      } finally {
        setCloseDialogOpen(false);
        setJobToClose(null);
      }
    }
  };

  // Handle job publication
  const handlePublishJob = async (id: string) => {
    try {
      await jobService.publishJob(id);
      toast.success("Job published successfully");
      fetchJobs(pagination.currentPage);
    } catch (error) {
      console.error("Error publishing job:", error);
      toast.error("Failed to publish job");
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  const handleCloseDialogClose = () => {
    setCloseDialogOpen(false);
    setJobToClose(null);
  };

  // Format job data for card component
  const formatJobForCard = (job: any): CompanyJob => {
    return {
      id: job.id,
      title: job.title,
      companyId: job.company?.id || "",
      company: job.company?.name || "",
      logo: job.company?.logo || "",
      location: job.locations && job.locations.length > 0 ? job.locations[0].address : "",
      contractType: job.job_type || "",
      salary: job.salary_display || "",
      skills: job.skills?.map((s: any) => s.name) || [],
      level: job.experience_level || "",
      experience: job.experience_level || "",
      deadline: job.closed_date || "",
      status:
        job.status === "published" ? "Published" : job.status === "draft" ? "Draft" : "Closed",
      responsibilities: job.responsibilities || [],
      basicRequirements: job.requirements || [],
      preferredSkills: job.skills?.map((s: any) => s.name) || [],
      benefits: job.benefits || [],
      interviewProcess: [],
      companyDescription: job.description || "",
      applicationCount: job.application_count || 0,
      applicantCount: job.application_count || 0,
      createdDate: job.created_at || "",
      time: job.created_at ? new Date(job.created_at).toLocaleDateString() : "",
    };
  };

  return (
    <>
      <CompanyJobFilters
        searchKeyword={searchKeyword}
        activeStatus={activeStatus}
        activeFilters={activeFilters}
        onSearchChange={handleSearch}
        onStatusChange={handleStatusChange}
        onFilterChange={handleFilterChange}
        onCreateJob={handleCreateJob}
      />

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-lg border border-gray-100 bg-gray-200"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold text-red-800">Error loading jobs</h3>
            <p className="text-red-600">{error}</p>
            <button
              className="mt-4 rounded-md bg-red-100 px-4 py-2 font-medium text-red-600 hover:bg-red-200"
              onClick={() => fetchJobs(pagination.currentPage)}
            >
              Try Again
            </button>
          </div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <CompanyJobCard
              key={job.id}
              job={job}
              onView={() => handleViewJob(job.id)}
              onEdit={() => handleEditJob(job.id)}
              onDelete={() => showDeleteDialog(job.id)}
              onClose={() => showCloseDialog(job.id)}
              onPublish={() => handlePublishJob(job.id)}
            />
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">No jobs found</h3>
            <p className="text-gray-600">Try changing your filters or create a new job</p>
            <Button className="mt-4" onClick={handleCreateJob}>
              Create New Job
            </Button>
          </div>
        )}

        {!isLoading && !error && filteredJobs.length > 0 && pagination.totalPages > 1 && (
          <ResponsivePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Delete job confirmation dialog */}
      <CustomDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        title="Delete Job"
        description="Are you sure you want to delete this job? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteJob}
        confirmButtonClassName="bg-red-600 hover:bg-red-700"
      />

      {/* Close job confirmation dialog */}
      <CustomDialog
        open={closeDialogOpen}
        onClose={handleCloseDialogClose}
        title="Close Job"
        description="Are you sure you want to close this job? Closed jobs will no longer accept applications."
        confirmText="Close Job"
        cancelText="Cancel"
        onConfirm={confirmCloseJob}
      />
    </>
  );
};
