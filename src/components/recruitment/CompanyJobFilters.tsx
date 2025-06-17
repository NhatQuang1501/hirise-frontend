import React, { useEffect, useState } from "react";
import { JobStatus } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { companyService } from "@/services/company";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";

// Thêm các filter và parameters mới
interface CompanyJobFiltersProps {
  searchKeyword: string;
  activeStatus: JobStatus | "All";
  activeFilters?: {
    jobLevel?: string[];
    contractType?: string[];
    city?: string[];
  };
  onSearchChange: (keyword: string) => void;
  onStatusChange: (status: JobStatus | "All") => void;
  onFilterChange?: (filters: any) => void;
  onCreateJob: () => void;
}

const CompanyJobFilters: React.FC<CompanyJobFiltersProps> = ({
  searchKeyword,
  activeStatus,
  activeFilters,
  onSearchChange,
  onStatusChange,
  onFilterChange,
  onCreateJob,
}) => {
  const { user } = useAuth();
  const [jobCounts, setJobCounts] = useState({
    all: 0,
    published: 0,
    draft: 0,
    closed: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Lấy số lượng job theo từng trạng thái
  useEffect(() => {
    const fetchJobCounts = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const counts = await companyService.getCompanyJobsCount(user.id);
          setJobCounts(counts);
        } catch (error) {
          console.error("Error fetching job counts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchJobCounts();
  }, [user?.id]);

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchChange(searchKeyword);
  };

  // Thêm các lựa chọn filter cho loại công việc
  const contractTypeOptions = [
    { value: "full time", label: "Full Time" },
    { value: "part time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
  ];

  // Thêm các lựa chọn filter cho cấp độ công việc
  const jobLevelOptions = [
    { value: "intern", label: "Intern" },
    { value: "fresher", label: "Fresher" },
    { value: "junior", label: "Junior" },
    { value: "middle", label: "Middle" },
    { value: "senior", label: "Senior" },
    { value: "lead", label: "Lead" },
    { value: "manager", label: "Manager" },
  ];

  // Thêm các lựa chọn filter cho thành phố
  const cityOptions = [
    { value: "hanoi", label: "Ha Noi" },
    { value: "hochiminh", label: "Ho Chi Minh" },
    { value: "danang", label: "Da Nang" },
    { value: "hue", label: "Hue" },
    { value: "cantho", label: "Can Tho" },
    { value: "others", label: "Others" },
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Search, status, và nút Create Job */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search form */}
        <form onSubmit={handleSearch} className="flex w-full max-w-md">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none">
            Search
          </Button>
        </form>
        
        {/* Create Job button */}
        <Button onClick={onCreateJob} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Job
        </Button>
      </div>

      {/* Status filter tabs with counts */}
      <Tabs
        value={activeStatus}
        onValueChange={(value) => onStatusChange(value as JobStatus | "All")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="All" disabled={isLoading}>
            All Jobs {!isLoading && <span className="ml-1 text-xs">({jobCounts.all})</span>}
          </TabsTrigger>
          <TabsTrigger value="Published" disabled={isLoading}>
            Published {!isLoading && <span className="ml-1 text-xs">({jobCounts.published})</span>}
          </TabsTrigger>
          <TabsTrigger value="Draft" disabled={isLoading}>
            Draft {!isLoading && <span className="ml-1 text-xs">({jobCounts.draft})</span>}
          </TabsTrigger>
          <TabsTrigger value="Closed" disabled={isLoading}>
            Closed {!isLoading && <span className="ml-1 text-xs">({jobCounts.closed})</span>}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Advanced filters */}
      {onFilterChange && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Loại công việc */}
          <div>
            <label className="mb-1 block text-sm font-medium">Job Type</label>
            <Select
              onValueChange={(value) => {
                onFilterChange({
                  ...activeFilters,
                  contractType: value === "all" ? [] : [value],
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {contractTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cấp độ công việc */}
          <div>
            <label className="mb-1 block text-sm font-medium">Experience Level</label>
            <Select
              onValueChange={(value) => {
                onFilterChange({
                  ...activeFilters,
                  jobLevel: value === "all" ? [] : [value],
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {jobLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thành phố */}
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <Select
              onValueChange={(value) => {
                onFilterChange({
                  ...activeFilters,
                  city: value === "all" ? [] : [value],
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyJobFilters;
