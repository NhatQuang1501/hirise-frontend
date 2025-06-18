import { useEffect } from "react";
import { ROUTES } from "@/routes/routes";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useCompanyPagination } from "@/hooks/useCompanyPagination";
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
import { Skeleton } from "@/components/ui/skeleton";

interface NewJobsCompanyGridProps {
  searchQuery: string;
  industry: string;
  location: string;
}

const NewJobsCompanyGrid = ({ searchQuery, industry, location }: NewJobsCompanyGridProps) => {
  const { companies, loading, totalPages, currentPage, setPage, setFilters } = useCompanyPagination(
    {
      initialFilters: {
        page_size: 12,
        ordering: "-created_at", // Sort by most recently created
      },
    },
  );

  // Update filters when props change
  useEffect(() => {
    setFilters({
      search: searchQuery,
      industry: industry,
      location: location,
    });
  }, [searchQuery, industry, location]);

  const renderSkeletonCard = () => (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <Skeleton className="size-12 rounded-lg" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="mb-2 h-6 w-36" />
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="mb-4 h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <>
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Companies with New Jobs</h2>
        <p className="text-muted-foreground mt-2">Latest job opportunities from top employers</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div key={index}>{renderSkeletonCard()}</div>
            ))}
        </div>
      ) : (
        <>
          {companies.length === 0 ? (
            <div className="py-10 text-center">
              <h3 className="mb-2 text-xl font-medium">No companies found</h3>
              <p className="text-muted-foreground">Please try again with different filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <img
                      src={company.logo || "/companyPlaceholder.png"}
                      alt={company.name}
                      className="size-12 rounded-lg object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/companyPlaceholder.png";
                      }}
                    />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      New
                    </Badge>
                  </div>
                  <h3 className="mb-2 line-clamp-1 text-lg font-bold">{company.name}</h3>
                  <div className="text-muted-foreground mb-4 flex items-center gap-2">
                    <MapPin className="size-4 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {company.locations && company.locations.length > 0
                        ? company.locations[0]
                        : company.location || "Vietnam"}
                    </span>
                  </div>
                  <p className="text-primary mb-4 text-sm font-medium">
                    {company.newJobsToday > 0
                      ? `${company.newJobsToday} new jobs today`
                      : "Has new jobs"}
                  </p>
                  <Link to={ROUTES.PUBLIC.COMPANIES.JOBS.replace(":id", company.id)}>
                    <Button className="group-hover:bg-primary/90 w-full">View Jobs</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
                    <PaginationLink onClick={() => setPage(page)} isActive={currentPage === page}>
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
                onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default NewJobsCompanyGrid;
