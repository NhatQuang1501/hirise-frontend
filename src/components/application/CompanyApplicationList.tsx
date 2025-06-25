import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { aiMatchingService } from "@/services/ai-matching";
import { Application, ApplicationFilter, applicationService } from "@/services/application";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, ArrowUpDown, BarChart, Eye } from "lucide-react";
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
  const [filters] = useState<ApplicationFilter>({
    ordering: "-created_at",
  });
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fetch applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await applicationService.getJobApplications(jobId, {
        ...filters,
        page: 1,
      });
      setApplications(response.data);
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
      setMatchResults(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Error fetching match results:", error);
      setMatchResults([]);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchMatchResults();
  }, [jobId, filters]);

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
    if (!Array.isArray(matchResults)) {
      return null;
    }
    const matchResult = matchResults.find((result) => result.application === applicationId);
    return matchResult ? matchResult.match_score : null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 50) return "text-green-600";
    if (score >= 30) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 50) return <ArrowUp className="ml-2 h-4 w-4 text-green-600" />;
    if (score >= 30) return <ArrowUpDown className="ml-2 h-4 w-4 text-amber-600" />;
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
                        className={`font-medium ${getScoreColor(Math.round(getMatchScore(application.id) * 100))}`}
                      >
                        {Math.round(getMatchScore(application.id) * 100)}%
                      </div>
                      {getScoreIcon(Math.round(getMatchScore(application.id) * 100))}
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
                        className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
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
                      View details
                    </Button>

                    <ApplicationStatusButtons
                      applicationId={application.id}
                      status={application.status}
                      onStatusChange={fetchApplications}
                      size="sm"
                    />
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
