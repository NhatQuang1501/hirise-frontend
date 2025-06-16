import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { ApplicationFilter, applicationService } from "@/services/application";
import jobService from "@/services/job";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ApplicationsList } from "./ApplicationsList";
import { JobsSelectionSidebar } from "./JobsSelectionSidebar";
import { ApplicationStats } from "./dashboard/ApplicationStats";
import { TopJobsSection } from "./dashboard/TopJobsSection";

export const CompanyApplicationsOverview: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [jobApplicationStats, setJobApplicationStats] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    reviewing: 0,
    accepted: 0,
    rejected: 0,
  });

  // Fetch company jobs with application count
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getMyJobs({
          status: "published",
          page_size: 100,
        });
        setJobs(response.data);

        // Create application stats
        const stats = response.data
          .map((job: any) => ({
            id: job.id,
            title: job.title,
            applicationCount: job.application_count || 0,
            status: job.status,
            createdAt: job.created_at,
          }))
          .sort((a: any, b: any) => b.applicationCount - a.applicationCount);

        setJobApplicationStats(stats);

        // If we have jobs, select the first one by default
        if (response.data.length > 0) {
          setSelectedJobId(response.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast.error("Failed to load jobs");
      } finally {
        setStatsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch status counts
  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        // This would ideally be a single API call that returns counts by status
        // For now, we'll simulate it with our existing data
        const total = jobApplicationStats.reduce((sum, job) => sum + job.applicationCount, 0);
        setStatusCounts({
          total,
          reviewing: Math.round(total * 0.4),
          accepted: Math.round(total * 0.2),
          rejected: Math.round(total * 0.1),
        });
      } catch (error) {
        console.error("Failed to fetch status counts:", error);
      }
    };

    if (jobApplicationStats.length > 0) {
      fetchStatusCounts();
    }
  }, [jobApplicationStats]);

  // Fetch applications for the selected job
  useEffect(() => {
    if (selectedJobId) {
      fetchApplications();
    }
  }, [selectedJobId, currentPage, statusFilter, searchTerm]);

  const fetchApplications = async () => {
    if (!selectedJobId) return;

    setIsLoading(true);
    try {
      const filters: ApplicationFilter = {
        job: selectedJobId,
        page: currentPage,
        ordering: "-created_at",
      };

      if (statusFilter !== "all") {
        filters.status = statusFilter;
      }

      if (searchTerm) {
        (filters as any).search = searchTerm;
      }

      const response = await applicationService.getJobApplications(selectedJobId, filters);
      setApplications(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewJobApplications = (jobId: string) => {
    navigate(ROUTES.COMPANY.JOBS.APPLICATIONS.replace(":id", jobId));
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
  const handleAcceptApplication = async (applicationId: string) => {
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
  const handleRejectApplication = async (applicationId: string) => {
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

  // Function to get status badge color
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

  // Calculate progress percentage
  const calculateProgress = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  return (
    <div className="space-y-8">
      <ApplicationStats
        statsLoading={statsLoading}
        statusCounts={statusCounts}
        calculateProgress={calculateProgress}
      />

      <TopJobsSection
        statsLoading={statsLoading}
        jobApplicationStats={jobApplicationStats}
        handleJobSelect={handleJobSelect}
      />

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">Manage Applications by Job</h2>

        <div className="grid gap-6 lg:grid-cols-12">
          <JobsSelectionSidebar
            statsLoading={statsLoading}
            jobs={jobs}
            selectedJobId={selectedJobId}
            handleJobSelect={handleJobSelect}
          />

          <ApplicationsList
            isLoading={isLoading}
            applications={applications}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            processingId={processingId}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedJobId={selectedJobId}
            handleSearchChange={handleSearchChange}
            handleStatusFilterChange={handleStatusFilterChange}
            fetchApplications={fetchApplications}
            handleAnalyzeCV={handleAnalyzeCV}
            handleAcceptApplication={handleAcceptApplication}
            handleRejectApplication={handleRejectApplication}
            getStatusColor={getStatusColor}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
