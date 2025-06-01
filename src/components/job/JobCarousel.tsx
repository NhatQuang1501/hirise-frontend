// import React from "react";
// import { ROUTES } from "@/routes/routes";
// import { JobCardData } from "@/types/job";
// import JobCard from "@/components/job/JobCard";
// import { BaseCarousel } from "@/components/section/BaseCarousel";
// interface JobCarouselProps {
//   jobs: JobCardData[];
//   title?: string;
//   description?: string;
//   viewAllLink?: string;
//   className?: string;
// }
// const JobCarousel: React.FC<JobCarouselProps> = ({
//   jobs,
//   title = "Latest jobs",
//   description = "More jobs you might be interested in",
//   viewAllLink = ROUTES.PUBLIC.JOBS.LIST,
//   className,
// }) => {
//   return (
//     <BaseCarousel
//       items={jobs}
//       renderItem={(job) => <JobCard job={job} />}
//       title={title}
//       description={description}
//       viewAllLink={viewAllLink}
//       viewAllText="View all jobs"
//       breakpoints={{
//         sm: 1,
//         md: 2,
//         lg: 3,
//         xl: 3,
//       }}
//       autoplayInterval={10000}
//       className={className}
//     />
//   );
// };
// export default JobCarousel;
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "./JobCard";

export interface JobCarouselProps {
  jobs: {
    id: number;
    company: string;
    logo: string;
    title: string;
    salary: string;
    location: string;
    time: string;
    skills: string[];
  }[];
  title?: string;
  description?: string;
}

const JobCarousel: React.FC<JobCarouselProps> = ({ jobs, title = "Jobs", description }) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="size-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
          <div className="col-span-3 flex h-32 items-center justify-center rounded-lg border border-dashed">
            <p className="text-gray-500">No similar jobs found at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCarousel;
