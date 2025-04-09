import React, { useEffect, useState } from "react";
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

const PopularCompaniesCarousel = () => {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Mock data - replace with API call
  const companies: Company[] = [
    {
      id: "1",
      name: "Microsoft",
      logo: "/company-logos/microsoft.png",
      industry: "Technology",
      location: "Multiple locations",
      jobCount: 120,
      followerCount: 45000,
      isFollowing: true,
      newJobsToday: 3,
      description: "Global technology leader...",
    },
    {
      id: "2",
      name: "Google",
      logo: "/company-logos/google.png",
      industry: "Technology",
      location: "Multiple locations",
      jobCount: 200,
      followerCount: 60000,
      isFollowing: false,
      newJobsToday: 5,
      description: "Innovative tech company...",
    },
    {
      id: "3",
      name: "Amazon",
      logo: "/company-logos/amazon.png",
      industry: "E-commerce",
      location: "Multiple locations",
      rating: 4.5,
      reviewCount: 900,
      jobCount: 150,
      followerCount: 50000,
      isFollowing: true,
      newJobsToday: 2,
      description: "Leading e-commerce platform...",
    },
    {
      id: "4",
      name: "Facebook",
      logo: "/company-logos/facebook.png",
      industry: "Social Media",
      location: "Multiple locations",
      rating: 4.6,
      reviewCount: 1100,
      jobCount: 180,
      followerCount: 55000,
      isFollowing: false,
      newJobsToday: 4,
      description: "Popular social media platform...",
    },
    {
      id: "5",
      name: "Apple",
      logo: "/company-logos/apple.png",
      industry: "Technology",
      location: "Multiple locations",
      rating: 4.9,
      reviewCount: 1500,
      jobCount: 250,
      followerCount: 70000,
      isFollowing: true,
      newJobsToday: 6,
      description: "Leading technology company...",
    },
  ];

  const handleFollowToggle = async (companyId: string) => {
    // Implement follow/unfollow logic
    console.log("Toggle follow for company:", companyId);
  };

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Popular Companies</h2>
          <p className="text-muted-foreground mt-2">
            Most followed companies by tech professionals
          </p>
        </div>
        <Button variant="ghost" className="text-primary gap-2">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {companies.map((company) => (
            <CarouselItem key={company.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <Link to={`/companies/${company.id}`} className="group block">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="mx-auto mb-4 h-16 w-16 rounded-lg object-contain"
                  />
                  <h3 className="mb-2 text-center text-lg font-bold">{company.name}</h3>
                  <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{company.followerCount.toLocaleString()} followers</span>
                  </div>
                </Link>
                <Button
                  onClick={() => handleFollowToggle(company.id)}
                  variant={company.isFollowing ? "secondary" : "default"}
                  className={cn("w-full", {
                    "hover:bg-destructive hover:text-destructive-foreground": company.isFollowing,
                  })}
                >
                  {company.isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === current ? "bg-primary w-4" : "bg-primary/20"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </>
  );
};

export default PopularCompaniesCarousel;
