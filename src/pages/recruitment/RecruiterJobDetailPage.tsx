import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { mockApplicants, mockRecruiterJobs } from "@/types/mockData";
import { Applicant, RecruiterJob } from "@/types/recruiter";
import CompanyInfo from "@/components/company/CompanyInfo";
import JobBenefits from "@/components/job/JobBenefits";
import JobRequirements from "@/components/job/JobRequirements";
import JobResponsibilities from "@/components/job/JobResponsibilities";
import SkillTags from "@/components/job/SkillTags";
import { CustomDialog } from "@/components/popup/CustomDialog";
import RecruiterJobHeader from "@/components/recruitment/RecruiterJobHeader";
import ApplicantListSection from "@/components/section/ApplicantListSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const RecruiterJobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<RecruiterJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Simulate API call
        const foundJob = mockRecruiterJobs.find((j) => j.id === Number(id));
        if (!foundJob) throw new Error("Job not found");

        setJob(foundJob);
        document.title = `${foundJob.title} - Recruiter View | HiRise`;
      } catch (error) {
        toast.error("Failed to load job details", {
          description: "Please try again later.",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Simulate API call - replace with actual API call later
        const jobApplicants = mockApplicants.slice(0, 5);
        setApplicants(jobApplicants);
      } catch (error) {
        toast.error("Failed to load applicants");
      }
    };

    if (job) {
      fetchApplicants();
    }
  }, [job]);

  const handleEdit = () => {
    navigate(ROUTES.RECRUITER.JOBS.EDIT.replace(":id", id || ""));
  };

  const handleClose = () => {
    setCloseDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmClose = () => {
    setCloseDialogOpen(false);
    // Add API call to close job
    toast.success("Job has been closed successfully", {
      description: "You will be redirected to the job list.",
      duration: 3000,
    });
    navigate(ROUTES.RECRUITER.JOBS.LIST);
  };

  const confirmDelete = () => {
    setDeleteDialogOpen(false);
    // Add API call to delete job
    toast.success("Job has been deleted successfully", {
      description: "You will be redirected to the job list.",
      duration: 3000,
    });
    navigate(ROUTES.RECRUITER.JOBS.LIST);
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
        <RecruiterJobHeader
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
                Job description
              </h2>

              <JobResponsibilities responsibilities={job.responsibilities} />
              <JobRequirements
                basicRequirements={job.basicRequirements}
                preferredSkills={job.preferredSkills}
              />
              <JobBenefits benefits={job.benefits} />
            </div>

            {/* Add ApplicantListSection here */}
            <div className="rounded-xl bg-white p-6 shadow-md lg:p-8">
              <ApplicantListSection applicants={applicants} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <CompanyInfo
              company={job.company}
              companyDescription={job.companyDescription}
              showActions={false}
            />
            <SkillTags skills={job.skills} />
          </div>
        </div>

        {/* Existing dialogs */}
        <CustomDialog
          open={closeDialogOpen}
          onClose={() => setCloseDialogOpen(false)}
          title="Close Job Listing"
          description="Are you sure you want to close this job? Candidates will no longer be able to apply, but you can still view existing applications."
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

export default RecruiterJobDetailPage;
