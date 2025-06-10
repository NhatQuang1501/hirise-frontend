import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterState {
  jobCategory: string[];
  city: string[];
  location: string[];
  salaryRange: string;
  jobLevel: string[];
  contractType: string[];
  experience: string;
  postDate: string;
}

interface AdvancedFiltersProps {
  onChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onChange, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    jobCategory: [],
    location: [],
    city: [],
    salaryRange: "",
    jobLevel: [],
    contractType: [],
    experience: "",
    postDate: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Cập nhật filters từ initialFilters nếu có
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Tính toán số lượng filter đang hoạt động
  useEffect(() => {
    let count = 0;
    if (filters.city.length > 0) count++;
    if (filters.jobLevel.length > 0) count++;
    if (filters.contractType.length > 0) count++;
    if (filters.salaryRange) count++;
    if (filters.postDate) count++;
    setActiveFilterCount(count);
  }, [filters]);

  // Các options cho filter
  const cityOptions = [
    { value: "hanoi", label: "Ha Noi" },
    { value: "hochiminh", label: "Ho Chi Minh" },
    { value: "danang", label: "Da Nang" },
    { value: "hue", label: "Hue" },
    { value: "cantho", label: "Can Tho" },
    { value: "others", label: "Others" },
  ];

  const jobLevelOptions = [
    { value: "intern", label: "Intern" },
    { value: "fresher", label: "Fresher" },
    { value: "junior", label: "Junior" },
    { value: "middle", label: "Mid" },
    { value: "senior", label: "Senior" },
    { value: "lead", label: "Lead" },
    { value: "manager", label: "Manager" },
  ];

  const contractTypeOptions = [
    { value: "full time", label: "Full Time" },
    { value: "part time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
  ];

  const salaryRangeOptions = [
    { value: "0-10000000", label: "Under 10 million VND" },
    { value: "10000000-20000000", label: "10-20 million VND" },
    { value: "20000000-30000000", label: "20-30 million VND" },
    { value: "30000000-50000000", label: "30-50 million VND" },
    { value: "50000000-100000000", label: "50-100 million VND" },
    { value: "100000000-", label: "Over 100 million VND" },
  ];

  const postDateOptions = [
    { value: "today", label: "Today" },
    { value: "this_week", label: "This Week" },
    { value: "this_month", label: "This Month" },
  ];

  // Xử lý thay đổi filter
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const actualValue = value === "any" ? "" : value;
    const newFilters = { ...filters, [key]: actualValue };
    setFilters(newFilters);
    onChange(newFilters);
  };

  // Xử lý thay đổi checkbox
  const handleCheckboxChange = (key: keyof FilterState, value: string, checked: boolean) => {
    let currentValues = [...(filters[key] as string[])];

    if (checked) {
      currentValues.push(value);
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    handleFilterChange(key, currentValues);
  };

  // Xóa tất cả filter
  const handleClearAllFilters = () => {
    const resetFilters = {
      jobCategory: [],
      location: [],
      city: [],
      salaryRange: "",
      jobLevel: [],
      contractType: [],
      experience: "",
      postDate: "",
    };
    setFilters(resetFilters);
    onChange(resetFilters);
  };

  // Lấy label từ value
  const getLabelFromValue = (options: { value: string; label: string }[], value: string) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="mt-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button
                variant={isOpen ? "default" : "outline"}
                className={`gap-2 transition-all duration-200 ${
                  isOpen
                    ? "bg-primary text-white shadow-md"
                    : "hover:border-primary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <Filter className={`size-4 ${isOpen ? "animate-pulse" : ""}`} />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant={isOpen ? "outline" : "secondary"}
                    className={`ml-1 ${isOpen ? "bg-white/20 text-white" : ""}`}
                  >
                    {activeFilterCount}
                  </Badge>
                )}
                {isOpen ? (
                  <ChevronUp className="ml-1 size-4 transition-transform duration-300" />
                ) : (
                  <ChevronDown className="ml-1 size-4 transition-transform duration-300" />
                )}
              </Button>
            </CollapsibleTrigger>

            {/* Active filters */}
            {activeFilterCount > 0 && (
              <div className="ml-2 flex flex-wrap gap-2">
                {filters.city.length > 0 && (
                  <Badge variant="outline" className="bg-primary/5 flex items-center gap-1">
                    City: {filters.city.length}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => handleFilterChange("city", [])}
                    />
                  </Badge>
                )}

                {filters.jobLevel.length > 0 && (
                  <Badge variant="outline" className="bg-primary/5 flex items-center gap-1">
                    Level: {filters.jobLevel.length}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => handleFilterChange("jobLevel", [])}
                    />
                  </Badge>
                )}

                {filters.contractType.length > 0 && (
                  <Badge variant="outline" className="bg-primary/5 flex items-center gap-1">
                    Type: {filters.contractType.length}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => handleFilterChange("contractType", [])}
                    />
                  </Badge>
                )}

                {filters.salaryRange && (
                  <Badge variant="outline" className="bg-primary/5 flex items-center gap-1">
                    Salary: {getLabelFromValue(salaryRangeOptions, filters.salaryRange)}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => handleFilterChange("salaryRange", "")}
                    />
                  </Badge>
                )}

                {filters.postDate && (
                  <Badge variant="outline" className="bg-primary/5 flex items-center gap-1">
                    Posted: {getLabelFromValue(postDateOptions, filters.postDate)}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => handleFilterChange("postDate", "")}
                    />
                  </Badge>
                )}

                <Button
                  variant="clear"
                  size="sm"
                  className="flex h-6 items-center gap-1 rounded-md px-2 text-xs font-medium text-rose-500 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-600"
                  onClick={handleClearAllFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        <CollapsibleContent className="mt-4 transition-all duration-300">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* City Filter */}
              <div>
                <h4 className="mb-2 font-medium">City</h4>
                <div className="space-y-2">
                  {cityOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`city-${option.value}`}
                        checked={filters.city.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("city", option.value, checked === true)
                        }
                      />
                      <label htmlFor={`city-${option.value}`} className="ml-2 text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Level Filter */}
              <div>
                <h4 className="mb-2 font-medium">Experience Level</h4>
                <div className="space-y-2">
                  {jobLevelOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`level-${option.value}`}
                        checked={filters.jobLevel.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("jobLevel", option.value, checked === true)
                        }
                      />
                      <label htmlFor={`level-${option.value}`} className="ml-2 text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Type Filter */}
              <div>
                <h4 className="mb-2 font-medium">Job Type</h4>
                <div className="space-y-2">
                  {contractTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <Checkbox
                        id={`type-${option.value}`}
                        checked={filters.contractType.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("contractType", option.value, checked === true)
                        }
                      />
                      <label htmlFor={`type-${option.value}`} className="ml-2 text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <h4 className="mb-2 font-medium">Salary Range</h4>
                <Select
                  value={filters.salaryRange}
                  onValueChange={(value) => handleFilterChange("salaryRange", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Salary</SelectItem>
                    {salaryRangeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Post Date Filter */}
              <div>
                <h4 className="mb-2 font-medium">Posted Date</h4>
                <Select
                  value={filters.postDate}
                  onValueChange={(value) => handleFilterChange("postDate", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    {postDateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedFilters;
