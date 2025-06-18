import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { Application, applicationService } from "@/services/application";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Job } from "@/types/job";
import { useAuth } from "@/hooks/useAuth";
import ApplyJobModal from "@/components/application/ApplyJobModal";
import WithdrawButton from "@/components/application/WithdrawButton";
import { Button } from "@/components/ui/button";
import SaveJobButton from "./SaveJobButton";

interface JobHeaderProps {
  job: Job;
  saved: boolean;
  onSaveJob: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, saved, onSaveJob }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [checkingApplication, setCheckingApplication] = useState(true);

  // Kiểm tra xem người dùng đã apply cho job này chưa
  useEffect(() => {
    const checkApplication = async () => {
      if (isAuthenticated && user?.role === "applicant" && job.id) {
        try {
          setCheckingApplication(true);
          const result = await applicationService.checkJobApplication(job.id.toString());
          setApplication(result);
        } catch (error) {
          console.error("Error checking application status:", error);
        } finally {
          setCheckingApplication(false);
        }
      } else {
        setCheckingApplication(false);
      }
    };

    checkApplication();
  }, [isAuthenticated, user, job.id]);

  const formatContractType = (type: string) => {
    if (!type) return "";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to apply for this job");
      return;
    }

    if (user?.role !== "applicant") {
      toast.error("Only applicants can apply for jobs");
      return;
    }

    setIsApplyModalOpen(true);
  };

  const handleWithdrawSuccess = () => {
    // Sau khi withdraw thành công, cập nhật lại trạng thái application
    setApplication(null);
  };

  // Kiểm tra xem có phải là applicant hay không
  const isApplicant = isAuthenticated && user?.role === "applicant";

  return (
    <div className="mb-10 rounded-xl bg-white p-6 shadow-md lg:p-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Logo và thông tin công ty */}
        <div className="md:col-span-2">
          <div className="mb-6 flex items-start gap-4">
            <Link
              to={ROUTES.PUBLIC.COMPANIES.JOBS.replace(
                ":id",
                job.company.toLowerCase().replace(/\s+/g, "-"),
              )}
              className="group"
            >
              <img
                src={job.logo}
                alt={job.company}
                className="group-hover:border-primary h-20 w-20 rounded-lg border border-gray-200 object-contain p-2 transition-all"
                width="80"
                height="80"
              />
            </Link>
            <div>
              <Link
                to={ROUTES.PUBLIC.COMPANIES.JOBS.replace(
                  ":id",
                  job.company.toLowerCase().replace(/\s+/g, "-"),
                )}
                className="hover:text-primary text-lg font-medium hover:underline"
              >
                {job.company}
              </Link>
              <h1 className="mt-1 text-3xl font-bold">{job.title}</h1>
              <div className="bg-primary/10 text-primary mt-2 inline-block rounded-md px-4 py-2 text-lg font-semibold">
                {job.salary}
              </div>
            </div>
          </div>

          {/* Thông tin cơ bản dạng form/item */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Award className="text-secondary/80 h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{job.experience}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="text-secondary/80 h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Job Level</p>
                <p className="font-medium">{job.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="text-secondary/80 h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Contract type</p>
                <p className="font-medium">{formatContractType(job.contractType)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building className="text-secondary/80 h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{job.city_display || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-secondary/80 h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-medium">{job.time}</p>
              </div>
            </div>
          </div>

          {/* Địa điểm công việc (riêng) */}
          <div className="mt-6 flex items-start gap-2 rounded-md">
            <MapPin className="text-secondary/80 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="font-medium">{job.location}</p>
            </div>
          </div>

          {/* Quy trình phỏng vấn */}
          <div className="mt-6">
            <p className="mb-3 font-medium text-gray-700">Interview process</p>
            <div className="flex flex-wrap items-center">
              {job.interviewProcess.map((step: string, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-1">
                    {index === 0 && <Phone className="h-4 w-4 text-gray-500" />}
                    {index === 1 && <Video className="h-4 w-4 text-gray-500" />}
                    {index === 2 && <CheckCircle className="h-4 w-4 text-gray-500" />}
                    <span className="text-sm">{step}</span>
                  </div>
                  {index < job.interviewProcess.length - 1 && (
                    <span className="mx-2 text-gray-300">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons - Chỉ hiển thị khi là applicant */}
        <div className="flex w-full flex-col items-start justify-center space-y-4 md:items-end">
          {isApplicant ? (
            <>
              {checkingApplication ? (
                <Button size="lg" className="w-full justify-center md:w-[180px]" disabled>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Checking...
                </Button>
              ) : application ? (
                <>
                  <div className="w-full rounded-md bg-green-200 px-3 py-2 text-center text-sm font-medium text-green-800 md:w-[180px]">
                    Applied on {new Date(application.created_at).toLocaleDateString()}
                  </div>
                  <WithdrawButton
                    applicationId={application.id}
                    status={application.status}
                    onWithdraw={handleWithdrawSuccess}
                    size="lg"
                    className="w-full justify-center md:w-[180px]"
                  />
                </>
              ) : (
                <Button
                  size="lg"
                  className="w-full justify-center md:w-[180px]"
                  onClick={handleApplyClick}
                >
                  <Briefcase className="mr-1.5 h-4 w-4" />
                  Apply now
                </Button>
              )}
              <SaveJobButton
                saved={saved}
                onSaveJob={onSaveJob}
                className="w-full justify-center md:w-[180px]"
                size="lg"
              />
            </>
          ) : null}
        </div>
      </div>

      {/* Apply Job Modal */}
      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          // Kiểm tra lại application sau khi đóng modal
          if (job.id) {
            applicationService.checkJobApplication(job.id.toString()).then((result) => {
              setApplication(result);
            });
          }
        }}
        jobId={job.id.toString()}
        jobTitle={job.title}
      />
    </div>
  );
};

export default JobHeader;
