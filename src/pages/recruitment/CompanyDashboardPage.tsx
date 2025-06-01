import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CompanyJob } from "@/types/company";
import { mockApplicants, mockCompanyJobs } from "@/types/mockData";
import ApplicantProgressChart from "@/components/dashboard/ApplicantProgressChart";
import ApplicantsTable from "@/components/dashboard/ApplicantsTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import JobCardGrid from "@/components/dashboard/JobCardGrid";
import JobCategoryChart from "@/components/dashboard/JobCategoryChart";
import JobStatusChart from "@/components/dashboard/JobStatusChart";
import NotificationsDropdown from "@/components/dashboard/NotificationsDropdown";
import RecentApplicantsTable from "@/components/dashboard/RecentApplicantsTable";
import RecentJobsTable from "@/components/dashboard/RecentJobsTable";
import StatsCards from "@/components/dashboard/StatsCards";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dashboard statistics interface
interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  newApplications: number;
  interviewScheduled: number;
  offerSent: number;
}

const CompanyDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<CompanyJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
    interviewScheduled: 0,
    offerSent: 0,
  });

  // Load dashboard data
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setJobs(mockCompanyJobs);

          // Calculate statistics
          const activeJobs = mockCompanyJobs.filter((job) => job.status === "Published").length;
          const totalApplications = mockCompanyJobs.reduce(
            (sum, job) => sum + job.applicantCount,
            0,
          );
          const newApplications = mockApplicants.filter((app) => app.status === "New").length;
          const interviewScheduled = mockApplicants.filter(
            (app) => app.status === "Interviewed",
          ).length;
          const offerSent = mockApplicants.filter((app) => app.status === "Offered").length;

          setStats({
            totalJobs: mockCompanyJobs.length,
            activeJobs,
            totalApplications,
            newApplications,
            interviewScheduled,
            offerSent,
          });

          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle job creation
  const handleCreateJob = () => {
    navigate(ROUTES.COMPANY.JOBS.CREATE);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <DashboardHeader />
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
          <Button onClick={handleCreateJob}>
            <Plus className="mr-2 size-4" />
            Create New Job
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applicants</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Recent Jobs and Applicants Tables */}
          <div className="grid gap-4 md:grid-cols-2">
            <RecentJobsTable jobs={jobs.slice(0, 3)} />
            <RecentApplicantsTable applicants={mockApplicants} />
          </div>

          {/* Upcoming Interviews */}
          <UpcomingInterviews />

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-3">
            <JobStatusChart jobs={jobs} />
            <ApplicantProgressChart applicants={mockApplicants} />
            <JobCategoryChart />
          </div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">All Jobs</h2>
              <Button onClick={handleCreateJob}>
                <Plus className="mr-2 size-4" />
                Create New Job
              </Button>
            </div>
            <JobCardGrid jobs={jobs} />
          </div>
        </TabsContent>

        {/* Applicants Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">All Applicants</h2>
              <Link to={ROUTES.COMPANY.APPLICATIONS}>
                <Button variant="outline">View All Applicants</Button>
              </Link>
            </div>
            <ApplicantsTable applicants={mockApplicants} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDashboardPage;
