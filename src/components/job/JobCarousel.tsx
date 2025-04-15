import React from "react";
import { ROUTES } from "@/routes/routes";
import { JobCardData } from "@/types/job";
import JobCard from "@/components/job/JobCard";
import { BaseCarousel } from "@/components/section/BaseCarousel";

interface JobCarouselProps {
  jobs: JobCardData[];
  title?: string;
  description?: string;
  viewAllLink?: string;
  className?: string;
}

const JobCarousel: React.FC<JobCarouselProps> = ({
  jobs,
  title = "Latest jobs",
  description = "More jobs you might be interested in",
  viewAllLink = ROUTES.PUBLIC.JOBS.LIST,
  className,
}) => {
  return (
    <BaseCarousel
      items={jobs}
      renderItem={(job) => <JobCard job={job} />}
      title={title}
      description={description}
      viewAllLink={viewAllLink}
      viewAllText="View all jobs"
      breakpoints={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
      }}
      autoplayInterval={10000}
      className={className}
    />
  );
};

export default JobCarousel;
