import React from "react";
import { ROUTES } from "@/routes/routes";
import { Award, Briefcase, Calendar, CheckCircle, Clock, MapPin, Phone, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import SaveJobButton from "./SaveJobButton";

interface JobHeaderProps {
  job: Job;
  saved: boolean;
  onSaveJob: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, saved, onSaveJob }) => {
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
                <p className="font-medium">{job.time}</p>
              </div>
            </div>
          </div>

          {/* Quy trình phỏng vấn */}
          <div className="mt-6">
            <p className="mb-3 font-medium text-gray-700">Interview process</p>
            <div className="flex flex-wrap items-center">
              {job.interviewProcess.map((step: string, index: number) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-1">
                    {index === 0 && <Phone className="size-4 text-gray-500" />}
                    {index === 1 && <Video className="size-4 text-gray-500" />}
                    {index === 2 && <CheckCircle className="size-4 text-gray-500" />}
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

        {/* CTA Buttons */}
        <div className="flex flex-col items-start justify-center space-y-4 md:items-end">
          <Button size="lg" className="w-full md:w-auto">
            Apply now
          </Button>
          <SaveJobButton saved={saved} onSaveJob={onSaveJob} className="w-full md:w-auto" />
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
