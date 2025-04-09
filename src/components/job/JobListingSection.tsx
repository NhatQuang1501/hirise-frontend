import React, { useState } from "react";
import { Grid, List } from "lucide-react";
import { JobCardData } from "@/types/job";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Button } from "@/components/ui/button";
import JobCard from "./JobCard";

interface JobListingSectionProps {
  jobs: JobCardData[];
  viewType: "list" | "grid";
  title?: string;
  defaultView?: "grid" | "list";
  itemsPerPage?: number;
  className?: string;
  showViewToggle?: boolean;
}

const JobListingSection = ({
  jobs,
  title,
  defaultView = "list",
  itemsPerPage = 10,
  className = "",
  showViewToggle = true,
}: JobListingSectionProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {title ? (
            <h2 className="text-2xl font-bold">{title}</h2>
          ) : (
            <h2 className="text-xl font-semibold">
              Found <span className="text-secondary">{jobs.length}</span> jobs
            </h2>
          )}
        </div>
        {showViewToggle && (
          <div className="flex gap-2">
            <Button
              className="hover:bg-secondary/90 focus:bg-secondary/90"
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="mr-1 size-4" /> List
            </Button>
            <Button
              className="hover:bg-secondary/90 focus:bg-secondary/90"
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="mr-1 size-4" /> Grid
            </Button>
          </div>
        )}
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
                  className="size-16 rounded-md object-contain"
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
        <ResponsivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}
    </div>
  );
};

export default JobListingSection;
