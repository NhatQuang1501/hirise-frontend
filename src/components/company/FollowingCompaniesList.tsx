import { useEffect, useState } from "react";
import { CompanyFollower, companyService } from "@/services/company";
import { Building, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function FollowingCompaniesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [followedCompanies, setFollowedCompanies] = useState<CompanyFollower[]>([]);
  const [hoveringId, setHoveringId] = useState<string | null>(null);

  useEffect(() => {
    fetchFollowedCompanies();
  }, []);

  const fetchFollowedCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await companyService.getFollowingCompanies();
      setFollowedCompanies(response.data);
    } catch (error) {
      console.error("Error fetching followed companies:", error);
      toast.error("Failed to load followed companies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async (companyId: string) => {
    try {
      await companyService.unfollowCompany(companyId);
      setFollowedCompanies(followedCompanies.filter((company) => company.company_id !== companyId));
      toast.success("Company unfollowed");
    } catch (error) {
      console.error("Error unfollowing company:", error);
      toast.error("Failed to unfollow company. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-primary mr-2 h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!followedCompanies.length) {
    return (
      <div className="py-20 text-center">
        <div className="bg-muted mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <Building className="text-muted-foreground h-10 w-10" />
        </div>
        <h3 className="mb-2 text-lg font-medium">You're not following any companies yet</h3>
        <p className="text-muted-foreground mb-4">
          Follow companies you're interested in to get updates on new job opportunities
        </p>
        <Link to="/companies">
          <Button>Explore Companies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {followedCompanies.map((company) => (
        <Card key={company.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-md">
                  <img
                    src={
                      company.company_logo ||
                      `https://ui-avatars.com/api/?name=${company.company_name}`
                    }
                    alt={company.company_name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{company.company_name}</CardTitle>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Building className="h-3.5 w-3.5" />
                    <span>Technology</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUnfollow(company.company_id)}
                className={`group text-amber-500 hover:bg-rose-50 hover:text-rose-600 ${hoveringId === company.id ? "bg-rose-50" : ""}`}
                onMouseEnter={() => setHoveringId(company.id)}
                onMouseLeave={() => setHoveringId(null)}
              >
                <Star
                  className={`mr-1 h-4 w-4 ${hoveringId === company.id ? "" : "fill-current"}`}
                />
                <span>{hoveringId === company.id ? "Unfollow" : "Following"}</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
              <div>Followed on: {new Date(company.created_at).toLocaleDateString()}</div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-end gap-2">
              <Link to={`/companies/${company.company_id}`}>
                <Button variant="secondary">View Profile</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
