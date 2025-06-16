// File: hirise-frontend/src/components/dashboard/JobCardGrid.tsx
import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { getStatusColor } from "@/utils/statusHelpers";
import {
  Calendar,
  CheckCircle,
  Edit,
  Eye,
  FileBarChart,
  MapPin,
  MoreVertical,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CompanyJob } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import JobFilters from "./JobFilters";

interface JobCardGridProps {
  jobs: CompanyJob[];
}

const JobCardGrid: React.FC<JobCardGridProps> = ({ jobs }) => {
  const navigate = useNavigate();

  // Filter state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState<CompanyJob[]>(jobs);

  // Apply filters effect
  useEffect(() => {
    let result = [...jobs];

    // Filter by keyword
    if (searchKeyword) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.company.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    // Filter by status
    if (filterStatus !== "All") {
      result = result.filter((job) => job.status === filterStatus);
    }

    setFilteredJobs(result);
  }, [jobs, searchKeyword, filterStatus]);

  // Handler for view job
  const handleViewJob = (id: number) => {
    navigate(ROUTES.COMPANY.JOBS.DETAIL.replace(":id", id.toString()));
  };

  // Handler for edit job
  const handleEditJob = (id: number) => {
    navigate(ROUTES.COMPANY.JOBS.EDIT.replace(":id", id.toString()));
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchKeyword("");
    setFilterStatus("All");
  };

  return (
    <>
      <JobFilters
        searchKeyword={searchKeyword}
        filterStatus={filterStatus}
        onSearchChange={setSearchKeyword}
        onStatusChange={setFilterStatus}
        onResetFilters={handleResetFilters}
      />

      {filteredJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewJob(Number(job.id))}>
                          <Eye className="mr-2 size-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditJob(Number(job.id))}>
                          <Edit className="mr-2 size-4" />
                          Edit
                        </DropdownMenuItem>
                        {job.status === "Published" && (
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 size-4" />
                            Close Job
                          </DropdownMenuItem>
                        )}
                        {job.status === "Draft" && (
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="mr-2 size-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      <Link
                        to={ROUTES.COMPANY.JOBS.DETAIL.replace(":id", job.id.toString())}
                        className="hover:text-primary hover:underline"
                      >
                        {job.title}
                      </Link>
                    </h3>
                    <div className="mb-4 text-sm text-gray-500">{job.company}</div>
                  </div>

                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="mr-2 size-4 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 size-4 text-gray-400" />
                      Deadline: {job.deadline}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 size-4 text-gray-400" />
                      {job.applicantCount} applicants
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 border-t p-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewJob(Number(job.id))}>
                      <Eye className="mr-2 size-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditJob(Number(job.id))}>
                      <Edit className="mr-2 size-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
          <div className="text-muted-foreground text-center">
            <FileBarChart className="mx-auto mb-2 size-8 opacity-40" />
            <h3 className="text-lg font-medium">No jobs found</h3>
            <p className="text-sm">Try adjusting your filters or create a new job</p>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCardGrid;
