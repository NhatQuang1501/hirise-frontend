import React from "react";
import { Briefcase, Building, DollarSign, MapPin } from "lucide-react";
import { JobCardItem } from "@/types/job";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import JobCardSaveButton from "@/components/job/JobCardSaveButton";

interface JobCardProps {
  job: JobCardItem;
  onSaveJob: () => void;
  onClick: () => void;
  layout?: "grid" | "list";
}

const JobCard: React.FC<JobCardProps> = ({ job, onSaveJob, onClick, layout = "grid" }) => {
  const { user } = useAuth();
  const isApplicant = user?.role === "applicant";

  // Xử lý sự kiện lưu job - ngăn không cho lan truyền sự kiện đến thẻ cha
  const handleSaveJob = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện lan truyền lên thẻ cha
    onSaveJob();
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group border-muted/60 bg-card relative flex cursor-pointer overflow-hidden rounded-lg border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
        layout === "grid" ? "h-full flex-col p-5" : "flex-row items-center gap-4 p-4",
      )}
    >
      {/* Save Button - Chỉ hiển thị nếu là applicant */}
      {isApplicant && <JobCardSaveButton saved={job.is_saved} onSaveJob={handleSaveJob} />}

      {/* Card content */}
      <div className={cn("flex", layout === "grid" ? "h-full flex-col" : "w-full flex-row gap-4")}>
        {/* Company logo */}
        <div
          className={cn("flex items-center", layout === "grid" ? "mb-4 gap-3" : "flex-shrink-0")}
        >
          <div
            className={cn(
              "bg-muted flex items-center justify-center overflow-hidden rounded-lg",
              layout === "grid" ? "h-14 w-14" : "h-16 w-16",
            )}
          >
            <img
              src={job.logo || "/placeholder-logo.png"}
              alt={job.company}
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          {layout === "grid" && (
            <div>
              <h3 className="text-muted-foreground line-clamp-1 text-sm font-medium">
                {job.company}
              </h3>
            </div>
          )}
        </div>

        {/* Job details */}
        <div className={cn("flex", layout === "grid" ? "flex-1 flex-col" : "flex-1 flex-row")}>
          <div className={layout === "list" ? "w-2/3 pr-4" : "w-full"}>
            {/* Company name (list view only) */}
            {layout === "list" && (
              <h3 className="text-muted-foreground mb-1 text-sm font-medium">{job.company}</h3>
            )}

            {/* Job title with hover effect */}
            <h2 className="group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
              {job.title}
            </h2>

            {/* Skills (list view) */}
            {layout === "list" && (
              <div className="mb-2 flex flex-wrap gap-1">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">
                    +{job.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className={layout === "list" ? "w-1/3" : "w-full"}>
            {/* Job details */}
            <div className={cn("text-muted-foreground space-y-2", layout === "grid" ? "mb-4" : "")}>
              <div className="text-primary flex items-center gap-2 text-sm">
                <DollarSign className="size-4 flex-shrink-0" />
                <span className="line-clamp-1">{job.salary}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 flex-shrink-0" />
                <span className="line-clamp-1">{job.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Building className="size-4 flex-shrink-0" />
                <span className="line-clamp-1">{job.city_display || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="size-4 flex-shrink-0" />
                <span>{job.time}</span>
              </div>
            </div>

            {/* Skills (grid view) */}
            {layout === "grid" && (
              <div className="mt-auto flex flex-wrap gap-1">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">
                    +{job.skills.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
