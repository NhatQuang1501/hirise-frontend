import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RecruiterJob } from "@/types/recruiter";

interface JobStatusChartProps {
  jobs: RecruiterJob[];
}

const JobStatusChart: React.FC<JobStatusChartProps> = ({ jobs }) => {
  const publishedJobs = jobs.filter(job => job.status === "Published").length;
  const draftJobs = jobs.filter(job => job.status === "Draft").length;
  const closedJobs = jobs.filter(job => job.status === "Closed").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Job Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-green-500"></div>
                <span>Published</span>
              </div>
              <span className="font-medium">{publishedJobs}</span>
            </div>
            <Progress 
              value={(publishedJobs / jobs.length) * 100} 
              className="h-2 bg-gray-100"
              indicatorClassName="bg-green-500"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-gray-500"></div>
                <span>Draft</span>
              </div>
              <span className="font-medium">{draftJobs}</span>
            </div>
            <Progress 
              value={(draftJobs / jobs.length) * 100} 
              className="h-2 bg-gray-100"
              indicatorClassName="bg-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-red-500"></div>
                <span>Closed</span>
              </div>
              <span className="font-medium">{closedJobs}</span>
            </div>
            <Progress 
              value={(closedJobs / jobs.length) * 100} 
              className="h-2 bg-gray-100"
              indicatorClassName="bg-red-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobStatusChart;