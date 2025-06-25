import React from "react";
import { ROUTES } from "@/routes/routes";
import {
  // Award,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Edit,
  MapPin,
  Trash2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CompanyJob } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompanyJobHeaderProps {
  job: CompanyJob;
  onEdit: () => void;
  onClose: () => void;
  onDelete: () => void;
  hasReviewedApplications?: boolean;
}

const CompanyJobHeader: React.FC<CompanyJobHeaderProps> = ({
  job,
  onEdit,
  onClose,
  onDelete,
  hasReviewedApplications = false,
}) => {
  // Format contract type to keep first letter uppercase only (Full time)
  const formatContractType = (type: string) => {
    if (!type) return "";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  // Format date to match JobHeader (e.g., "Jun 10, 2025")
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="group-hover:border-primary h-20 w-20 rounded-lg border border-gray-200 object-contain p-2 transition-all"
                  width="80"
                  height="80"
                />
              ) : (
                <div className="group-hover:border-primary flex h-20 w-20 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-xl font-bold text-gray-400 transition-all">
                  {job.company.charAt(0)}
                </div>
              )}
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
              <div className="mt-2 flex items-center gap-3">
                <div className="bg-primary/10 text-primary inline-block rounded-md px-4 py-2 text-lg font-semibold">
                  {job.salary}
                </div>
                <Badge
                  className={
                    job.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : job.status === "Draft"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                  }
                >
                  {job.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Job details grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
            {/* <div className="flex items-center gap-2">
              <Award className="text-secondary/80 h-5 w-5" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{job.experience}</p>
              </div>
            </div> */}

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
                <p className="font-medium">{formatDate(job.createdDate)}</p>
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
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-start justify-center space-y-3 md:items-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full md:w-[150px]">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={onEdit}
                    disabled={hasReviewedApplications}
                    className={`bg-secondary hover:bg-secondary/10 hover:text-secondary w-full text-white ${
                      hasReviewedApplications ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Job
                  </Button>
                </div>
              </TooltipTrigger>
              {hasReviewedApplications && (
                <TooltipContent>
                  <p>Cannot edit job with reviewed applications</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          {job.status !== "Closed" && (
            <Button
              size="lg"
              variant="outline"
              onClick={onClose}
              className="bg-foreground/80 hover:bg-foreground/10 hover:text-foreground/80 w-full text-white md:w-[150px]"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Close Job
            </Button>
          )}

          <Button
            size="lg"
            variant="outline"
            onClick={onDelete}
            className="w-full bg-red-500 text-white hover:bg-red-50 hover:text-red-600 md:w-[150px]"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobHeader;
