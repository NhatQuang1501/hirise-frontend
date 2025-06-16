import React from "react";
import { ROUTES } from "@/routes/routes";
import { aiMatchingService } from "@/services/ai-matching";
import { format } from "date-fns";
import { BarChart, ChevronRight, Eye, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TopJobsSectionProps {
  statsLoading: boolean;
  jobApplicationStats: any[];
  handleJobSelect: (jobId: string) => void;
}

export const TopJobsSection: React.FC<TopJobsSectionProps> = ({
  statsLoading,
  jobApplicationStats,
  handleJobSelect,
}) => {
  const navigate = useNavigate();

  const handleAnalyzeAll = async (jobId: string) => {
    try {
      await aiMatchingService.matchAllApplications(jobId);
      toast.success("Analysis completed for all applications");
    } catch (error) {
      console.error("Error analyzing all applications:", error);
      toast.error("Failed to analyze applications");
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Top Jobs by Applications</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(ROUTES.COMPANY.JOBS.LIST)}
          className="gap-1 text-xs"
        >
          View All Jobs
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statsLoading ? (
          <>
            {[1, 2, 3].map((index) => (
              <Card key={index} className="animate-pulse border border-gray-100">
                <CardHeader className="pb-2">
                  <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/4 rounded bg-gray-200"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-7 w-1/3 rounded bg-gray-200"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-9 w-full rounded bg-gray-200"></div>
                </CardFooter>
              </Card>
            ))}
          </>
        ) : jobApplicationStats.length > 0 ? (
          jobApplicationStats.slice(0, 3).map((job) => (
            <Card
              key={job.id}
              className={`border-l-4 ${job.applicationCount > 0 ? "border-l-primary" : "border-l-gray-200 opacity-70"}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-lg">{job.title}</CardTitle>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(job.createdAt), "MMM dd, yyyy")}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="text-primary h-5 w-5" />
                  <span className="text-2xl font-bold">{job.applicationCount}</span>
                  <span className="text-muted-foreground text-sm">applications</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleJobSelect(job.id)}
                    disabled={job.applicationCount === 0}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAnalyzeAll(job.id)}>
                    <BarChart className="mr-1 h-4 w-4" />
                    Analyze All
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-3 rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold">No jobs found</h3>
            <p className="text-muted-foreground">
              You don't have any published jobs yet. Create a job to start receiving applications.
            </p>
            <Button
              onClick={() => navigate(ROUTES.COMPANY.JOBS.CREATE)}
              className="bg-primary hover:bg-primary/90 mt-4 text-white"
            >
              Create a Job
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
