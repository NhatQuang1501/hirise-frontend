import React from "react";
import { ROUTES } from "@/routes/routes";
import { Building2, MapPin, MoveRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/types/company";
import { CompanyCarouselProps } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { BaseCarousel } from "@/components/section/BaseCarousel";
import { Badge } from "@/components/ui/badge";

const CompanyCarousel = ({
  companies,
  title = "Top Companies",
  description = "Leading employers in the tech industry",
  viewAllLink = ROUTES.PUBLIC.COMPANIES.LIST,
}: CompanyCarouselProps) => {
  const renderCompany = (company: Company) => (
    <Link
      to={ROUTES.PUBLIC.COMPANIES.DETAIL.replace(":id", company.id)}
      className="group block rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <img
          src={company.logo}
          alt={company.name}
          className="h-16 w-16 rounded-lg object-contain"
        />
        {company.newJobsToday > 0 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {company.newJobsToday} new jobs
          </Badge>
        )}
      </div>

      <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
        {company.name}
      </h3>

      <div className="mb-3 flex items-center gap-2">
        <Building2 className="text-muted-foreground size-4" />
        <span className="text-muted-foreground text-sm">{company.industry}</span>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <MapPin className="text-muted-foreground size-4" />
        <span className="text-muted-foreground text-sm">{company.location}</span>
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
        {/* <span className="text-primary font-medium">{company.jobCount} open positions</span> */}
        <span className="text-muted-foreground group-hover:text-primary text-sm transition-colors">
          View company <MoveRight className="inline-block size-4" />
        </span>
      </div>
    </Link>
  );

  return (
    <BaseCarousel
      items={companies}
      renderItem={renderCompany}
      title={title}
      description={description}
      viewAllLink={viewAllLink}
      breakpoints={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
      }}
      autoplayInterval={20000}
    />
  );
};

export default CompanyCarousel;
