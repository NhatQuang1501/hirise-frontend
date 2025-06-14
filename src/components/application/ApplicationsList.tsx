import React, { useState } from "react";
import { format } from "date-fns";
import { ArrowRight, FileText, Filter, Search, User } from "lucide-react";
import { ApplicationStatusButtons } from "@/components/application/ApplicationStatusButtons";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicantProfileModal } from "./ApplicantProfileModal";

interface ApplicationsListProps {
  isLoading: boolean;
  applications: any[];
  searchTerm: string;
  statusFilter: string;
  processingId: string | null;
  currentPage: number;
  totalPages: number;
  selectedJobId: string | null;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusFilterChange: (value: string) => void;
  fetchApplications: () => void;
  handleAnalyzeCV: (applicationId: string) => void;
  handleAcceptApplication: (applicationId: string) => void;
  handleRejectApplication: (applicationId: string) => void;
  getStatusColor: (status: string) => string;
  handlePageChange: (page: number) => void;
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({
  isLoading,
  applications,
  searchTerm,
  statusFilter,
  processingId,
  currentPage,
  totalPages,
  selectedJobId,
  handleSearchChange,
  handleStatusFilterChange,
  fetchApplications,
  handleAnalyzeCV,
  getStatusColor,
  handlePageChange,
}) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const handleViewProfile = (profile: any) => {
    setSelectedProfile(profile);
    setProfileModalOpen(true);
  };

  return (
    <div className="lg:col-span-9">
      {selectedJobId ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by applicant name..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-[180px] gap-1">
                  <Filter className="text-muted-foreground h-3.5 w-3.5" />
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

              <Button
                variant="outline"
                size="icon"
                onClick={() => fetchApplications()}
                className="h-10 w-10"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">No applications found</h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or adjusting the filters.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="border-l-primary border-l-4 p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex flex-1 gap-3">
                            <div className="flex-shrink-0">
                              {application.job_details?.company_logo ? (
                                <img
                                  src={application.job_details.company_logo}
                                  alt={application.job_details?.company_name || "Company"}
                                  className="h-12 w-12 rounded-md border border-gray-200 object-contain p-1"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-1 text-lg font-bold text-gray-400">
                                  {application.job_details?.company_name?.charAt(0) || "C"}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium">
                                    {application.applicant_profile.full_name}
                                  </h3>
                                  <p className="text-muted-foreground text-xs">
                                    {application.applicant_profile.email} • Applied on{" "}
                                    {format(new Date(application.created_at), "MMM dd, yyyy")}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(application.status)}>
                                  {application.status_display}
                                </Badge>
                              </div>

                              <div className="mt-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <FileText className="text-primary h-4 w-4" />
                                  <span>{application.cv_filename}</span>
                                </div>

                                {application.match_score !== null && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <span className="text-sm font-medium">Match Score:</span>
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
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProfile(application.applicant_profile)}
                              className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
                            >
                              <User className="mr-1 h-3.5 w-3.5" />
                              View Profile
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAnalyzeCV(application.id)}
                              disabled={processingId === application.id}
                              className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            >
                              {processingId === application.id ? "Processing..." : "Analyze CV"}
                            </Button>

                            <ApplicationStatusButtons
                              applicationId={application.id}
                              status={application.status}
                              onStatusChange={fetchApplications}
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
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
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">Select a job</h3>
          <p className="text-muted-foreground">
            Please select a job from the sidebar to view its applications.
          </p>
        </div>
      )}

      <ApplicantProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={selectedProfile}
      />
    </div>
  );
};
