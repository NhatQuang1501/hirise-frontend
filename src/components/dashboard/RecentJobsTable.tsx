// File: hirise-frontend/src/components/dashboard/RecentJobsTable.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { RecruiterJob } from "@/types/recruiter";
import { getStatusColor } from "@/utils/statusHelpers";

interface RecentJobsTableProps {
  jobs: RecruiterJob[];
}

const RecentJobsTable: React.FC<RecentJobsTableProps> = ({ jobs }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Jobs</CardTitle>
        <CardDescription>
          Recently created job postings
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                  <Link 
                    to={ROUTES.RECRUITER.JOBS.DETAIL.replace(":id", job.id.toString())}
                    className="hover:text-primary hover:underline"
                  >
                    {job.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.applicantCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-muted/50 border-t p-2">
        <Button variant="link" asChild>
          <Link to={ROUTES.RECRUITER.JOBS.LIST}>View All Jobs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentJobsTable;