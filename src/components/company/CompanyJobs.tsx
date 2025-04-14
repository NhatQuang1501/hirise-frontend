import React, { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyJobsProps } from "@/types/interfaces";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CompanyJobs = ({ companyId, openPositions }: CompanyJobsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Mock jobs data - replace with API call
  const jobs = Array.from({ length: openPositions }, (_, i) => ({
    id: i + 1,
    title: `Senior Software Engineer ${i + 1}`,
    location: "Remote",
    type: "Full-time",
    postedAt: `${Math.floor(Math.random() * 30) + 1} days ago`,
  }));

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Briefcase className="text-primary size-6" />
          Open Positions <span className="text-primary bg-amber-500">{openPositions}</span>
        </h2>
      </div>

      <div className="divide-y">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="group flex flex-col gap-4 py-6 transition-all hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link
                to={ROUTES.PUBLIC.JOBS.DETAIL.replace(":id", job.id.toString())}
                className="hover:text-primary text-lg font-medium"
              >
                {job.title}
              </Link>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-muted-foreground size-4" />
                  <span className="text-muted-foreground text-sm">{job.location}</span>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
                <span className="text-muted-foreground text-sm">{job.postedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CompanyJobs;
