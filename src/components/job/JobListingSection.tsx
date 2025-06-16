import React from "react";
import { FileX } from "lucide-react";
import { JobCardItem } from "@/types/job";
import { cn } from "@/lib/utils";
import JobCard from "@/components/job/JobCard";

interface JobListingSectionProps {
  title: string;
  jobs: JobCardItem[];
  viewType?: "grid" | "list";
  className?: string;
  emptyMessage?: React.ReactNode;
}

const JobListingSection: React.FC<JobListingSectionProps> = ({
  title,
  jobs,
  viewType = "grid",
  className,
  emptyMessage = "No jobs found",
}) => {
  // Khai báo các biến class bên ngoài khối lệnh điều kiện
  const gridClass = "grid gap-6 md:grid-cols-2 lg:grid-cols-3";
  const listClass = "flex flex-col gap-4";

  if (jobs.length === 0) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-muted-foreground mb-4 text-center">
            <FileX className="mx-auto mb-3 h-12 w-12 opacity-40" />
            <p>{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      </div>
      <div className={viewType === "grid" ? gridClass : listClass}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onSaveJob={() => {}} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default JobListingSection;
