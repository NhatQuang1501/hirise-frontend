import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  initialFilters?: FilterState; // Thêm prop initialFilters
}

// Cập nhật component để có thêm các filter mới
const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onChange, initialFilters }) => {
  // State để lưu trữ các filter
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

  // Cập nhật filters từ initialFilters nếu có
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

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
    // Nếu value là "any", đặt nó thành chuỗi rỗng trong state
    const actualValue = value === "any" ? "" : value;
    const newFilters = { ...filters, [key]: actualValue };
    setFilters(newFilters);
  };

  // Xử lý thay đổi checkbox
  const handleCheckboxChange = (key: keyof FilterState, value: string, checked: boolean) => {
    let currentValues = [...(filters[key] as string[])];

    if (checked) {
      currentValues.push(value);
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    // Đảm bảo các giá trị trong currentValues là chính xác
    if (key === "contractType") {
      // Đảm bảo giá trị job_type khớp với backend
      // Ví dụ: "full time", "part time", "contract", "freelance"
    } else if (key === "jobLevel") {
      // Đảm bảo giá trị experience_level khớp với backend
      // Ví dụ: "intern", "fresher", "junior", "middle", "senior", "lead", "manager"
    } else if (key === "city") {
      // Đảm bảo giá trị city khớp với backend
      // Ví dụ: "hanoi", "hochiminh", "danang", "hue", "cantho", "others"
    }

    handleFilterChange(key, currentValues);
  };

  // Xử lý áp dụng filter
  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    onChange(filters);
  };

  console.log("Sending filter parameters to backend:", filters);

  // UI cho component này
  return (
    <div className="mb-8 rounded-lg border p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Advanced Filters</h3>
        <Button onClick={handleApplyFilters} className="flex items-center gap-2">
          <Filter className="size-4" />
          Apply Filters
        </Button>
      </div>

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

      {/* Thêm nút reset filter và apply filter */}
      <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            const emptyFilters = {
              jobCategory: [],
              location: [],
              city: [],
              salaryRange: "",
              jobLevel: [],
              contractType: [],
              experience: "",
              postDate: "",
            };
            setFilters(emptyFilters);
            onChange(emptyFilters); // Gọi onChange khi reset
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
