import React from "react";
import { Clock, Sparkles, Star, Users } from "lucide-react";
import { JobCardData } from "@/types/job";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContentSection from "../section/TabContentSection";
import JobCard from "./JobCard";

interface FeaturedJobsProps {
  featuredJobs: JobCardData[];
  mostAppliedJobs: JobCardData[];
  recentlyViewedJobs: JobCardData[];
  recommendedJobs: JobCardData[];
}

const JobGrid: React.FC<{ jobs: JobCardData[] }> = ({ jobs }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {jobs.slice(0, 3).map((job) => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);

// Tạo map chứa các màu nền và màu chữ cho từng tab
const tabColors = {
  featured: {
    bg: "bg-yellow-500/10",
    activeBg: "!bg-yellow-500", // Thêm ! để override style mặc định
    icon: "text-yellow-500",
    activeIcon: "text-white",
    shadow: "shadow-yellow-500/30",
  },
  mostApplied: {
    bg: "bg-blue-500/10",
    activeBg: "!bg-blue-500", // Thêm ! để override style mặc định
    icon: "text-blue-500",
    activeIcon: "text-white",
    shadow: "shadow-blue-500/30",
  },
  recentlyViewed: {
    bg: "bg-green-500/10",
    activeBg: "!bg-green-500", // Thêm ! để override style mặc định
    icon: "text-green-500",
    activeIcon: "text-white",
    shadow: "shadow-green-500/30",
  },
  recommended: {
    bg: "bg-purple-500/10",
    activeBg: "!bg-purple-500", // Thêm ! để override style mặc định
    icon: "text-purple-500",
    activeIcon: "text-white",
    shadow: "shadow-purple-500/30",
  },
};

const FeaturedJobs: React.FC<FeaturedJobsProps> = ({
  featuredJobs,
  mostAppliedJobs,
  recentlyViewedJobs,
  recommendedJobs,
}) => {
  return (
    <div className="py-8">
      <Tabs defaultValue="featured">
        <TabsList className="bg-card mb-8 grid h-15 w-full grid-cols-2 rounded-xl p-[3xl] shadow-md md:grid-cols-4">
          <TabsTrigger
            value="featured"
            className={cn(
              "flex items-center gap-2 rounded-lg transition-all duration-200 hover:bg-yellow-500/20",
              "data-[state=active]:scale-[1.03] data-[state=active]:shadow-md",
              "data-[state=active]:font-medium data-[state=active]:text-white",
              "data-[state=active]:bg-yellow-500",
              "data-[state=active]:" + tabColors.featured.shadow,
              "h-12 py-2 text-base", // Tăng kích thước
            )}
          >
            <Star
              className={cn("h-6 w-6", tabColors.featured.icon, "data-[state=active]:text-white")}
            />
            <span>Featured</span>
          </TabsTrigger>
          <TabsTrigger
            value="mostApplied"
            className={cn(
              "flex items-center gap-2 rounded-lg transition-all duration-200 hover:bg-blue-500/20",
              "data-[state=active]:scale-[1.03] data-[state=active]:shadow-md",
              "data-[state=active]:font-medium data-[state=active]:text-white",
              "data-[state=active]:bg-blue-500",
              "data-[state=active]:" + tabColors.mostApplied.shadow,
              "h-12 py-2 text-base", // Tăng kích thước
            )}
          >
            <Users
              className={cn(
                "h-6 w-6",
                tabColors.mostApplied.icon,
                "data-[state=active]:text-white",
              )}
            />
            <span>Most Applied</span>
          </TabsTrigger>
          <TabsTrigger
            value="recentlyViewed"
            className={cn(
              "flex items-center gap-2 rounded-lg transition-all duration-200 hover:bg-green-500/20",
              "data-[state=active]:scale-[1.03] data-[state=active]:shadow-md",
              "data-[state=active]:font-medium data-[state=active]:text-white",
              "data-[state=active]:bg-green-500",
              "data-[state=active]:" + tabColors.recentlyViewed.shadow,
              "h-12 py-2 text-base", // Tăng kích thước
            )}
          >
            <Clock
              className={cn(
                "h-6 w-6",
                tabColors.recentlyViewed.icon,
                "data-[state=active]:text-white",
              )}
            />
            <span>Recently Viewed</span>
          </TabsTrigger>
          <TabsTrigger
            value="recommended"
            className={cn(
              "flex items-center gap-2 rounded-lg transition-all duration-200 hover:bg-purple-500/20",
              "data-[state=active]:scale-[1.03] data-[state=active]:shadow-md",
              "data-[state=active]:font-medium data-[state=active]:text-white",
              "data-[state=active]:bg-purple-500",
              "data-[state=active]:" + tabColors.recommended.shadow,
              "h-12 py-2 text-base", // Tăng kích thước
            )}
          >
            <Sparkles
              className={cn(
                "h-6 w-6",
                tabColors.recommended.icon,
                "data-[state=active]:text-white",
              )}
            />
            <span>Recommended</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured">
          <TabContentSection
            title="Featured Jobs"
            icon={<Star className="h-5 w-5" />}
            iconColor={tabColors.featured.icon}
          >
            <JobGrid jobs={featuredJobs} />
          </TabContentSection>
        </TabsContent>

        <TabsContent value="mostApplied">
          <TabContentSection
            title="Most Applied Jobs"
            icon={<Users className="h-5 w-5" />}
            iconColor={tabColors.mostApplied.icon}
          >
            <JobGrid jobs={mostAppliedJobs} />
          </TabContentSection>
        </TabsContent>

        <TabsContent value="recentlyViewed">
          <TabContentSection
            title="Recently Viewed Jobs"
            icon={<Clock className="h-5 w-5" />}
            iconColor={tabColors.recentlyViewed.icon}
          >
            <JobGrid jobs={recentlyViewedJobs} />
          </TabContentSection>
        </TabsContent>

        <TabsContent value="recommended">
          <TabContentSection
            title="Recommended Jobs"
            icon={<Sparkles className="h-5 w-5" />}
            iconColor={tabColors.recommended.icon}
          >
            <JobGrid jobs={recommendedJobs} />
          </TabContentSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeaturedJobs;
