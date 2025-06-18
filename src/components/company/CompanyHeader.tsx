import { useEffect, useState } from "react";
import { companyService } from "@/services/company";
import { Award, Building, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { CompanyDetails } from "@/types/company";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { FollowButton } from "./FollowButton";
import companyPlaceholder from "@/assets/images/companyPlaceholder.png";

interface CompanyHeaderProps {
  company: CompanyDetails;
  isFollowing?: boolean;
  onFollow?: () => void;
  className?: string;
  followerCount?: number;
  onFollowChange?: (isFollowing: boolean, newCount: number) => void;
}

export default function CompanyHeader({
  company,
  isFollowing: initialIsFollowing = false,
  onFollow,
  followerCount: initialFollowerCount = 0,
  onFollowChange,
  className,
}: CompanyHeaderProps) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState<boolean>(initialIsFollowing);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(initialFollowerCount || company.followerCount || 0);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  useEffect(() => {
    setCount(initialFollowerCount || company.followerCount || 0);
  }, [initialFollowerCount, company.followerCount]);

  const handleFollow = async () => {
    if (!company.id || user?.role !== "applicant") {
      toast.error("Only applicants can follow companies");
      return;
    }

    try {
      setIsLoading(true);
      await companyService.followCompany(company.id);
      const newCount = count + 1;
      setCount(newCount);
      setIsFollowing(true);
      if (onFollowChange) {
        onFollowChange(true, newCount);
      }
      if (onFollow) {
        onFollow();
      }
    } catch (error) {
      console.error("Failed to follow company:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!company.id || user?.role !== "applicant") {
      return;
    }

    try {
      setIsLoading(true);
      await companyService.unfollowCompany(company.id);
      const newCount = Math.max(0, count - 1);
      setCount(newCount);
      setIsFollowing(false);
      if (onFollowChange) {
        onFollowChange(false, newCount);
      }
      if (onFollow) {
        onFollow();
      }
    } catch (error) {
      console.error("Failed to unfollow company:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className={cn("bg-white", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            {/* Company Logo with enhanced styling */}
            <div className="flex-shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-xl border bg-white p-1 shadow-md transition-transform duration-300 hover:scale-105 md:h-28 md:w-28">
                <img
                  src={company.logo || companyPlaceholder}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {company.name}
                </h1>
                {company.foundedYear && (
                  <Badge variant="outline" className="border-gray-200 bg-gray-50">
                    Est. {company.foundedYear}
                  </Badge>
                )}
              </div>

              <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {company.industry && (
                  <div className="flex items-center gap-1.5">
                    <Building className="text-primary/70 h-4 w-4" />
                    <span>{company.industry}</span>
                  </div>
                )}
                {company.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="text-secondary/70 h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users className="text-accent/70 h-4 w-4" />
                  <span>{count} followers</span>
                </div>
                {company.openPositions > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>{company.openPositions} open positions</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Follow Button */}
          {user?.role === "applicant" && (
            <div className="mt-6 flex items-center justify-start md:mt-0 md:justify-end">
              <FollowButton
                companyId={company.id}
                companyName={company.name}
                isFollowing={isFollowing}
                isLoading={isLoading}
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
                variant="outline"
                size="lg"
                className={isFollowing ? "" : "border-2"}
                showToast={true}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
