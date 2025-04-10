// import React, { useState } from "react";
// import {
//   Briefcase,
//   Calendar,
//   DollarSign,
//   GraduationCap,
//   MapPin,
//   Clock,
//   Filter
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// interface AdvancedFiltersProps {
//   onFilterChange: (filters: any) => void;
// }
// const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [filters, setFilters] = useState({
//     jobCategory: "",
//     location: "",
//     salaryRange: "",
//     jobLevel: "",
//     contractType: "",
//     experience: "",
//     company: "",
//     postDate: "",
//   });
//   const handleFilterChange = (key: string, value: string) => {
//     const updatedFilters = { ...filters, [key]: value };
//     setFilters(updatedFilters);
//     onFilterChange(updatedFilters);
//   };
//   return (
//     <Card className="bg-card w-full">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-xl flex items-center gap-2">
//             <Filter className="h-5 w-5" /> Advanced filters
//           </CardTitle>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             {isExpanded ? "Collapse" : "Expand"}
//           </Button>
//         </div>
//       </CardHeader>
//       {isExpanded && (
//         <CardContent className="pt-2">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
//             {/* Ngành nghề */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <Briefcase className="h-4 w-4" /> Job category
//               </label>
//               <div className="space-y-1">
//                 {["IT & Software", "Marketing", "Sales", "Design", "Data Science"].map((category) => (
//                   <div key={category} className="flex items-center gap-2">
//                     <Checkbox
//                       id={`category-${category}`}
//                       onCheckedChange={(checked) =>
//                         handleFilterChange("jobCategory", checked ? category : "")
//                       }
//                     />
//                     <label
//                       htmlFor={`category-${category}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {category}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Địa điểm */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <MapPin className="h-4 w-4" /> Location
//               </label>
//               <div className="space-y-1">
//                 {["Hanoi", "Ho Chi Minh", "Da Nang", "Remote"].map((location) => (
//                   <div key={location} className="flex items-center gap-2">
//                     <Checkbox
//                       id={`location-${location}`}
//                       onCheckedChange={(checked) =>
//                         handleFilterChange("location", checked ? location : "")
//                       }
//                     />
//                     <label
//                       htmlFor={`location-${location}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {location}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Mức lương */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <DollarSign className="h-4 w-4" /> Salary
//               </label>
//               <Select onValueChange={(value) => handleFilterChange("salaryRange", value)}>
//                 <SelectTrigger>
//                   <span>Select salary</span>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="500-1000">Below 10.000.000</SelectItem>
//                   <SelectItem value="1000-2000">10.000.000 - 20.000.000</SelectItem>
//                   <SelectItem value="2000-3000">20.000.000 - 30.000.000</SelectItem>
//                   <SelectItem value="3000+">Above 30.000.000</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Cấp bậc */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <GraduationCap className="h-4 w-4" /> Job level
//               </label>
//               <div className="space-y-1">
//                 {["Intern", "Junior", "Middle", "Senior", "Lead", "Manager"].map((level) => (
//                   <div key={level} className="flex items-center gap-2">
//                     <Checkbox
//                       id={`level-${level}`}
//                       onCheckedChange={(checked) =>
//                         handleFilterChange("jobLevel", checked ? level : "")
//                       }
//                     />
//                     <label
//                       htmlFor={`level-${level}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {level}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Loại hợp đồng */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <Clock className="h-4 w-4" /> Contract type
//               </label>
//               <div className="space-y-1">
//                 {["Full-time", "Part-time", "Freelance", "Contract"].map((type) => (
//                   <div key={type} className="flex items-center gap-2">
//                     <Checkbox
//                       id={`contract-${type}`}
//                       onCheckedChange={(checked) =>
//                         handleFilterChange("contractType", checked ? type : "")
//                       }
//                     />
//                     <label
//                       htmlFor={`contract-${type}`}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {type}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Kinh nghiệm */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <Briefcase className="h-4 w-4" /> Experience
//               </label>
//               <Select onValueChange={(value) => handleFilterChange("experience", value)}>
//                 <SelectTrigger>
//                   <span>Select years of experience</span>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="0-1">0-1 years</SelectItem>
//                   <SelectItem value="1-3">1-3 years</SelectItem>
//                   <SelectItem value="3-5">3-5 years</SelectItem>
//                   <SelectItem value="5+">5+ years</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {/* Ngày đăng tuyển */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium flex items-center gap-1">
//                 <Calendar className="h-4 w-4" /> Post date
//               </label>
//               <Select onValueChange={(value) => handleFilterChange("postDate", value)}>
//                 <SelectTrigger>
//                   <span>Select post date</span>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="today">Today</SelectItem>
//                   <SelectItem value="week">This week</SelectItem>
//                   <SelectItem value="month">This month</SelectItem>
//                   <SelectItem value="any">Any</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end gap-3">
//             <Button variant="outline" onClick={() => {
//               setFilters({
//                 jobCategory: "",
//                 location: "",
//                 salaryRange: "",
//                 jobLevel: "",
//                 contractType: "",
//                 experience: "",
//                 company: "",
//                 postDate: "",
//               });
//               onFilterChange({});
//             }}>
//               Clear filters
//             </Button>
//             <Button onClick={() => onFilterChange(filters)}>
//               Apply
//             </Button>
//           </div>
//         </CardContent>
//       )}
//     </Card>
//   );
// };
// export default AdvancedFilters;
import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Filter,
  GraduationCap,
  MapPin,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterState {
  jobCategory: string[];
  location: string[];
  salaryRange: string;
  jobLevel: string[];
  contractType: string[];
  experience: string;
  postDate: string;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<FilterState>({
    jobCategory: [],
    location: [],
    salaryRange: "",
    jobLevel: [],
    contractType: [],
    experience: "",
    postDate: "",
  });

  // Đếm số bộ lọc đang hoạt động
  const activeFiltersCount = [
    ...filters.jobCategory,
    ...filters.location,
    ...filters.jobLevel,
    ...filters.contractType,
    filters.salaryRange,
    filters.experience,
    filters.postDate,
  ].filter(Boolean).length;

  // Xử lý thay đổi cho checkbox
  const handleCheckboxChange = (group: keyof FilterState, value: string, checked: boolean) => {
    setFilters((prev) => {
      const values = [...prev[group]];
      if (checked) {
        values.push(value);
      } else {
        const index = values.indexOf(value);
        if (index !== -1) {
          values.splice(index, 1);
        }
      }
      return { ...prev, [group]: values };
    });
  };

  // Xử lý thay đổi cho select
  const handleSelectChange = (group: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [group]: value }));
  };

  // Xóa tất cả bộ lọc
  const clearAllFilters = () => {
    const resetFilters = {
      jobCategory: [],
      location: [],
      salaryRange: "",
      jobLevel: [],
      contractType: [],
      experience: "",
      postDate: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Xóa một bộ lọc cụ thể
  const clearSingleFilter = (group: keyof FilterState) => {
    if (Array.isArray(filters[group])) {
      setFilters((prev) => ({ ...prev, [group]: [] }));
    } else {
      setFilters((prev) => ({ ...prev, [group]: "" }));
    }
  };

  // Áp dụng bộ lọc
  const applyFilters = () => {
    onFilterChange(filters);
  };

  // Kiểm tra xem nhóm có bộ lọc nào được áp dụng không
  const isFilterActive = (group: keyof FilterState) => {
    if (Array.isArray(filters[group])) {
      return (filters[group] as string[]).length > 0;
    }
    return Boolean(filters[group]);
  };

  return (
    <Card className="bg-card border-border w-full border shadow-md">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-secondary flex items-center gap-2 text-2xl font-medium">
            <Filter className="size-10" />
            <span>Advanced filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 py-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-foreground h-8 px-2 text-sm"
          >
            {isExpanded ? (
              <span className="flex items-center">
                Collapse <ChevronUp className="ml-1 size-3" />
              </span>
            ) : (
              <span className="flex items-center">
                Expand <ChevronDown className="ml-1 size-3" />
              </span>
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-4 pt-0">
          <Separator className="mb-4" />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-muted/50 mb-4 p-1">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="job" className="text-xs">
                Job
              </TabsTrigger>
              <TabsTrigger value="location" className="text-xs">
                Location
              </TabsTrigger>
              <TabsTrigger value="company" className="text-xs">
                Company
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
                {/* Ngành nghề */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Field</h3>
                    </div>
                    {isFilterActive("jobCategory") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("jobCategory")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {["IT & Software", "Marketing", "Sales", "Design", "Data Science"].map(
                      (category) => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.jobCategory.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("jobCategory", category, checked === true)
                            }
                            className="h-3.5 w-3.5"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="cursor-pointer text-xs"
                          >
                            {category}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Địa điểm */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Location</h3>
                    </div>
                    {isFilterActive("location") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("location")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {["Ha Noi", "Ho Chi Minh City", "Da Nang", "Remote"].map((location, idx) => {
                      const locationValues = ["Hanoi", "Ho Chi Minh", "Da Nang", "Remote"];
                      return (
                        <div key={location} className="flex items-center gap-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={filters.location.includes(locationValues[idx])}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                "location",
                                locationValues[idx],
                                checked === true,
                              )
                            }
                            className="h-3.5 w-3.5"
                          />
                          <label
                            htmlFor={`location-${location}`}
                            className="cursor-pointer text-xs"
                          >
                            {location}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mức lương */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Salary</h3>
                    </div>
                    {isFilterActive("salaryRange") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("salaryRange")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <Select
                    value={filters.salaryRange}
                    onValueChange={(value) => handleSelectChange("salaryRange", value)}
                  >
                    <SelectTrigger className="bg-background h-8 text-xs">
                      <SelectValue placeholder="Salary range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000" className="text-xs">
                        Below 10.000.000 VND
                      </SelectItem>
                      <SelectItem value="1000-2000" className="text-xs">
                        10.000.000 - 30.000.000 VND
                      </SelectItem>
                      <SelectItem value="2000-3000" className="text-xs">
                        30.000.000 - 50.000.000 VND
                      </SelectItem>
                      <SelectItem value="3000+" className="text-xs">
                        Over 50.000.000 VND
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cấp bậc */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Job level</h3>
                    </div>
                    {isFilterActive("jobLevel") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("jobLevel")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      { label: "Intern", value: "Intern" },
                      { label: "Fresher", value: "Fresher" },
                      { label: "Junior", value: "Junior" },
                      { label: "Middle", value: "Middle" },
                      { label: "Senior", value: "Senior" },
                      { label: "Lead", value: "Lead" },
                      { label: "Manager", value: "Manager" },
                      { label: "Chief", value: "Chief" },
                    ].map((level) => (
                      <div key={level.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`level-${level.value}`}
                          checked={filters.jobLevel.includes(level.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("jobLevel", level.value, checked === true)
                          }
                          className="h-3.5 w-3.5"
                        />
                        <label htmlFor={`level-${level.value}`} className="cursor-pointer text-xs">
                          {level.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loại hợp đồng */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Contract type</h3>
                    </div>
                    {isFilterActive("contractType") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("contractType")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      { label: "Full-time", value: "Full-time" },
                      { label: "Part-time", value: "Part-time" },
                      { label: "Freelance", value: "Freelance" },
                      { label: "Contract", value: "Contract" },
                    ].map((type) => (
                      <div key={type.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`contract-${type.value}`}
                          checked={filters.contractType.includes(type.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("contractType", type.value, checked === true)
                          }
                          className="h-3.5 w-3.5"
                        />
                        <label
                          htmlFor={`contract-${type.value}`}
                          className="cursor-pointer text-xs"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kinh nghiệm */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Years of experience</h3>
                    </div>
                    {isFilterActive("experience") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("experience")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <Select
                    value={filters.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                  >
                    <SelectTrigger className="bg-background h-8 text-xs">
                      <SelectValue placeholder="Chọn kinh nghiệm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1" className="text-xs">
                        0-1 year
                      </SelectItem>
                      <SelectItem value="1-3" className="text-xs">
                        1-3 years
                      </SelectItem>
                      <SelectItem value="3-5" className="text-xs">
                        3-5 years
                      </SelectItem>
                      <SelectItem value="5+" className="text-xs">
                        5+ years
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ngày đăng tuyển */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Post date</h3>
                    </div>
                    {isFilterActive("postDate") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSingleFilter("postDate")}
                        className="h-6 p-0 px-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <Select
                    value={filters.postDate}
                    onValueChange={(value) => handleSelectChange("postDate", value)}
                  >
                    <SelectTrigger className="bg-background h-8 text-xs">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today" className="text-xs">
                        Today
                      </SelectItem>
                      <SelectItem value="week" className="text-xs">
                        This week
                      </SelectItem>
                      <SelectItem value="month" className="text-xs">
                        This month
                      </SelectItem>
                      <SelectItem value="any" className="text-xs">
                        Any
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="job" className="m-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Ngành nghề */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Fields</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {["IT & Software", "Marketing", "Sales", "Design", "Data Science"].map(
                      (category) => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox
                            id={`tab-category-${category}`}
                            checked={filters.jobCategory.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("jobCategory", category, checked === true)
                            }
                            className="h-3.5 w-3.5"
                          />
                          <label
                            htmlFor={`tab-category-${category}`}
                            className="cursor-pointer text-xs"
                          >
                            {category}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Cấp bậc */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Job level</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      { label: "Intern", value: "Intern" },
                      { label: "Fresher", value: "Fresher" },
                      { label: "Junior", value: "Junior" },
                      { label: "Middle", value: "Middle" },
                      { label: "Senior", value: "Senior" },
                      { label: "Lead", value: "Lead" },
                      { label: "Manager", value: "Manager" },
                      { label: "Chief", value: "Chief" },
                    ].map((level) => (
                      <div key={level.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`tab-level-${level.value}`}
                          checked={filters.jobLevel.includes(level.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("jobLevel", level.value, checked === true)
                          }
                          className="h-3.5 w-3.5"
                        />
                        <label
                          htmlFor={`tab-level-${level.value}`}
                          className="cursor-pointer text-xs"
                        >
                          {level.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="m-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Địa điểm */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Location</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {["Ha Noi", "Ho Chi Minh", "Da Nang", "Remote"].map((location, idx) => {
                      const locationValues = ["Hanoi", "Ho Chi Minh", "Da Nang", "Remote"];
                      return (
                        <div key={location} className="flex items-center gap-2">
                          <Checkbox
                            id={`tab-location-${location}`}
                            checked={filters.location.includes(locationValues[idx])}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                "location",
                                locationValues[idx],
                                checked === true,
                              )
                            }
                            className="h-3.5 w-3.5"
                          />
                          <label
                            htmlFor={`tab-location-${location}`}
                            className="cursor-pointer text-xs"
                          >
                            {location}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="company" className="m-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Loại hợp đồng */}
                <div className="bg-muted/20 space-y-3 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock className="text-primary h-4 w-4" />
                      <h3 className="text-sm font-medium">Contract type</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {[
                      { label: "Full-time", value: "Full-time" },
                      { label: "Part-time", value: "Part-time" },
                      { label: "Freelance", value: "Freelance" },
                      { label: "Contract", value: "Contract" },
                    ].map((type) => (
                      <div key={type.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`tab-contract-${type.value}`}
                          checked={filters.contractType.includes(type.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("contractType", type.value, checked === true)
                          }
                          className="h-3.5 w-3.5"
                        />
                        <label
                          htmlFor={`tab-contract-${type.value}`}
                          className="cursor-pointer text-xs"
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-muted-foreground mr-1 self-center text-xs">
                Selected filters:
              </span>
              {filters.jobCategory.map((cat) => (
                <Badge key={`badge-${cat}`} variant="secondary" className="py-0 text-xs">
                  {cat}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCheckboxChange("jobCategory", cat, false)}
                    className="ml-1 h-3 w-3 p-0"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
              {/* Hiển thị tương tự cho các bộ lọc khác */}
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
              Clear filters
            </Button>
            <Button size="sm" onClick={applyFilters} className="bg-primary h-8 text-xs">
              Apply
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AdvancedFilters;
