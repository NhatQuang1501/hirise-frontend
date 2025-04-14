import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { mockRecruiterJobs } from "@/types/mockData";
import { JobStatus, RecruiterJob } from "@/types/recruiter";
import { CustomDialog } from "@/components/popup/CustomDialog";
import RecruiterJobCard from "@/components/recruitment/RecruiterJobCard";
import RecruiterJobFilters from "@/components/recruitment/RecruiterJobFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

// Mock data cho mục đích demo - trong thực tế sẽ lấy từ API
// const mockRecruiterJobs: RecruiterJob[] = []

const RecruiterJobListPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<RecruiterJob[]>(mockRecruiterJobs);
  const [filteredJobs, setFilteredJobs] = useState<RecruiterJob[]>(mockRecruiterJobs);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeStatus, setActiveStatus] = useState<JobStatus | "All">("All");

  // Xử lý dialog xóa job
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);

  // Xử lý dialog đóng job
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [jobToClose, setJobToClose] = useState<number | null>(null);

  // Áp dụng filter
  useEffect(() => {
    let result = [...jobs];

    // Filter theo từ khóa
    if (searchKeyword) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    // Filter theo status
    if (activeStatus !== "All") {
      result = result.filter((job) => job.status === activeStatus);
    }

    setFilteredJobs(result);
  }, [jobs, searchKeyword, activeStatus]);

  // Xử lý tìm kiếm
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  // Xử lý thay đổi filter status
  const handleStatusChange = (status: JobStatus | "All") => {
    setActiveStatus(status);
  };

  // Các hàm xử lý action cho job
  const handleViewJob = (id: number) => {
    navigate(ROUTES.RECRUITER.JOBS.DETAIL.replace(":id", id.toString()));
  };

  const handleEditJob = (id: number) => {
    navigate(ROUTES.RECRUITER.JOBS.EDIT.replace(":id", id.toString()));
  };

  const handleCreateJob = () => {
    navigate(ROUTES.RECRUITER.JOBS.CREATE);
  };

  // Hiển thị dialog xóa
  const showDeleteDialog = (id: number) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Xử lý xóa job
  const confirmDeleteJob = () => {
    if (jobToDelete) {
      const updatedJobs = jobs.filter((job) => job.id !== jobToDelete);
      setJobs(updatedJobs);
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };

  // Hiển thị dialog đóng job
  const showCloseDialog = (id: number) => {
    setJobToClose(id);
    setCloseDialogOpen(true);
  };

  // Xử lý đóng job
  const confirmCloseJob = () => {
    if (jobToClose) {
      const updatedJobs = jobs.map((job) => {
        if (job.id === jobToClose) {
          return { ...job, status: "Closed" as JobStatus };
        }
        return job;
      });
      setJobs(updatedJobs);
      setCloseDialogOpen(false);
      setJobToClose(null);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <RecruiterJobFilters
        searchKeyword={searchKeyword}
        activeStatus={activeStatus}
        onSearchChange={handleSearch}
        onStatusChange={handleStatusChange}
        onCreateJob={handleCreateJob}
      />

      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <RecruiterJobCard
              key={job.id}
              job={job}
              onDelete={showDeleteDialog}
              onClose={showCloseDialog}
              onView={handleViewJob}
              onEdit={handleEditJob}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold">No jobs found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords or adjusting the filters.
            </p>
          </div>
        )}
      </div>

      {filteredJobs.length > 0 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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

export default RecruiterJobListPage;
