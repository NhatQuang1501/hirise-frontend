import { ROUTES } from "@/routes/routes";
import { Bookmark, Briefcase, Building, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApplicantDashboardPage = () => {
  const { user } = useAuth();

  if (user?.role !== "applicant") {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  // Sample dashboard data
  const dashboardData = {
    appliedJobs: 3,
    savedJobs: 5,
    followingCompanies: 2,
    recentApplications: [
      {
        id: "1",
        title: "Frontend Developer",
        company: "Tech Company A",
        date: "2023-05-15",
        status: "interview",
      },
      {
        id: "2",
        title: "Backend Developer",
        company: "Tech Company B",
        date: "2023-05-10",
        status: "pending",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "reviewed":
        return "text-blue-600";
      case "interview":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "accepted":
        return "text-emerald-600";
      default:
        return "text-gray-600";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back, {user.username}!</p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Briefcase className="text-primary mr-2 h-5 w-5" />
              Applied Jobs
            </CardTitle>
            <CardDescription>Jobs you've applied to</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-3xl font-bold">{dashboardData.appliedJobs}</div>
            <Link
              to={ROUTES.APPLICANT.APPLIED_JOBS}
              className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
            >
              View all applications
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Bookmark className="text-primary mr-2 h-5 w-5" />
              Saved Jobs
            </CardTitle>
            <CardDescription>Jobs you're interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-3xl font-bold">{dashboardData.savedJobs}</div>
            <Link
              to={ROUTES.APPLICANT.SAVED_JOBS}
              className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
            >
              View saved jobs
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Building className="text-primary mr-2 h-5 w-5" />
              Following Companies
            </CardTitle>
            <CardDescription>Companies you follow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-3xl font-bold">{dashboardData.followingCompanies}</div>
            <Link
              to={ROUTES.APPLICANT.FOLLOWING_COMPANIES}
              className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
            >
              View followed companies
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-10 mb-4 text-xl font-semibold">Recent Applications</h2>
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="px-4 py-3 text-left font-medium">Job Title</th>
                <th className="px-4 py-3 text-left font-medium">Company</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentApplications.map((app) => (
                <tr key={app.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{app.title}</td>
                  <td className="px-4 py-3">{app.company}</td>
                  <td className="px-4 py-3">{new Date(app.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/jobs/${app.id}`}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dashboardData.recentApplications.length === 0 && (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">You haven't applied to any jobs yet</p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link to={ROUTES.PUBLIC.JOBS.LIST}>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Find Jobs</CardTitle>
                <CardDescription>Explore jobs matching your skills</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to={ROUTES.PUBLIC.COMPANIES.LIST}>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Browse Companies</CardTitle>
                <CardDescription>Discover great places to work</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboardPage;
