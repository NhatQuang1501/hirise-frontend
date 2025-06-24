import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { Application, applicationService } from "@/services/application";
import jobService from "@/services/job";
import { format } from "date-fns";
import { ArrowRight, ChevronRight, ClipboardList, FileText, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { CompanyJob } from "@/types/company";
import { useAuth } from "@/hooks/useAuth";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobDescription from "@/components/job/JobDescription";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { CustomDialog } from "@/components/popup/CustomDialog";
import CompanyJobHeader from "@/components/recruitment/CompanyJobHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CompanyJobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<CompanyJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [hasReviewedApplications, setHasReviewedApplications] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Lấy thông tin token từ localStorage
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    // Chỉ kiểm tra nếu không có token trong localStorage
    if (!token) {
      toast.error("You need to login to view job details");
      navigate(ROUTES.AUTH.LOGIN);
      return;
    }

    // Kiểm tra role từ localStorage nếu user context chưa sẵn sàng
    if (!user && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "company") {
        toast.error("Only companies can view job details");
        navigate(ROUTES.PUBLIC.HOME);
        return;
      }
    } else if (user && user.role !== "company") {
      toast.error("Only companies can view job details");
      navigate(ROUTES.PUBLIC.HOME);
      return;
    }

    // Tiếp tục tải dữ liệu job
  }, [navigate, user]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        // Gọi API để lấy thông tin job
        const jobData = await jobService.getJobById(id as string);

        // Xử lý các trường văn bản có dấu xuống dòng thành mảng
        const responsibilities = jobData.responsibilities
          ? jobData.responsibilities.split("\n").filter((item: string) => item.trim() !== "")
          : [];

        // Xử lý requirements và preferred_skills trực tiếp từ API
        const requirements = jobData.requirements || "";
        const preferredSkills = jobData.preferred_skills || "";

        const basicRequirementsList = requirements
          .split("\n")
          .filter((item: string) => item.trim() !== "");

        const preferredSkillsList = preferredSkills
          .split("\n")
          .filter((item: string) => item.trim() !== "");

        const benefits = jobData.benefits
          ? jobData.benefits.split("\n").filter((item: string) => item.trim() !== "")
          : [];

        // Lấy danh sách kỹ năng từ API
        const skills = Array.isArray(jobData.skills) ? jobData.skills.map((s: any) => s.name) : [];

        // Chuyển đổi dữ liệu từ API sang định dạng CompanyJob
        const formattedJob: CompanyJob = {
          id: jobData.id,
          title: jobData.title || "",
          companyId: jobData.company?.id || "",
          company: jobData.company_name || jobData.company?.name || "",
          logo: jobData.company?.logo || null,
          location:
            jobData.locations && jobData.locations.length > 0
              ? jobData.locations[0].address
              : "Remote",
          city: jobData.city || "", // Giữ lại cho tìm kiếm và lọc
          city_display: jobData.city_display || "Not specified",
          contractType: jobData.job_type
            ? jobData.job_type.charAt(0).toUpperCase() + jobData.job_type.slice(1)
            : "Full time",
          salary:
            jobData.salary_display ||
            `${jobData.min_salary || 0} - ${jobData.max_salary || 0} ${jobData.currency || "VND"}`,
          skills: skills,
          level: jobData.experience_level
            ? jobData.experience_level.charAt(0).toUpperCase() + jobData.experience_level.slice(1)
            : "Junior",
          experience: jobData.experience_level
            ? jobData.experience_level.charAt(0).toUpperCase() + jobData.experience_level.slice(1)
            : "Junior",
          deadline: jobData.closed_date || "Not specified",
          status:
            jobData.status_display ||
            (jobData.status === "published"
              ? "Published"
              : jobData.status === "draft"
                ? "Draft"
                : "Closed"),
          description: jobData.description || "",
          responsibilities: responsibilities,
          basicRequirements: basicRequirementsList,
          preferredSkills: preferredSkillsList,
          benefits: benefits,
          interviewProcess: [],
          companyDescription: jobData.company?.description || "",
          applicationCount: jobData.application_count || 0,
          createdDate: jobData.created_at
            ? new Date(jobData.created_at).toLocaleDateString()
            : "Recently",
          applicantCount: jobData.application_count || 0,
        };

        setJob(formattedJob);
        document.title = `${formattedJob.title} - Company View | HiRise`;

        // Fetch recent applications after job data is loaded
        fetchRecentApplications(jobData.id);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Cannot load job information", {
          description: "Please try again later.",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRecentApplications = async (jobId: string) => {
      try {
        setIsLoadingApplications(true);
        const response = await applicationService.getJobApplications(jobId, {
          ordering: "-created_at",
          page: 1,
          page_size: 3,
        });
        setRecentApplications(response.data);

        // Kiểm tra xem có application nào ở trạng thái khác "pending" không
        const hasNonPendingApplications = response.data.some((app) => app.status !== "pending");
        setHasReviewedApplications(hasNonPendingApplications);
      } catch (error) {
        console.error("Error fetching recent applications:", error);
      } finally {
        setIsLoadingApplications(false);
      }
    };

    if (id) {
      fetchJob();
    }
    window.scrollTo(0, 0);
  }, [id]);

  const handleEdit = () => {
    navigate(ROUTES.COMPANY.JOBS.EDIT.replace(":id", id || ""));
  };

  const handleClose = () => {
    setCloseDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmClose = async () => {
    try {
      await jobService.updateJobStatus(id as string, "closed");
      toast.success("Job has been closed successfully", {
        description: "You will be redirected to the job list.",
        duration: 3000,
      });
      navigate(ROUTES.COMPANY.JOBS.LIST);
    } catch (error) {
      console.error("Error closing job:", error);
      toast.error("Cannot close job");
    } finally {
      setCloseDialogOpen(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await jobService.deleteJob(id as string);
      toast.success("Job has been deleted successfully", {
        description: "You will be redirected to the job list.",
        duration: 3000,
      });
      navigate(ROUTES.COMPANY.JOBS.LIST);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Cannot delete job");
    } finally {
      setDeleteDialogOpen(false);
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Job not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        <CompanyJobHeader
          job={job}
          onEdit={handleEdit}
          onClose={handleClose}
          onDelete={handleDelete}
          hasReviewedApplications={hasReviewedApplications}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job details */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
              <h2 className="mb-6 text-2xl font-bold">
                <ClipboardList className="text-primary mr-2 inline-block" />
                Job Details
              </h2>

              <JobDescription description={job.description || ""} className="mb-8" />
              <JobResponsibilities responsibilities={job.responsibilities || []} />
              <JobRequirements
                basicRequirements={job.basicRequirements || []}
                preferredSkills={job.preferredSkills || []}
              />
              <JobBenefits benefits={job.benefits || []} />
            </div>

            {/* Recent Applications Section */}
            <div className="rounded-xl bg-white p-6 shadow-md lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center text-2xl font-bold">
                  <Users className="text-primary mr-2" />
                  Recent Applications
                </h2>
                <Link
                  to={ROUTES.COMPANY.JOBS.APPLICATIONS.replace(":id", id || "")}
                  className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
                >
                  View all ({job.applicationCount})
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {isLoadingApplications ? (
                <div className="flex justify-center py-8">
                  <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
                </div>
              ) : recentApplications.length === 0 ? (
                <div className="rounded-lg bg-gray-50 py-4 text-center">
                  <p className="text-gray-500">No applications received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <Card
                      key={application.id}
                      className="border-l-primary overflow-hidden border-l-4"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium">
                              {application.applicant_profile.full_name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Applied {format(new Date(application.created_at), "MMM dd, yyyy")}
                            </p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status_display}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center text-sm text-gray-600">
                          <FileText size={14} className="mr-1 text-gray-400" />
                          {application.cv_filename}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        navigate(ROUTES.COMPANY.JOBS.APPLICATIONS.replace(":id", id || ""))
                      }
                    >
                      View All Applications
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <CompanyInfo
              company={{ id: job.companyId || "" }}
              companyDescription={job.companyDescription}
              saved={false}
              onSaveJob={() => {}}
            />
            <SkillTags skills={job.skills || []} />
          </div>
        </div>

        {/* Existing dialogs */}
        <CustomDialog
          open={closeDialogOpen}
          onClose={() => setCloseDialogOpen(false)}
          title="Close Job"
          description="Are you sure you want to close this job? Candidates will no longer be able to apply, but you can still view the applications."
          confirmText="Close Job"
          onConfirm={confirmClose}
        />

        <CustomDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          title="Delete Job"
          description="Are you sure you want to delete this job? This action cannot be undone."
          confirmText="Delete"
          onConfirm={confirmDelete}
          confirmButtonClassName="bg-red-600 hover:bg-red-700"
        />
      </div>
    </div>
  );
};

export default CompanyJobDetailPage;
