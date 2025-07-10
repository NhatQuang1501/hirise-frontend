import React, { useEffect, useState } from "react";
import { Application, ApplicationFilter, applicationService } from "@/services/application";
import { format } from "date-fns";
import { ExternalLink, FileText, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WithdrawButton from "@/components/application/WithdrawButton";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApplicantApplicationListProps {
  className?: string;
}

export const ApplicantApplicationList: React.FC<ApplicantApplicationListProps> = ({
  className,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<ApplicationFilter>({
    ordering: "-created_at",
  });
  const navigate = useNavigate();

  // Fetch applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await applicationService.getMyApplications({
        ...filters,
        page: currentPage,
      });
      setApplications(response.data);
      setTotalPages(response.total_pages);
      // setTotalCount(response.count);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load your applications");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle filter change
  const handleFilterChange = (key: keyof ApplicationFilter, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentPage, filters]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">My Applications</h2>
        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.status || ""}
            onValueChange={(value) => handleFilterChange("status", value || undefined)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.ordering || "-created_at"}
            onValueChange={(value) => handleFilterChange("ordering", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-created_at">Newest First</SelectItem>
              <SelectItem value="created_at">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-lg text-gray-500">You haven't applied to any jobs yet.</p>
          <Button className="mt-4" onClick={() => navigate("/jobs")}>
            Browse Jobs
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {applications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                      {application.company_logo ? (
                        <img
                          src={application.company_logo}
                          alt={application.job_details.company_name}
                          className="h-12 w-12 rounded-md border border-gray-200 object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-1 text-lg font-bold text-gray-400">
                          {application.job_details.company_name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl">{application.job_details.title}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {application.job_details.company_name} • Applied on{" "}
                          {format(new Date(application.created_at), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status_display}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="mb-2 flex items-center gap-2">
                    <FileText size={18} />
                    <span className="font-medium">{application.cv_filename}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(application.cv_file, "_blank")}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View CV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/jobs/${application.job_details.id}`)}
                    >
                      View Job
                    </Button>
                  </div>

                  <WithdrawButton
                    applicationId={application.id}
                    status={application.status}
                    onWithdraw={fetchApplications}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Withdraw
                  </WithdrawButton>
                </CardFooter>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <ResponsivePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
