import React, { useEffect } from "react";
import { ROUTES } from "@/routes/routes";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { CompanyApplicationList } from "@/components/application/CompanyApplicationList";

const JobApplicationsPage: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra quyền truy cập
    if (!user || user.role !== "company") {
      toast.error("Only companies can access this page");
      navigate(ROUTES.PUBLIC.HOME);
    }
  }, [user, navigate]);

  if (!jobId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Job ID is required</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please select a job to view its applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <button
          onClick={() => navigate(ROUTES.COMPANY.JOBS.DETAIL.replace(":id", jobId))}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Back to Job
        </button>
      </div>
      <CompanyApplicationList jobId={jobId} />
    </div>
  );
};

export default JobApplicationsPage;
