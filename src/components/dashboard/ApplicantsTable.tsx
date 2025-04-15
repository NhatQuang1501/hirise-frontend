// File: hirise-frontend/src/components/dashboard/ApplicantsTable.tsx
import React from "react";
import { getApplicantStatusColor } from "@/utils/statusHelpers";
import { CheckCircle, Download, Eye, MoreVertical, UserCircle, XCircle } from "lucide-react";
import { Applicant } from "@/types/recruiter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ApplicantsTableProps {
  applicants: Applicant[];
}

const ApplicantsTable: React.FC<ApplicantsTableProps> = ({ applicants }) => {
  return (
    <Card>
      <CardContent className="p-0">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <UserCircle className="mr-2 size-9 text-gray-400" />
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-muted-foreground text-xs">{applicant.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>Senior React Developer</TableCell>
                  <TableCell>{applicant.applyDate}</TableCell>
                  <TableCell>
                    {applicant.matchingScore && (
                      <div className="flex items-center">
                        <span className="mr-2 text-sm font-medium">{applicant.matchingScore}%</span>
                        <Progress
                          value={applicant.matchingScore}
                          className="h-2 w-24"
                          indicatorClassName={
                            applicant.matchingScore >= 80
                              ? "bg-green-500"
                              : applicant.matchingScore >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getApplicantStatusColor(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 size-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 size-4" />
                          Download Resume
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 size-4 text-yellow-500" />
                          Set to Reviewing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 size-4 text-purple-500" />
                          Set to Interviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 size-4 text-green-500" />
                          Send Offer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 size-4 text-red-500" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="grid gap-4 md:hidden">
          {applicants.map((applicant) => (
            <Card key={applicant.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <UserCircle className="mt-1 size-8 flex-shrink-0 text-gray-400" />
                  <div className="flex-1 space-y-2">
                    <div>
                      <h4 className="font-medium">{applicant.name}</h4>
                      <div className="text-muted-foreground text-xs">{applicant.email}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Position: </span>
                        <span>Senior React Developer</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applied: </span>
                        <span>{applicant.applyDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getApplicantStatusColor(applicant.status)}>
                        {applicant.status}
                      </Badge>

                      {applicant.matchingScore && (
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1 text-xs">Match:</span>
                          <span className="mr-1 text-sm font-medium">
                            {applicant.matchingScore}%
                          </span>
                        </div>
                      )}

                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Eye className="mr-1 size-3.5" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantsTable;
