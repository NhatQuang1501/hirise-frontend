import React, { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface NewJobsCompanyGridProps {
  searchQuery: string;
  industry: string;
  location: string;
}

const NewJobsCompanyGrid = ({ searchQuery, industry, location }: NewJobsCompanyGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mock data - replace with API call
  const companies: Company[] = [
    {
      id: "1",
      name: "Apple",
      logo: "/company-logos/apple.png",
      industry: "Technology",
      location: "Multiple locations",
      jobCount: 200,
      followerCount: 60000,
      isFollowing: false,
      newJobsToday: 8,
      description: "Global technology innovator...",
    },
    {
      id: "2",
      name: "Tesla",
      logo: "/company-logos/tesla.png",
      industry: "Automotive",
      location: "Multiple locations",
      jobCount: 180,
      followerCount: 50000,
      isFollowing: true,
      newJobsToday: 5,
      description: "Leading electric vehicle manufacturer...",
    },
    {
      id: "3",
      name: "Netflix",
      logo: "/company-logos/netflix.png",
      industry: "Entertainment",
      location: "Multiple locations",
      jobCount: 150,
      followerCount: 45000,
      isFollowing: true,
      newJobsToday: 10,
      description: "Global streaming service provider...",
    },
    {
      id: "4",
      name: "Microsoft",
      logo: "/company-logos/microsoft.png",
      industry: "Technology",
      location: "Multiple locations",
      jobCount: 300,
      followerCount: 70000,
      isFollowing: false,
      newJobsToday: 12,
      description: "Global technology leader...",
    },
    {
      id: "5",
      name: "Amazon",
      logo: "/company-logos/amazon.png",
      industry: "E-commerce",
      location: "Multiple locations",
      jobCount: 250,
      followerCount: 80000,
      isFollowing: true,
      newJobsToday: 15,
      description: "Leading e-commerce platform...",
    },
    {
      id: "6",
      name: "Google",
      logo: "/company-logos/google.png",
      industry: "Technology",
      location: "Multiple locations",
      jobCount: 350,
      followerCount: 90000,
      isFollowing: false,
      newJobsToday: 20,
      description: "Global technology giant...",
    },
  ];

  // Filter companies based on search criteria
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = !industry || company.industry === industry;
    const matchesLocation = !location || company.location.includes(location);
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Companies with New Jobs</h2>
        <p className="text-muted-foreground mt-2">Latest job opportunities from top employers</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {displayedCompanies.map((company) => (
          <div
            key={company.id}
            className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <img
                src={company.logo}
                alt={company.name}
                className="size-12 rounded-lg object-contain"
              />
              {company.newJobsToday > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  New
                </Badge>
              )}
            </div>
            <h3 className="mb-2 text-lg font-bold">{company.name}</h3>
            <div className="text-muted-foreground mb-4 flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{company.location}</span>
            </div>
            {company.newJobsToday > 0 && (
              <p className="text-primary mb-4 text-sm font-medium">
                {company.newJobsToday} new jobs today
              </p>
            )}
            <Link to={ROUTES.PUBLIC.COMPANIES.JOBS.replace(":id", company.id)}>
              <Button className="group-hover:bg-primary/90 w-full">View Jobs</Button>
            </Link>
          </div>
        ))}
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && setCurrentPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default NewJobsCompanyGrid;
