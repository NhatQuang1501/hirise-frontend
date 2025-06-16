import { useState } from "react";
import { companyService } from "@/services/company";
import { MapPin, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Company } from "@/types/company";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FollowButton } from "./FollowButton";

interface CompanyCardProps {
  company: Company;
  className?: string;
  onFollowChange?: (companyId: string, isFollowing: boolean) => void;
}

export function CompanyCard({ company, className, onFollowChange }: CompanyCardProps) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState<boolean>(company.isFollowing || false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followerCount, setFollowerCount] = useState<number>(company.followerCount || 0);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await companyService.followCompany(company.id);
      const newCount = followerCount + 1;
      setFollowerCount(newCount);
      setIsFollowing(true);

      if (onFollowChange) {
        onFollowChange(company.id, true);
      }
    } catch (error) {
      console.error("Failed to follow company:", error);
      toast.error("Failed to follow company. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsLoading(true);
      await companyService.unfollowCompany(company.id);
      const newCount = Math.max(0, followerCount - 1);
      setFollowerCount(newCount);
      setIsFollowing(false);

      if (onFollowChange) {
        onFollowChange(company.id, false);
      }
    } catch (error) {
      console.error("Failed to unfollow company:", error);
      toast.error("Failed to unfollow company. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Link to={`/companies/${company.id}`}>
        <Card
          className={cn(
            "group border-muted/60 h-full overflow-hidden bg-gray-50/50 transition-all duration-300",
            "hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg",
            className,
          )}
        >
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
                <img
                  src={
                    company.logo ||
                    `https://ui-avatars.com/api/?name=${company.name}&background=random`
                  }
                  alt={company.name}
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="flex-1">
                <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
                  {company.name}
                </h3>

                {company.industry && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    {company.industry}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 p-5 pt-0">
              <div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
                {company.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{company.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{followerCount} followers</span>
                </div>

                {company.jobCount > 0 && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{company.jobCount} jobs</span>
                  </div>
                )}
              </div>
            </div>

            {/* Simple decorative element */}
            <div className="bg-primary/20 group-hover:bg-primary absolute bottom-3 left-5 h-1 w-16 transition-all duration-300 group-hover:w-24"></div>
          </div>
        </Card>
      </Link>

      {/* Follow Button - Positioned outside the Link to prevent navigation when clicked */}
      {user?.role === "applicant" && (
        <div className="absolute top-4 right-4 z-10" onClick={(e) => e.preventDefault()}>
          <FollowButton
            companyId={company.id}
            companyName={company.name}
            isFollowing={isFollowing}
            isLoading={isLoading}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            size="sm"
            variant="outline"
          />
        </div>
      )}
    </div>
  );
}
