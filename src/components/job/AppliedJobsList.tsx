import { useEffect, useState } from "react";
import { Application, ApplicationFilter, applicationService } from "@/services/application";
import { Eye, Loader2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ResponsivePagination } from "@/components/section/ResponsivePagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AppliedJobsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orderBy, setOrderBy] = useState<string>("-created_at");

  const fetchApplications = async (page = 1) => {
    setIsLoading(true);
    try {
      const filters: ApplicationFilter = {
        page,
        ordering: orderBy,
      };

      if (statusFilter && statusFilter !== "all") {
        filters.status = statusFilter;
      }

      const response = await applicationService.getMyApplications(filters);
      setApplications(response.data);
      setCurrentPage(response.current_page);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      toast.error("Failed to load your applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, orderBy]);

  const handlePageChange = (page: number) => {
    fetchApplications(page);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleOrderChange = (value: string) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  const handleWithdraw = async (id: string) => {
    try {
      await applicationService.withdrawApplication(id);
      toast.success("Application withdrawn successfully");
      fetchApplications(currentPage);
    } catch (error) {
      console.error("Error withdrawing application:", error);
      toast.error("Failed to withdraw application");
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading && applications.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-primary mr-2 h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Your Applications</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={orderBy} onValueChange={handleOrderChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-created_at">Newest first</SelectItem>
              <SelectItem value="created_at">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="mb-2 text-lg font-medium">You haven't applied to any jobs yet</h3>
          <p className="text-muted-foreground mb-4">
            Explore jobs that match your skills and interests
          </p>
          <Link to="/jobs">
            <Button>Find Jobs</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {application.company_logo ? (
                        <img
                          src={application.company_logo}
                          alt={application.company_name}
                          className="h-12 w-12 rounded-md border border-gray-200 object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-1 text-lg font-bold text-gray-400">
                          {application.company_name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{application.job_details.title}</CardTitle>
                        <Link
                          to={`/companies/${application.company_id}`}
                          className="text-muted-foreground hover:text-primary text-sm"
                        >
                          {application.company_name}
                        </Link>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                        application.status,
                      )}`}
                    >
                      {application.status_display}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
                    <div>CV: {application.cv_filename}</div>
                    <>
                      <div className="hidden sm:block">•</div>
                      <div>Applied: {new Date(application.created_at).toLocaleDateString()}</div>
                    </>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full justify-end gap-2">
                    <Link to={`/jobs/${application.job_details.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> View Job
                      </Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex items-center gap-1">
                          <X className="h-4 w-4" /> Withdraw
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently withdraw your application. You can apply again
                            later if you change your mind.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleWithdraw(application.id)}>
                            Withdraw
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <ResponsivePagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
