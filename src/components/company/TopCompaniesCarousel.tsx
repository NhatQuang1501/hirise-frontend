import React, { useEffect, useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const TopCompaniesCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);

  // Mock data - replace with API call
  const companies: Company[] = [
    {
      id: "1",
      name: "Google",
      logo: "/company-logos/google.png",
      industry: "Technology",
      location: "Multiple locations",
      rating: 4.8,
      reviewCount: 1200,
      jobCount: 150,
      followerCount: 50000,
      isFollowing: false,
      newJobsToday: 5,
      description: "Leading technology company...",
    },
    {
      id: "2",
      name: "Amazon",
      logo: "/company-logos/amazon.png",
      industry: "E-commerce",
      location: "Multiple locations",
      rating: 4.5,
      reviewCount: 900,
      jobCount: 200,
      followerCount: 70000,
      isFollowing: true,
      newJobsToday: 10,
      description: "Global e-commerce leader...",
    },
    {
      id: "3",
      name: "Meta",
      logo: "/company-logos/meta.png",
      industry: "Technology",
      location: "Multiple locations",
      rating: 4.6,
      reviewCount: 1100,
      jobCount: 130,
      followerCount: 60000,
      isFollowing: false,
      newJobsToday: 8,
      description: "Innovative social media company...",
    },
    {
      id: "4",
      name: "Tesla",
      logo: "/company-logos/tesla.png",
      industry: "Automotive",
      location: "Multiple locations",
      rating: 4.7,
      reviewCount: 800,
      jobCount: 120,
      followerCount: 45000,
      isFollowing: true,
      newJobsToday: 3,
      description: "Electric vehicle manufacturer...",
    },
    {
      id: "5",
      name: "Microsoft",
      logo: "/company-logos/microsoft.png",
      industry: "Technology",
      location: "Multiple locations",
      rating: 4.7,
      reviewCount: 800,
      jobCount: 120,
      followerCount: 45000,
      isFollowing: true,
      newJobsToday: 3,
      description: "Global technology leader...",
    },
    {
      id: "6",
      name: "Apple",
      logo: "/company-logos/apple.png",
      industry: "Technology",
      location: "Multiple locations",
      rating: 4.6,
      reviewCount: 1500,
      jobCount: 200,
      followerCount: 60000,
      isFollowing: false,
      newJobsToday: 8,
      description: "Global technology innovator...",
    },
    {
      id: "7",
      name: "Netflix",
      logo: "/company-logos/netflix.png",
      industry: "Entertainment",
      location: "Multiple locations",
      rating: 4.4,
      reviewCount: 700,
      jobCount: 90,
      followerCount: 30000,
      isFollowing: false,
      newJobsToday: 2,
      description: "Leading streaming service...",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-slide functionality
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
      const interval = setInterval(() => {
        if (api && typeof api.scrollNext === "function") {
          api.scrollNext();
        }
      }, 5000);
      setAutoplayInterval(interval);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        setAutoplayInterval(null);
      }
    };

    if (api) {
      startAutoplay();
      const root = api.rootNode();
      root.addEventListener("mouseenter", stopAutoplay);
      root.addEventListener("mouseleave", startAutoplay);

      return () => {
        stopAutoplay();
        root.removeEventListener("mouseenter", stopAutoplay);
        root.removeEventListener("mouseleave", startAutoplay);
      };
    }
  }, [api]);

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Top Companies</h2>
          <p className="text-muted-foreground mt-2">Leading employers in the tech industry</p>
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
              <Link
                to={`/companies/${company.id}`}
                className="group block rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="mx-auto mb-4 h-20 w-20 rounded-lg object-contain"
                />
                <h3 className="mb-2 text-center text-lg font-bold">{company.name}</h3>
                <p className="text-primary mb-2 text-center">{company.jobCount} jobs</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{company.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({company.reviewCount} reviews)
                  </span>
                </div>
              </Link>
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

export default TopCompaniesCarousel;
