// File: hirise-frontend/src/components/dashboard/JobCategoryChart.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const JobCategoryChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Jobs by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-indigo-500"></div>
                <span>Web Development</span>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <Progress value={45} className="h-2 bg-gray-100" indicatorClassName="bg-indigo-500" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-pink-500"></div>
                <span>UI/UX Design</span>
              </div>
              <span className="font-medium">30%</span>
            </div>
            <Progress value={30} className="h-2 bg-gray-100" indicatorClassName="bg-pink-500" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-amber-500"></div>
                <span>DevOps</span>
              </div>
              <span className="font-medium">25%</span>
            </div>
            <Progress value={25} className="h-2 bg-gray-100" indicatorClassName="bg-amber-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCategoryChart;
