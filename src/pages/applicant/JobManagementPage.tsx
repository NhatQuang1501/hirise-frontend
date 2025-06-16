import { useState } from "react";
import { ROUTES } from "@/routes/routes";
import { Bookmark, Briefcase, Building } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FollowingCompaniesList } from "@/components/company/FollowingCompaniesList";
import { AppliedJobsList } from "@/components/job/AppliedJobsList";
import { SavedJobsList } from "@/components/job/SavedJobsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobManagementPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current tab from URL or default to "applied"
  const getTabFromPath = () => {
    if (location.pathname.includes("/saved-jobs")) return "saved";
    if (location.pathname.includes("/following-companies")) return "following";
    return "applied";
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());

  // Change tab and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);

    switch (value) {
      case "applied":
        navigate(ROUTES.APPLICANT.APPLIED_JOBS);
        break;
      case "saved":
        navigate(ROUTES.APPLICANT.SAVED_JOBS);
        break;
      case "following":
        navigate(ROUTES.APPLICANT.FOLLOWING_COMPANIES);
        break;
      default:
        navigate(ROUTES.APPLICANT.JOB_MANAGEMENT);
    }
  };

  if (user?.role !== "applicant") {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Job Management</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="applied" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Applied Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span>Saved Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="following" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Following Companies</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="mt-6">
          <AppliedJobsList />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <SavedJobsList />
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <FollowingCompaniesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobManagementPage;
