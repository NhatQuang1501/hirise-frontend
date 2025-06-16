// File: hirise-frontend/src/components/dashboard/StatsCards.tsx
import React from "react";
import { Calendar, FileBarChart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    totalJobs: number;
    activeJobs: number;
    totalApplications: number;
    newApplications: number;
    interviewScheduled: number;
    offerSent: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          <FileBarChart className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalJobs}</div>
          <p className="text-muted-foreground text-xs">{stats.activeJobs} active jobs</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
          <Users className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalApplications}</div>
          <p className="text-muted-foreground text-xs">
            {stats.newApplications} new applicants this week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
          <Calendar className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.interviewScheduled}</div>
          <p className="text-muted-foreground text-xs">{stats.offerSent} job offers sent</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
