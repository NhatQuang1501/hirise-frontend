import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobStatus } from "@/types/recruiter";

interface RecruiterJobFiltersProps {
  searchKeyword: string;
  activeStatus: JobStatus | "All";
  onSearchChange: (keyword: string) => void;
  onStatusChange: (status: JobStatus | "All") => void;
  onCreateJob: () => void;
}

const RecruiterJobFilters: React.FC<RecruiterJobFiltersProps> = ({
  searchKeyword,
  activeStatus,
  onSearchChange,
  onStatusChange,
  onCreateJob,
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <Button onClick={onCreateJob} size="lg">
          + Create Job
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by job title..."
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeStatus === "All" ? "default" : "outline"}
            onClick={() => onStatusChange("All")}
            className="min-w-24"
          >
            All
          </Button>
          <Button
            variant={activeStatus === "Published" ? "default" : "outline"}
            onClick={() => onStatusChange("Published")}
            className="min-w-24"
          >
            Published
          </Button>
          <Button
            variant={activeStatus === "Draft" ? "default" : "outline"}
            onClick={() => onStatusChange("Draft")}
            className="min-w-24"
          >
            Draft
          </Button>
          <Button
            variant={activeStatus === "Closed" ? "default" : "outline"}
            onClick={() => onStatusChange("Closed")}
            className="min-w-24"
          >
            Closed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobFilters;