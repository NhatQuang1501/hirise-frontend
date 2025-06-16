import React, { useState } from "react";
import { Briefcase, SortAsc, SortDesc } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobsSelectionSidebarProps {
  statsLoading: boolean;
  jobs: any[];
  selectedJobId: string | null;
  handleJobSelect: (jobId: string) => void;
  onSortChange?: (ordering: string) => void;
}

export const JobsSelectionSidebar: React.FC<JobsSelectionSidebarProps> = ({
  statsLoading,
  jobs,
  selectedJobId,
  handleJobSelect,
  onSortChange,
}) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleSortToggle = () => {
    const newOrder = sortOrder === "newest" ? "oldest" : "newest";
    setSortOrder(newOrder);
    if (onSortChange) {
      onSortChange(newOrder === "newest" ? "-created_at" : "created_at");
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-medium">
            <Briefcase className="text-primary h-4 w-4" />
            Select a Job
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSortToggle}
            className="h-8 w-8 p-0"
            title={sortOrder === "newest" ? "Newest first" : "Oldest first"}
          >
            {sortOrder === "newest" ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <SortAsc className="h-4 w-4" />
            )}
          </Button>
        </div>
        {statsLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="h-8 w-full animate-pulse rounded bg-gray-200"></div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="max-h-[400px] space-y-1 overflow-y-auto pr-1">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => handleJobSelect(job.id)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  selectedJobId === job.id
                    ? "bg-primary font-medium text-white"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <span className="line-clamp-1 flex-1">{job.title}</span>
                <Badge
                  variant={selectedJobId === job.id ? "secondary" : "outline"}
                  className={selectedJobId === job.id ? "bg-white/20" : ""}
                >
                  {job.application_count || 0}
                </Badge>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
};
