import React, { useState } from "react";
import { ChevronRight, Clock, Sparkles, Star, Users } from "lucide-react";
import { JobCardData } from "@/types/job";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "./JobCard";

interface FeaturedJobsProps {
  featuredJobs: JobCardData[];
  mostAppliedJobs: JobCardData[];
  recentlyViewedJobs: JobCardData[];
  recommendedJobs: JobCardData[];
}

const FeaturedJobs: React.FC<FeaturedJobsProps> = ({
  featuredJobs,
  mostAppliedJobs,
  recentlyViewedJobs,
  recommendedJobs,
}) => {
  const [activeTab, setActiveTab] = useState("featured");

  return (
    <div className="bg-background space-y-8 rounded-xl p-6 shadow-sm">
      <h2 className="text-center text-2xl font-bold">Discover More Opportunities</h2>

      <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="featured" className="flex items-center gap-1.5">
            <Star
              className={cn(
                "h-4 w-4",
                activeTab === "featured" ? "text-yellow-500" : "text-muted-foreground",
              )}
            />
            <span>Featured</span>
          </TabsTrigger>
          <TabsTrigger value="mostApplied" className="flex items-center gap-1.5">
            <Users
              className={cn(
                "h-4 w-4",
                activeTab === "mostApplied" ? "text-blue-500" : "text-muted-foreground",
              )}
            />
            <span>Most Applied</span>
          </TabsTrigger>
          <TabsTrigger value="recentlyViewed" className="flex items-center gap-1.5">
            <Clock
              className={cn(
                "h-4 w-4",
                activeTab === "recentlyViewed" ? "text-green-500" : "text-muted-foreground",
              )}
            />
            <span>Recently Viewed</span>
          </TabsTrigger>
          <TabsTrigger value="recommended" className="flex items-center gap-1.5">
            <Sparkles
              className={cn(
                "h-4 w-4",
                activeTab === "recommended" ? "text-purple-500" : "text-muted-foreground",
              )}
            />
            <span>Recommended</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Featured Jobs</span>
            </h3>
            <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mostApplied" className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Most Applied Jobs</span>
            </h3>
            <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mostAppliedJobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recentlyViewed" className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Clock className="h-5 w-5 text-green-500" />
              <span>Recently Viewed Jobs</span>
            </h3>
            <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentlyViewedJobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span>Recommended Jobs</span>
            </h3>
            <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeaturedJobs;
