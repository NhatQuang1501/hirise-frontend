import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { aiMatchingService } from "@/services/ai-matching";
import { Application, ApplicationFilter, applicationService } from "@/services/application";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, ArrowUpDown, BarChart, Download, Eye } from "lucide-react";
// import { format } from "date-fns";
// import { BarChart, CheckCircle, ExternalLink, FileText, XCircle } from "lucide-react";
// import { toast } from "sonner";
// import { ResponsivePagination } from "@/components/section/ResponsivePagination";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ApplicationMatchModal } from "@/components/ai-matching/ApplicationMatchModal";
import { ApplicationStatusButtons } from "@/components/application/ApplicationStatusButtons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface CompanyApplicationListProps {
  jobId: string;
  className?: string;
}

export const CompanyApplicationList: React.FC<CompanyApplicationListProps> = ({
  jobId,
  // className,
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
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const navigate = useNavigate();

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

  // Fetch match results
  const fetchMatchResults = async () => {
    try {
      const results = await aiMatchingService.getJobMatchResults(jobId);
      setMatchResults(results);
    } catch (error) {
      console.error("Error fetching match results:", error);
    }
  };

  // Handle page change
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  // // Handle filter change
  // const handleFilterChange = (key: keyof ApplicationFilter, value: string | undefined) => {
  //   setFilters((prev) => ({ ...prev, [key]: value }));
  //   setCurrentPage(1);
  // };

  // // Handle analyze CV
  // const handleAnalyzeCV = async (applicationId: string) => {
  //   setProcessingId(applicationId);
  //   try {
  //     await applicationService.analyzeCV(applicationId);
  //     toast.success("CV analysis completed");
  //     fetchApplications();
  //   } catch (error) {
  //     console.error("Failed to analyze CV:", error);
  //     toast.error("Failed to analyze CV");
  //   } finally {
  //     setProcessingId(null);
  //   }
  // };

  // Handle accept application
  // const handleAccept = async (applicationId: string) => {
  //   if (window.confirm("Are you sure you want to accept this application?")) {
  //     try {
  //       await applicationService.acceptApplication(applicationId);
  //       toast.success("Application accepted successfully");
  //       fetchApplications();
  //     } catch (error) {
  //       console.error("Failed to accept application:", error);
  //       toast.error("Failed to accept application");
  //     }
  //   }
  // };

  // // Handle reject application
  // const handleReject = async (applicationId: string) => {
  //   if (window.confirm("Are you sure you want to reject this application?")) {
  //     try {
  //       await applicationService.rejectApplication(applicationId);
  //       toast.success("Application rejected successfully");
  //       fetchApplications();
  //     } catch (error) {
  //       console.error("Failed to reject application:", error);
  //       toast.error("Failed to reject application");
  //     }
  //   }
  // };

  // Get status badge color
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "reviewing":
  //       return "bg-blue-100 text-blue-800";
  //     case "processing":
  //       return "bg-purple-100 text-purple-800";
  //     case "accepted":
  //       return "bg-green-100 text-green-800";
  //     case "rejected":
  //       return "bg-red-100 text-red-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  // // Get initials for avatar
  // const getInitials = (name: string) => {
  //   return name
  //     .split(" ")
  //     .map((n) => n[0])
  //     .join("")
  //     .toUpperCase()
  //     .substring(0, 2);
  // };

  useEffect(() => {
    fetchApplications();
    fetchMatchResults();
  }, [jobId, currentPage, filters]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="border-blue-200 bg-blue-100 text-blue-800">Pending</Badge>;
      case "reviewing":
        return <Badge className="border-purple-200 bg-purple-100 text-purple-800">Reviewing</Badge>;
      case "accepted":
        return <Badge className="border-green-200 bg-green-100 text-green-800">Accepted</Badge>;
      case "rejected":
        return <Badge className="border-red-200 bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Update the match score display
  const getMatchScore = (applicationId: string) => {
    const matchResult = matchResults.find((result) => result.application === applicationId);
    return matchResult ? matchResult.match_score : null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <ArrowUp className="ml-2 h-4 w-4 text-green-600" />;
    if (score >= 40) return <ArrowUpDown className="ml-2 h-4 w-4 text-amber-600" />;
    return <ArrowDown className="ml-2 h-4 w-4 text-red-600" />;
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
        <p className="mt-2 text-sm text-gray-500">There are no applications for this job yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Applications ({applications.length})</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review all applications for this job
          </p>
        </div>
        <div className="flex space-x-2">
          {/* <Button
            onClick={() => navigate(ROUTES.COMPANY.JOBS.MATCH_ANALYSIS.replace(":id", jobId))}
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            <BarChart className="h-4 w-4 mr-2" />
            View All Match Results
          </Button> */}
          {/* <Button
            onClick={async () => {
              try {
                toast.loading("Analyzing all applications...");
                await aiMatchingService.matchAllApplications(jobId);
                toast.success("Analysis completed for all applications");
                fetchMatchResults();
              } catch (error) {
                console.error("Error analyzing all applications:", error);
                toast.error("Failed to analyze applications");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Analyze All Applications
          </Button> */}
        </div>
      </div>

      {/* Custom styling cho bảng */}
      <style>
        {`
        .custom-table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }
        
        .custom-table th {
          background: linear-gradient(to right, #f8fafc, #f1f5f9);
          color: #475569;
          font-weight: 600;
          text-align: left;
          padding: 12px 16px;
          font-size: 0.875rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .custom-table tr:hover td {
          background-color: #f8fafc;
        }
        
        .custom-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s;
        }
        
        .custom-table tr:last-child td {
          border-bottom: none;
        }
      `}
      </style>

      <div className="overflow-x-auto p-2">
        <Table className="custom-table">
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {application.applicant_profile?.full_name || "Anonymous"}
                  <div className="text-xs text-gray-500">
                    {application.applicant_profile?.email}
                  </div>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(application.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  {getMatchScore(application.id) ? (
                    <div className="flex items-center">
                      <div
                        className={`font-medium ${getScoreColor(getMatchScore(application.id))}`}
                      >
                        {Number(getMatchScore(application.id)).toFixed(1)}%
                      </div>
                      {getScoreIcon(getMatchScore(application.id))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Not analyzed</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <ApplicationMatchModal
                      jobId={jobId}
                      applicationId={application.id}
                      onMatchComplete={(result) => {
                        setApplications((prev) =>
                          prev.map((app) =>
                            app.id === application.id
                              ? { ...app, match_score: result.match_score }
                              : app,
                          ),
                        );
                        fetchMatchResults();
                      }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        <BarChart className="mr-1 h-4 w-4" />
                        Analyze
                      </Button>
                    </ApplicationMatchModal>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(
                          ROUTES.COMPANY.JOBS.APPLICATION_DETAIL.replace(":id", jobId).replace(
                            ":applicationId",
                            application.id,
                          ),
                        )
                      }
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>

                    <ApplicationStatusButtons
                      applicationId={application.id}
                      status={application.status}
                      onStatusChange={fetchApplications}
                      size="sm"
                    />

                    {application.cv_file && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={application.cv_file} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-1 h-4 w-4" />
                          CV
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
