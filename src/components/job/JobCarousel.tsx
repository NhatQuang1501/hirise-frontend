import React, { useRef } from "react";
import { Job, JobCarouselProps } from "@/types/interfaces";
import JobCard from "@/components/job/JobCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const JobCarousel: React.FC<JobCarouselProps> = ({ jobs }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <Carousel
      ref={carouselRef}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4">
        {jobs.map((job) => (
          <CarouselItem key={job.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <JobCard job={job} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-center gap-2">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default JobCarousel;
