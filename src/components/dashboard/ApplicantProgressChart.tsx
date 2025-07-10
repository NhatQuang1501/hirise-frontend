import React from "react";
import { Applicant } from "@/types/company";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ApplicantProgressChartProps {
  applicants: Applicant[];
}

const ApplicantProgressChart: React.FC<ApplicantProgressChartProps> = ({ applicants }) => {
  const newApplicants = applicants.filter((a) => a.status === "New").length;
  const reviewing = applicants.filter((a) => a.status === "Reviewing").length;
  const interviewed = applicants.filter((a) => a.status === "Interviewed").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Applicant Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-blue-500"></div>
                <span>New</span>
              </div>
              <span className="font-medium">{newApplicants}</span>
            </div>
            <Progress
              value={(newApplicants / applicants.length) * 100}
              className="h-2 bg-gray-100 [&>div]:bg-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-yellow-500"></div>
                <span>Reviewing</span>
              </div>
              <span className="font-medium">{reviewing}</span>
            </div>
            <Progress
              value={(reviewing / applicants.length) * 100}
              className="h-2 bg-gray-100 [&>div]:bg-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="mr-2 size-3 rounded-full bg-purple-500"></div>
                <span>Interviewed</span>
              </div>
              <span className="font-medium">{interviewed}</span>
            </div>
            <Progress
              value={(interviewed / applicants.length) * 100}
              className="h-2 bg-gray-100 [&>div]:bg-purple-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantProgressChart;
