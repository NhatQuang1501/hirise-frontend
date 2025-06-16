import React from "react";
import { CheckCircle, Clock, Users, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ApplicationStatsProps {
  statsLoading: boolean;
  statusCounts: {
    total: number;
    reviewing: number;
    accepted: number;
    rejected: number;
  };
  calculateProgress: (count: number, total: number) => number;
}

export const ApplicationStats: React.FC<ApplicationStatsProps> = ({
  statsLoading,
  statusCounts,
  calculateProgress,
}) => {
  return (
    <div className="from-primary/5 to-primary/10 rounded-xl bg-gradient-to-br p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold">Applications Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Users className="text-primary mr-2 h-4 w-4" />
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{statsLoading ? "..." : statusCounts.total}</div>
            <p className="text-muted-foreground text-xs">Across all jobs</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              Under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {statsLoading ? "..." : statusCounts.reviewing}
            </div>
            <Progress
              value={calculateProgress(statusCounts.reviewing, statusCounts.total)}
              className="mt-2 h-1.5 bg-blue-100"
            />
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {statsLoading ? "..." : statusCounts.accepted}
            </div>
            <Progress
              value={calculateProgress(statusCounts.accepted, statusCounts.total)}
              className="mt-2 h-1.5 bg-green-100"
            />
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {statsLoading ? "..." : statusCounts.rejected}
            </div>
            <Progress
              value={calculateProgress(statusCounts.rejected, statusCounts.total)}
              className="mt-2 h-1.5 bg-red-100"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
