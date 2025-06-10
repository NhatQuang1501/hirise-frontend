import React from "react";
import { ROUTES } from "@/routes/routes";
import { Building2, ChevronRight, MapPin, MoveRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/types/company";
import { CompanyCarouselProps } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCarousel = ({
  companies,
  title = "Top Companies",
  description = "Leading employers in the tech industry",
  viewAllLink = ROUTES.PUBLIC.COMPANIES.LIST,
  loading = false,
}: CompanyCarouselProps & { loading?: boolean }) => {
  const renderCompanySkeleton = () => (
    <div className="block rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <Skeleton className="mb-2 h-6 w-40" />

      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-36" />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className={cn("border-border mt-4 border-t pt-4", "flex items-center justify-between")}>
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );

  const renderCompany = (company: Company) => (
    <Link
      to={ROUTES.PUBLIC.COMPANIES.DETAIL.replace(":id", company.id)}
      className="group block rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <img
          src={company.logo || "../assets/images/companyPlaceholder.png"}
          alt={company.name}
          className="h-16 w-16 rounded-lg object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "../assets/images/companyPlaceholder.png";
          }}
        />
        {company.newJobsToday > 0 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {company.newJobsToday} new jobs
          </Badge>
        )}
      </div>

      <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-bold transition-colors">
        {company.name}
      </h3>

      <div className="mb-3 flex items-center gap-2">
        <Building2 className="text-muted-foreground size-4 flex-shrink-0" />
        <span className="text-muted-foreground line-clamp-1 text-sm">
          {company.industries?.length ? company.industries[0] : company.industry || "Technology"}
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <MapPin className="text-muted-foreground size-4 flex-shrink-0" />
        <span className="text-muted-foreground line-clamp-1 text-sm">
          {company.locations?.length ? company.locations[0] : company.location || "Vietnam"}
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Users className="text-primary size-4" />
          <span className="text-muted-foreground text-sm">
            {company.followerCount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className={cn("border-border mt-4 border-t pt-4", "flex items-center justify-between")}>
        <span className="text-muted-foreground group-hover:text-primary text-sm transition-colors">
          View company <MoveRight className="inline-block size-4" />
        </span>
      </div>
    </Link>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="link" className="text-primary gap-2">
              View all <ChevronRight className="size-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {(loading ? Array(6).fill({}) : companies).map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-full md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
              >
                {loading ? renderCompanySkeleton() : renderCompany(item as Company)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden bg-white sm:flex" />
          <CarouselNext className="-right-4 hidden bg-white sm:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default CompanyCarousel;
