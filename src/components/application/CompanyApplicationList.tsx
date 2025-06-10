import React, { useEffect, useState } from "react";
import { Application, ApplicationFilter, applicationService } from "@/services/application";
import { format } from "date-fns";
import { BarChart, CheckCircle, ExternalLink, FileText, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

interface CompanyApplicationListProps {
  jobId: string;
  className?: string;
}

export const CompanyApplicationList: React.FC<CompanyApplicationListProps> = ({
  jobId,
  className,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<ApplicationFilter>({
    ordering: "-created_at",
  });
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Fetch applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await applicationService.getJobApplications(jobId, {
        ...filters,
        page: currentPage,
      });
      setApplications(response.data);
      setTotalPages(response.total_pages);
      setTotalCount(response.count);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
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

  // Handle analyze CV
  const handleAnalyzeCV = async (applicationId: string) => {
    setProcessingId(applicationId);
    try {
      await applicationService.analyzeCV(applicationId);
      toast.success("CV analysis completed");
      fetchApplications();
    } catch (error) {
      console.error("Failed to analyze CV:", error);
      toast.error("Failed to analyze CV");
    } finally {
      setProcessingId(null);
    }
  };

  // Handle accept application
  const handleAccept = async (applicationId: string) => {
    if (window.confirm("Are you sure you want to accept this application?")) {
      try {
        await applicationService.acceptApplication(applicationId);
        toast.success("Application accepted successfully");
        fetchApplications();
      } catch (error) {
        console.error("Failed to accept application:", error);
        toast.error("Failed to accept application");
      }
    }
  };

  // Handle reject application
  const handleReject = async (applicationId: string) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      try {
        await applicationService.rejectApplication(applicationId);
        toast.success("Application rejected successfully");
        fetchApplications();
      } catch (error) {
        console.error("Failed to reject application:", error);
        toast.error("Failed to reject application");
      }
    }
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

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId, currentPage, filters]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold">Applications ({totalCount})</h2>
        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              handleFilterChange("status", value === "all" ? undefined : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
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
              <SelectItem value="-match_score">Highest Match Score</SelectItem>
              <SelectItem value="match_score">Lowest Match Score</SelectItem>
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
          <p className="text-lg text-gray-500">No applications found for this job.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {applications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white">
                        {getInitials(application.applicant_profile.full_name)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {application.applicant_profile.full_name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {application.applicant_profile.email} • Applied on{" "}
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
                  {application.match_score !== null && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Match Score:</span>
                        <Badge
                          className={
                            application.match_score >= 80
                              ? "bg-green-100 text-green-800"
                              : application.match_score >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {application.match_score}%
                        </Badge>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 line-clamp-2 text-sm text-gray-600">
                    {application.applicant_profile.description}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap justify-between gap-2 bg-gray-50">
                  <div className="flex flex-wrap gap-2">
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
                      onClick={() => handleAnalyzeCV(application.id)}
                      disabled={processingId === application.id}
                    >
                      <BarChart size={16} className="mr-2" />
                      {processingId === application.id ? "Processing..." : "Analyze CV"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAccept(application.id)}
                      className="border-green-500 text-green-500 hover:bg-green-50"
                      disabled={application.status === "accepted"}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(application.id)}
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      disabled={application.status === "rejected"}
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </Button>
                  </div>
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
