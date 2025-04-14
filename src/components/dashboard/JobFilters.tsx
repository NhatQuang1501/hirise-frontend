// File: hirise-frontend/src/components/dashboard/JobFilters.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { X } from "lucide-react";

interface JobFiltersProps {
  searchKeyword: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onResetFilters: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  searchKeyword,
  filterStatus,
  onSearchChange,
  onStatusChange,
  onResetFilters
}) => {
  return (
    <div className="mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex flex-1 flex-wrap gap-2">
        <Input
          placeholder="Search by title, company..."
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full max-w-xs"
        />
        <Select value={filterStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetFilters}
          disabled={!searchKeyword && filterStatus === "All"}
        >
          <X className="mr-2 size-3.5" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default JobFilters;