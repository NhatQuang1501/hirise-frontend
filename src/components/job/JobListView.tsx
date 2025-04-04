import React, { useState } from "react";
import { Grid, List } from "lucide-react";
import { JobCardData } from "@/types/job";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import JobCard from "./JobCard";

interface JobListViewProps {
  jobs: JobCardData[];
}

const JobListView: React.FC<JobListViewProps> = ({ jobs }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Tính toán jobs hiện tại cho trang hiện tại
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Found <span className="text-secondary">{jobs.length}</span> jobs
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="mr-1 h-4 w-4" /> List
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="mr-1 h-4 w-4" /> Grid
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="border-border bg-card flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md md:flex-row"
            >
              <div className="flex w-full items-center gap-4 md:w-auto">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="h-16 w-16 rounded-md object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="hover:text-primary mb-2 text-lg font-semibold">
                  <a href={`/jobs/${job.id}`}>{job.title}</a>
                </h3>
                <p className="text-muted-foreground mb-2">{job.company}</p>
                <div className="mb-3 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-primary font-medium">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>{job.time}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col gap-2 md:mt-0 md:w-auto md:items-end">
                <Button>Apply</Button>
                <Button variant="outline">Save job</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Hiển thị tối đa 5 trang
              let pageToShow;
              if (totalPages <= 5) {
                pageToShow = i + 1;
              } else if (currentPage <= 3) {
                pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i;
              } else {
                pageToShow = currentPage - 2 + i;
              }

              return (
                <PaginationItem key={pageToShow}>
                  <PaginationLink
                    isActive={pageToShow === currentPage}
                    onClick={() => handlePageChange(pageToShow)}
                  >
                    {pageToShow}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default JobListView;
