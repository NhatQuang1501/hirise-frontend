import React from "react";
import { ROUTES } from "@/routes/routes";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Company } from "@/types/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BaseCarousel } from "@/components/section/BaseCarousel";

const PopularCompaniesCarousel = () => {
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
      jobCount: 250,
      followerCount: 70000,
      isFollowing: true,
      newJobsToday: 6,
      description: "Leading technology company...",
    },
  ];

  const handleFollowToggle = async (companyId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Implement follow/unfollow logic
    console.log("Toggle follow for company:", companyId);
  };

  const renderCompanyCard = (company: Company) => (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <Link to={ROUTES.PUBLIC.COMPANIES.DETAIL.replace(":id", company.id)} className="group block">
        <img
          src={company.logo}
          alt={company.name}
          className="mx-auto mb-4 h-16 w-16 rounded-lg object-contain"
        />
        <h3 className="mb-2 text-center text-lg font-bold">{company.name}</h3>
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
    <BaseCarousel
      items={companies}
      renderItem={renderCompanyCard}
      title="Popular Companies"
      description="Most followed companies by tech professionals"
      viewAllLink={ROUTES.PUBLIC.COMPANIES.LIST}
      breakpoints={{ sm: 1, md: 3, lg: 4, xl: 4 }}
    />
  );
};

export default PopularCompaniesCarousel;
