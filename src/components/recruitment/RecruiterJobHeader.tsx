import React from "react";
import { ROUTES } from "@/routes/routes";
import {
  Award,
  Briefcase,
  Calendar,
  Clock,
  Edit,
  MapPin,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { RecruiterJob } from "@/types/recruiter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecruiterJobHeaderProps {
  job: RecruiterJob;
  onEdit: () => void;
  onClose: () => void;
  onDelete: () => void;
}

const RecruiterJobHeader: React.FC<RecruiterJobHeaderProps> = ({
  job,
  onEdit,
  onClose,
  onDelete,
}) => {
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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{job.experience}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Job Level</p>
                <p className="font-medium">{job.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Contract type</p>
                <p className="font-medium">{job.contractType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-medium">{job.createdDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Applications</p>
                <p className="font-medium">{job.applicantCount} candidates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-start justify-center space-y-3 md:items-end ">
          <Button size="lg" onClick={onEdit} className="w-full md:w-[150px] hover:bg-secondary">
            <Edit className="mr-2 size-4" />
            Edit Job
          </Button>

          {job.status !== "Closed" && (
            <Button size="lg" variant="outline" onClick={onClose} className="w-full md:w-[150px] hover:bg-gray-400">
              <XCircle className="mr-2 size-4" />
              Close Job
            </Button>
          )}

          <Button
            size="lg"
            variant="outline"
            onClick={onDelete}
            className="w-full md:w-[150px] bg-red-50 text-red-600 hover:bg-red-400 hover:text-white"
          >
            <Trash2 className="mr-2 size-4" />
            Delete Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobHeader;
