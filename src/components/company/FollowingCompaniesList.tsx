import { useEffect, useState } from "react";
import { Building, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder for followed company data
interface FollowedCompany {
  id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
  employeeCount?: string;
  followDate: string;
  activeJobCount: number;
}

export function FollowingCompaniesList() {
  const [isLoading, setIsLoading] = useState(true);
  const [followedCompanies, setFollowedCompanies] = useState<FollowedCompany[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchFollowedCompanies = async () => {
      try {
        // Replace with actual API call
        setTimeout(() => {
          setFollowedCompanies([
            {
              id: "1",
              name: "Tech Company A",
              logo: "https://ui-avatars.com/api/?name=Tech+Company+A&background=random",
              industry: "Software",
              location: "Hanoi",
              employeeCount: "100-500",
              followDate: "2023-05-15",
              activeJobCount: 5,
            },
            {
              id: "2",
              name: "Tech Company B",
              logo: "https://ui-avatars.com/api/?name=Tech+Company+B&background=random",
              industry: "Fintech",
              location: "Ho Chi Minh City",
              employeeCount: "500-1000",
              followDate: "2023-05-10",
              activeJobCount: 10,
            },
            // Add more mock data if needed
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching followed companies:", error);
        setIsLoading(false);
      }
    };

    fetchFollowedCompanies();
  }, []);

  // Simulate unfollowing a company
  const handleUnfollow = (companyId: string) => {
    setFollowedCompanies(followedCompanies.filter((company) => company.id !== companyId));
    // Replace with actual API call
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
                    src={company.logo || `https://ui-avatars.com/api/?name=${company.name}`}
                    alt={company.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Building className="h-3.5 w-3.5" />
                    <span>{company.industry}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUnfollow(company.id)}
                className="text-amber-500 hover:text-amber-600"
              >
                <Star className="mr-1 h-4 w-4 fill-current" />
                <span>Following</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
              {company.location && <div>Location: {company.location}</div>}
              {company.employeeCount && (
                <>
                  <div className="hidden sm:block">•</div>
                  <div>Size: {company.employeeCount} employees</div>
                </>
              )}
              <>
                <div className="hidden sm:block">•</div>
                <div>Hiring: {company.activeJobCount} positions</div>
              </>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-end gap-2">
              <Link to={`/companies/${company.id}`}>
                <Button variant="outline">View Profile</Button>
              </Link>
              <Link to={`/companies/${company.id}/jobs`}>
                <Button>See Jobs</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
