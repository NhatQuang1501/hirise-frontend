import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CompanyCardProps {
  company: {
    id: number;
    name: string;
    logo: string;
    jobCount: string;
    industry: string;
  };
}

interface Company {
  id: number;
  name: string;
  logo: string;
  jobCount: string;
  industry: string;
}

interface CompanyCarouselProps {
  companies: Company[];
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Link
      to={`/companies/${company.id}`}
      className="flex h-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
    >
      <img
        src={company.logo}
        alt={company.name}
        className="mb-4 h-20 w-20 rounded-md object-contain" // Tăng kích thước logo
        loading="lazy"
        width="80"
        height="80"
      />
      <h3 className="mb-2 text-lg font-medium">{company.name}</h3>
      <p className="text-primary mb-1 text-base">{company.jobCount} jobs</p>
      <p className="mt-1 text-sm text-gray-500">{company.industry}</p>
    </Link>
  );
};

export const CompanyCarousel: React.FC<CompanyCarouselProps> = ({ companies }) => {
  return (
    <section className="border-y bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Top IT companies</h2>
          <Link to="/companies" className="text-primary flex items-center hover:underline">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {companies.map((company) => (
              <CarouselItem
                key={company.id}
                // Thay đổi basis cho các breakpoint để hiển thị ít công ty hơn nhưng to hơn
                className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CompanyCard company={company} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
