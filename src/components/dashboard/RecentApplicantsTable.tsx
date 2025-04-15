// File: hirise-frontend/src/components/dashboard/RecentApplicantsTable.tsx
import React from "react";
import { ROUTES } from "@/routes/routes";
import { getApplicantStatusColor } from "@/utils/statusHelpers";
import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Applicant } from "@/types/recruiter";
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

interface RecentApplicantsTableProps {
  applicants: Applicant[];
}

const RecentApplicantsTable: React.FC<RecentApplicantsTableProps> = ({ applicants }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Latest Applicants</CardTitle>
        <CardDescription>Most recent job applicants</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <UserCircle className="mr-2 size-5 text-gray-400" />
                    {applicant.name}
                  </div>
                </TableCell>
                <TableCell>Senior React Developer</TableCell>
                <TableCell>
                  <Badge className={getApplicantStatusColor(applicant.status)}>
                    {applicant.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="bg-muted/50 border-t p-2">
        <Button variant="link" asChild>
          <Link to={ROUTES.RECRUITER.APPLICATIONS}>View All Applicants</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentApplicantsTable;
