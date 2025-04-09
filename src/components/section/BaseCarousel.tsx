import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BaseCarouselProps {
  title?: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  autoplayInterval?: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}

export const BaseCarousel = ({
  title,
  description,
  viewAllLink,
  viewAllText = "View all",
  items,
  renderItem,
  autoplayInterval = 10000,
  breakpoints = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  className,
}: BaseCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [autoplayTimer, setAutoplayTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-slide functionality
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      const timer = setInterval(() => {
        if (api && typeof api.scrollNext === "function") {
          api.scrollNext();
        }
      }, autoplayInterval);
      setAutoplayTimer(timer);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        setAutoplayTimer(null);
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
  }, [api, autoplayInterval]);

  // Calculate responsive classes
  const getResponsiveClass = () => {
    const baseClass = "pl-4";
    const breakpointClasses = [];

    if (breakpoints.sm) breakpointClasses.push(`sm:basis-1/${breakpoints.sm}`);
    if (breakpoints.md) breakpointClasses.push(`md:basis-1/${breakpoints.md}`);
    if (breakpoints.lg) breakpointClasses.push(`lg:basis-1/${breakpoints.lg}`);
    if (breakpoints.xl) breakpointClasses.push(`xl:basis-1/${breakpoints.xl}`);

    return [baseClass, ...breakpointClasses].join(" ");
  };

  return (
    <div className={className}>
      {/* Header */}
      {(title || viewAllLink) && (
        <div className="mb-10 flex items-center justify-between">
          <div>
            {title && <h2 className="text-3xl font-bold">{title}</h2>}
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </div>
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="ghost" className="text-primary gap-2">
                {viewAllText} <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className={getResponsiveClass()}>
              {renderItem(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />

        {/* Progress Indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === current ? "bg-primary w-4" : "bg-primary/20 w-2"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};
