import React from "react";
import { ROUTES } from "@/routes/routes";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import JobCard from "./JobCard";

export interface JobCarouselProps {
  jobs: {
    id: number;
    company: string;
    logo: string;
    title: string;
    salary: string;
    location: string;
    city?: string;
    city_display?: string;
    time: string;
    skills: string[];
    is_saved?: boolean;
  }[];
  title?: string;
  description?: string;
  viewAllLink?: string;
}

const JobCarousel: React.FC<JobCarouselProps> = ({
  jobs,
  title = "Jobs",
  description,
  viewAllLink = ROUTES.PUBLIC.JOBS.LIST,
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground mt-2">{description}</p>}
        </div>

        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="link" className="text-primary gap-2">
              View all <ChevronRight className="size-4" />
            </Button>
          </Link>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">No jobs found at the moment</p>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent>
            {jobs.map((job, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-full md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
              >
                <JobCard 
                  job={{
                    ...job, 
                    id: String(job.id),
                    city: job.city || "",
                    city_display: job.city_display || "",
                    is_saved: job.is_saved || false
                  }}
                  onSaveJob={() => {}}
                  onClick={() => {}}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden bg-white sm:flex" />
          <CarouselNext className="-right-4 hidden bg-white sm:flex" />
        </Carousel>
      )}
    </div>
  );
};

export default JobCarousel;
