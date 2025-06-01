import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder for job data
interface AppliedJob {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
  };
  location: string;
  salary?: string;
  appliedDate: string;
  status: "pending" | "reviewed" | "interview" | "rejected" | "accepted";
}

export function AppliedJobsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchAppliedJobs = async () => {
      try {
        // Replace with actual API call
        setTimeout(() => {
          setAppliedJobs([
            {
              id: "1",
              title: "Frontend Developer",
              company: {
                id: "c1",
                name: "Tech Company A",
                logo: "https://ui-avatars.com/api/?name=Tech+Company+A&background=random",
              },
              location: "Hanoi",
              salary: "$1000 - $2000",
              appliedDate: "2023-05-15",
              status: "interview",
            },
            {
              id: "2",
              title: "Backend Developer",
              company: {
                id: "c2",
                name: "Tech Company B",
                logo: "https://ui-avatars.com/api/?name=Tech+Company+B&background=random",
              },
              location: "Ho Chi Minh City",
              salary: "$1200 - $2200",
              appliedDate: "2023-05-10",
              status: "pending",
            },
            // Add more mock data if needed
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "reviewed":
        return "Reviewed";
      case "interview":
        return "Interview";
      case "rejected":
        return "Rejected";
      case "accepted":
        return "Accepted";
      default:
        return status;
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

  if (!appliedJobs.length) {
    return (
      <div className="py-20 text-center">
        <h3 className="mb-2 text-lg font-medium">You haven't applied to any jobs yet</h3>
        <p className="text-muted-foreground mb-4">
          Explore jobs that match your skills and interests
        </p>
        <Link to="/jobs">
          <Button>Find Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appliedJobs.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-md">
                  <img
                    src={job.company.logo || `https://ui-avatars.com/api/?name=${job.company.name}`}
                    alt={job.company.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <Link
                    to={`/companies/${job.company.id}`}
                    className="text-muted-foreground hover:text-primary text-sm"
                  >
                    {job.company.name}
                  </Link>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                  job.status,
                )}`}
              >
                {getStatusText(job.status)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
              <div>Location: {job.location}</div>
              {job.salary && (
                <>
                  <div className="hidden sm:block">•</div>
                  <div>Salary: {job.salary}</div>
                </>
              )}
              <>
                <div className="hidden sm:block">•</div>
                <div>Applied: {new Date(job.appliedDate).toLocaleDateString()}</div>
              </>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-end gap-2">
              <Link to={`/jobs/${job.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
