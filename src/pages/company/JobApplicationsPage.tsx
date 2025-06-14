import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { jobService } from "@/services/job";
import { ArrowLeft, BarChart2, Briefcase, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { CompanyApplicationList } from "@/components/application/CompanyApplicationList";
import { Button } from "@/components/ui/button";

const JobApplicationsPage: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra quyền truy cập
    if (!user || user.role !== "company") {
      toast.error("Only companies can access this page");
      navigate(ROUTES.PUBLIC.HOME);
    }

    // Fetch job details
    if (jobId) {
      fetchJobDetails();
    }
  }, [user, navigate, jobId]);

  const fetchJobDetails = async () => {
    if (!jobId) return;

    try {
      setIsLoading(true);
      const jobData = await jobService.getJobById(jobId);
      setJob(jobData);
      document.title = `${jobData.title} - Applications | HiRise`;
    } catch (error) {
      console.error("Failed to fetch job details:", error);
      toast.error("Failed to load job details");
    } finally {
      setIsLoading(false);
    }
  };

  if (!jobId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <Users className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Job ID is required</h2>
          <p className="mb-6 text-gray-600">Please select a job to view its applications</p>
          <Button onClick={() => navigate(ROUTES.COMPANY.JOBS.LIST)}>Go to Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Job Applications</h1>
                <p className="mt-1 text-blue-100">{isLoading ? "Loading..." : job?.title}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => navigate(ROUTES.COMPANY.JOBS.DETAIL.replace(":id", jobId))}
                className="bg-white/20 text-white hover:bg-white/30"
                variant="ghost"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                View Job
              </Button>
              <Button
                onClick={() => navigate(ROUTES.COMPANY.JOBS.MATCH_ANALYSIS.replace(":id", jobId))}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                AI Matching Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Job Summary Card */}
        {!isLoading && job && (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-sm font-medium text-gray-500">Position</h3>
                <div className="mt-2 text-xl font-bold text-gray-900">{job.title}</div>
                <div className="mt-2 text-sm text-gray-500">
                  {job.job_type} • {job.experience_level}
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <div className="mt-2 text-xl font-bold text-gray-900">
                  {job.city_display || "Remote"}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {job.salary_display || "Competitive salary"}
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <div className="mt-2 text-xl font-bold text-gray-900">
                  {job.status === "published" ? "Active" : "Inactive"}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications List */}
        <CompanyApplicationList jobId={jobId} />
      </div>
    </div>
  );
};

export default JobApplicationsPage;
