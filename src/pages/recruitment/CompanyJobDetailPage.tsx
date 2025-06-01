import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes/routes";
import jobService from "@/services/job";
import { ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Applicant, CompanyJob } from "@/types/company";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobDescription from "@/components/job/JobDescription";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { CustomDialog } from "@/components/popup/CustomDialog";
import CompanyJobHeader from "@/components/recruitment/CompanyJobHeader";
import ApplicantListSection from "@/components/section/ApplicantListSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CompanyJobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<CompanyJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const { user, isAuthenticated } = useAuth();

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
        // Trong hàm fetchJob, thay đổi phần xử lý requirements
        const requirements = jobData.requirements || "";
        const preferredSkillsMarker = "### PREFERRED SKILLS ###";
        const markerIndex = requirements.indexOf(preferredSkillsMarker);

        let basicRequirementsList: string[] = [];
        let preferredSkillsList: string[] = [];

        if (markerIndex !== -1) {
          // Nếu tìm thấy marker, tách thành hai phần
          const basicPart = requirements.substring(0, markerIndex).trim();
          const preferredPart = requirements
            .substring(markerIndex + preferredSkillsMarker.length)
            .trim();

          basicRequirementsList = basicPart
            .split("\n")
            .filter((item: string) => item.trim() !== "");

          preferredSkillsList = preferredPart
            .split("\n")
            .filter((item: string) => item.trim() !== "");
        } else {
          // Nếu không tìm thấy marker, tất cả đều là basic requirements
          basicRequirementsList = requirements
            .split("\n")
            .filter((item: string) => item.trim() !== "");
        }

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
            : "Full-time",
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

    if (id) {
      fetchJob();
    }
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Đây là nơi bạn sẽ gọi API để lấy danh sách ứng viên
        // Ví dụ: const response = await api.get(`/jobs/${id}/applications/`);
        // setApplicants(response.data.results);

        // Tạm thời sử dụng mảng rỗng
        setApplicants([]);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        toast.error("Cannot load applicant list");
      }
    };

    if (job) {
      fetchApplicants();
    }
  }, [job]);

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
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job details */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
              <h2 className="mb-6 text-2xl font-bold">
                <ClipboardList className="text-primary mr-2 inline-block" />
                Job Details
              </h2>

              {/* Thêm JobDescription component ở đây */}
              <JobDescription description={job.description || ""} className="mb-8" />

              <JobResponsibilities responsibilities={job.responsibilities || []} />
              <JobRequirements
                basicRequirements={job.basicRequirements || []}
                preferredSkills={job.preferredSkills || []}
              />
              <JobBenefits benefits={job.benefits || []} />
            </div>

            {/* Add ApplicantListSection here */}
            <div className="rounded-xl bg-white p-6 shadow-md lg:p-8">
              <ApplicantListSection applicants={applicants} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <CompanyInfo
              company={{ id: job.companyId }}
              companyDescription={job.companyDescription}
              showActions={false}
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
