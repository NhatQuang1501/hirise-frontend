import React from "react";
import { ROUTES } from "@/routes/routes";
import { Briefcase, DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { JobCardData } from "@/types/job";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: JobCardData;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="border-border group bg-card flex h-full flex-col justify-between rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
      {/* Phần nội dung card */}
      <div>
        {/* Tăng kích thước logo và spacing */}
        <div className="mb-4 flex items-center gap-3">
          <img
            src={job.logo}
            alt={job.company}
            className="size-14 rounded-md" // Tăng kích thước logo
            loading="lazy"
            width="56"
            height="56"
          />
          <div>
            <h3 className="text-lg font-medium">{job.company}</h3>
          </div>
        </div>

        {/* Tăng font-size của title */}
        <Link
          to={ROUTES.PUBLIC.JOBS.DETAIL.replace(":id", job.id.toString())}
          className="group-hover:text-primary mb-3 block text-xl font-semibold"
        >
          {job.title}
        </Link>

        {/* Tăng không gian và kích thước text */}
        <div className="mb-4 space-y-3">
          <div className="text-primary flex items-center gap-2 text-base">
            <DollarSign className="size-5" />
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-2 text-base text-gray-600">
            <MapPin className="size-5" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-base text-gray-600">
            <Briefcase className="size-5" />
            <span>{job.time}</span>
          </div>
        </div>

        {/* Tăng kích thước skill tags */}
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 pt-3">
        <Button variant="outline" size="lg" className="hover:bg-secondary w-full">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
