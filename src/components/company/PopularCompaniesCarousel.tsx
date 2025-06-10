import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { companyService } from "@/services/company";
import { ChevronRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/types/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const PopularCompaniesCarousel = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCompanies = async () => {
      try {
        const response = await companyService.getPopularCompanies({ page_size: 9 });
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching popular companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCompanies();
  }, []);

  const handleFollowToggle = async (companyId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const company = companies.find((c) => c.id === companyId);
    if (!company) return;

    try {
      if (company.isFollowing) {
        await companyService.unfollowCompany(companyId);
      } else {
        await companyService.followCompany(companyId);
      }

      // Update state
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === companyId
            ? {
                ...c,
                isFollowing: !c.isFollowing,
                followerCount: c.isFollowing ? c.followerCount - 1 : c.followerCount + 1,
              }
            : c,
        ),
      );
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const renderCompanyCardSkeleton = () => (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <Skeleton className="mx-auto mb-4 h-16 w-16 rounded-lg" />
        <Skeleton className="mb-2 h-6 w-32" />
        <div className="mb-4 flex items-center justify-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );

  const renderCompanyCard = (company: Company) => (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <Link to={ROUTES.PUBLIC.COMPANIES.DETAIL.replace(":id", company.id)} className="group block">
        <img
          src={company.logo || "../assets/images/companyPlaceholder.png"}
          alt={company.name}
          className="mx-auto mb-4 h-16 w-16 rounded-lg object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "../assets/images/companyPlaceholder.png";
          }}
        />
        <h3 className="mb-2 line-clamp-1 text-center text-lg font-bold">{company.name}</h3>
        <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
          <Users className="size-4" />
          <span>{company.followerCount.toLocaleString()} followers</span>
        </div>
      </Link>
      <Button
        onClick={(e) => handleFollowToggle(company.id, e)}
        variant={company.isFollowing ? "secondary" : "default"}
        className={cn("w-full", {
          "hover:bg-destructive hover:text-destructive-foreground": company.isFollowing,
        })}
      >
        {company.isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Popular Companies</h2>
          <p className="text-muted-foreground mt-2">
            Most followed companies by tech professionals
          </p>
        </div>

        <Link to={ROUTES.PUBLIC.COMPANIES.LIST}>
          <Button variant="link" className="text-primary gap-2">
            View all <ChevronRight className="size-4" />
          </Button>
        </Link>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent>
          {(loading ? Array(9).fill({}) : companies).map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 sm:basis-full md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
            >
              {loading ? renderCompanyCardSkeleton() : renderCompanyCard(item as Company)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden bg-white sm:flex" />
        <CarouselNext className="-right-4 hidden bg-white sm:flex" />
      </Carousel>
    </div>
  );
};

export default PopularCompaniesCarousel;
