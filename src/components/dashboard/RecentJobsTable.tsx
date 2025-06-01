// File: hirise-frontend/src/components/dashboard/RecentJobsTable.tsx
import React from "react";
import { ROUTES } from "@/routes/routes";
import { getStatusColor } from "@/utils/statusHelpers";
import { Link } from "react-router-dom";
import { CompanyJob } from "@/types/company";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentJobsTableProps {
  jobs: CompanyJob[];
}

const RecentJobsTable: React.FC<RecentJobsTableProps> = ({ jobs }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Jobs</CardTitle>
        <CardDescription>Recently created job postings</CardDescription>
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
                    to={ROUTES.COMPANY.JOBS.DETAIL.replace(":id", job.id.toString())}
                    className="hover:text-primary hover:underline"
                  >
                    {job.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                </TableCell>
                <TableCell>{job.applicantCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-muted/50 border-t p-2">
        <Button variant="link" asChild>
          <Link to={ROUTES.COMPANY.JOBS.LIST}>View All Jobs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentJobsTable;
