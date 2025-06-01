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

const CompanyJobListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeStatus, setActiveStatus] = useState<JobStatus | "All">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Xử lý dialog xóa job
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  // Xử lý dialog đóng job
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [jobToClose, setJobToClose] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<{
    jobLevel: string[];
    contractType: string[];
    city: string[];
  }>({
    jobLevel: [],
    contractType: [],
    city: [],
  });

  // Fetch jobs
  const fetchJobs = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const filters: JobFilter = {
        page,
        page_size: 10,
      };

      // Thêm filter theo trạng thái
      if (activeStatus !== "All") {
        filters.status = activeStatus.toLowerCase();
      }

      // Thêm filter theo từ khóa tìm kiếm
      if (searchKeyword) {
        filters.search = searchKeyword;
      }

      // Thêm các filter bổ sung nếu có
      if (activeFilters) {
        // Filter theo loại hợp đồng
        if (activeFilters.contractType && activeFilters.contractType.length > 0) {
          filters.job_type = activeFilters.contractType.join(",");
        }

        // Filter theo cấp độ công việc
        if (activeFilters.jobLevel && activeFilters.jobLevel.length > 0) {
          filters.experience_level = activeFilters.jobLevel.join(",");
        }

        // Filter theo thành phố
        if (activeFilters.city && activeFilters.city.length > 0) {
          filters.city = activeFilters.city.join(",");
        }
      }

      const response = await jobService.getMyJobs(filters);

      setFilteredJobs(response.data);
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

  // Áp dụng filter và fetch jobs khi thay đổi
  useEffect(() => {
    fetchJobs(1);
  }, [searchKeyword, activeStatus]);

  // Xử lý tìm kiếm
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    fetchJobs(1);
  };

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    fetchJobs(1);
  };

  // Xử lý thay đổi filter status
  const handleStatusChange = (status: JobStatus | "All") => {
    setActiveStatus(status);
  };

  // Xử lý phân trang
  const handlePageChange = (page: number) => {
    fetchJobs(page);
  };

  // Các hàm xử lý action cho job
  const handleViewJob = (id: string) => {
    navigate(ROUTES.COMPANY.JOBS.DETAIL.replace(":id", id));
  };

  const handleEditJob = (id: string) => {
    navigate(ROUTES.COMPANY.JOBS.EDIT.replace(":id", id));
  };

  const handleCreateJob = () => {
    navigate(ROUTES.COMPANY.JOBS.CREATE);
  };

  // Hiển thị dialog xóa
  const showDeleteDialog = (id: string) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Xử lý xóa job
  const confirmDeleteJob = async () => {
    if (jobToDelete) {
      try {
        await jobService.deleteJob(jobToDelete);
        toast.success("Job deleted successfully");
        fetchJobs(pagination.currentPage);
      } catch (error) {
        toast.error("Failed to delete job");
      } finally {
        setDeleteDialogOpen(false);
        setJobToDelete(null);
      }
    }
  };

  // Hiển thị dialog đóng job
  const showCloseDialog = (id: string) => {
    setJobToClose(id);
    setCloseDialogOpen(true);
  };

  // Xử lý đóng job
  const confirmCloseJob = async () => {
    if (jobToClose) {
      try {
        await jobService.updateJobStatus(jobToClose, "closed");
        toast.success("Job closed successfully");
        fetchJobs(pagination.currentPage);
      } catch (error) {
        toast.error("Failed to close job");
      } finally {
        setCloseDialogOpen(false);
        setJobToClose(null);
      }
    }
  };

  const handlePublishJob = async (id: string) => {
    try {
      await jobService.updateJobStatus(id, "published");
      toast.success("Job published successfully");
      fetchJobs(pagination.currentPage);
    } catch (error) {
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
      // Thêm các trường còn thiếu
      applicantCount: job.application_count || 0,
      createdDate: job.created_at || "",
      time: job.created_at ? new Date(job.created_at).toLocaleDateString() : "",
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
              job={formatJobForCard(job)}
              onDelete={showDeleteDialog}
              onClose={showCloseDialog}
              onView={handleViewJob}
              onEdit={handleEditJob}
              onPublish={handlePublishJob}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold">No jobs found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords or adjusting the filters.
            </p>
            <Button
              onClick={handleCreateJob}
              className="bg-primary hover:bg-primary/90 mt-4 text-white"
            >
              Create Your First Job
            </Button>
          </div>
        )}
      </div>

      {/* Pagination - Using ResponsivePagination component */}
      {!isLoading && !error && pagination.totalPages > 1 && (
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

      {/* Delete job confirmation dialog */}
      <CustomDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        title="Are you sure you want to delete this job?"
        description="This action cannot be undone. The job will be permanently removed from the system."
        confirmText="Delete"
        onConfirm={confirmDeleteJob}
        confirmButtonClassName="bg-red-600 hover:bg-red-700"
      />

      {/* Close job confirmation dialog */}
      <CustomDialog
        open={closeDialogOpen}
        onClose={handleCloseDialogClose}
        title="Are you sure you want to close this job?"
        description="Once closed, candidates will no longer be able to apply for this job, but you can still view existing applications."
        confirmText="Close Job"
        onConfirm={confirmCloseJob}
      />
    </div>
  );
};

export default CompanyJobListPage;
