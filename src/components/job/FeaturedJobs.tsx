import React from "react";
import { Bookmark, Briefcase, DollarSign, MapPin } from "lucide-react";
import { JobCardItem } from "@/types/job";
import { Button } from "@/components/ui/button";

interface FeaturedJobsProps {
  jobs: JobCardItem[];
  onSaveJob: (id: string) => void;
  onViewJob: (id: string) => void;
}

const FeaturedJobs: React.FC<FeaturedJobsProps> = ({ jobs, onSaveJob, onViewJob }) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">Featured Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 transition-all hover:shadow-md"
            >
              {/* Featured badge */}
              <div className="bg-primary absolute top-0 right-0 z-10 rounded-bl-lg px-3 py-1 text-xs font-medium text-white">
                Featured
              </div>

              {/* Card content */}
              <div className="relative p-5">
                {/* Company logo */}
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={job.logo || "/placeholder-logo.png"}
                    alt={job.company}
                    className="size-12 rounded-lg object-contain"
                    width="48"
                    height="48"
                  />
                  <h3 className="text-sm font-medium">{job.company}</h3>
                </div>

                {/* Job title */}
                <h2
                  onClick={() => onViewJob(job.id)}
                  className="group-hover:text-primary mb-3 cursor-pointer text-lg font-semibold transition-colors"
                >
                  {job.title}
                </h2>

                {/* Job details */}
                <div className="mb-4 space-y-2">
                  <div className="text-primary flex items-center gap-2 text-sm">
                    <DollarSign className="size-4" />
                    <span>{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="size-4" />
                    <span>{job.time}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {job.skills.slice(0, 2).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 2 && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      +{job.skills.length - 2}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${job.is_saved ? "text-primary" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveJob(job.id);
                    }}
                  >
                    <Bookmark className={`size-4 ${job.is_saved ? "fill-primary" : ""}`} />
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => onViewJob(job.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
