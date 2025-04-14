// File: hirise-frontend/src/components/dashboard/RecentApplicantsTable.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { UserCircle } from "lucide-react";
import { Applicant } from "@/types/recruiter";
import { getApplicantStatusColor } from "@/utils/statusHelpers";

interface RecentApplicantsTableProps {
  applicants: Applicant[];
}

const RecentApplicantsTable: React.FC<RecentApplicantsTableProps> = ({ applicants }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Latest Applicants</CardTitle>
        <CardDescription>
          Most recent job applicants
        </CardDescription>
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