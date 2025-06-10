import React, { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { JobCardData } from "@/types/job";
import JobCard from "@/components/job/JobCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface JobListProps {
  jobs: JobCardData[];
  loading?: boolean;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  loading = false,
  activeFilter = "all",
  onFilterChange = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  //số lượng job hiển thị trên mỗi trang
  const jobsPerPage = 4;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "latest", label: "Latest" },
    { id: "featured", label: "Featured" },
    { id: "remote", label: "Remote" },
    { id: "freelance", label: "Freelance" },
  ];

  return (
    <section id="jobs-section" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest IT Jobs</h2>
          <Link
            to={ROUTES.PUBLIC.JOBS.LIST}
            className="text-primary flex items-center hover:underline"
          >
            View all <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => onFilterChange(filter.id)}
              className="min-w-24"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            // Hiển thị skeleton loading khi đang tải dữ liệu
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex h-full flex-col justify-between rounded-lg border p-6 shadow-sm"
                >
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <Skeleton className="size-14 rounded-md" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="mb-3 h-7 w-full" />
                    <div className="mb-4 space-y-3">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-7 w-16 rounded-full" />
                      <Skeleton className="h-7 w-20 rounded-full" />
                      <Skeleton className="h-7 w-14 rounded-full" />
                    </div>
                  </div>
                  <div className="mt-5 pt-3">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))
          ) : currentJobs.length > 0 ? (
            // Hiển thị danh sách công việc
            currentJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            // Hiển thị khi không có công việc
            <div className="col-span-4 py-10 text-center">
              <p className="text-lg text-gray-500">No jobs found</p>
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">No matching jobs found.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default JobList;
