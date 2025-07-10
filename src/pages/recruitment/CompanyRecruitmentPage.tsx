import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { Briefcase, Plus, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CompanyApplicationsOverview } from "@/components/application/CompanyApplicationsOverview";
import { CompanyJobList } from "@/components/recruitment/CompanyJobList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabValue = "jobs" | "applications";

const CompanyRecruitmentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current tab from URL
  const getTabFromPath = (): TabValue => {
    if (location.pathname.includes("/recruitment-management/applications")) return "applications";
    return "jobs";
  };

  const [activeTab, setActiveTab] = useState<TabValue>(getTabFromPath());

  // Update activeTab when URL changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  // Change tab and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);

    switch (value) {
      case "jobs":
        navigate(ROUTES.COMPANY.JOBS.LIST);
        break;
      case "applications":
        navigate(ROUTES.COMPANY.APPLICATIONS.LIST);
        break;
      default:
        navigate(ROUTES.COMPANY.RECRUITMENT_MANAGEMENT);
    }
  };

  const handleCreateJob = () => {
    navigate(ROUTES.COMPANY.JOBS.CREATE);
  };

  if (user?.role !== "company") {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Access denied</h1>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Recruitment Management</h1>
          <p className="text-muted-foreground mt-1">Manage your jobs and applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleCreateJob} className="gap-2">
            <Plus className="size-4" />
            Create new job
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Applications</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="jobs" className="mt-6 w-full">
            <CompanyJobList />
          </TabsContent>

          <TabsContent value="applications" className="mt-6 w-full">
            <CompanyApplicationsOverview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyRecruitmentPage;
