import React from "react";
import { Calendar, Download, ExternalLink, Mail, Phone, UserCircle } from "lucide-react";
import { Applicant } from "@/types/recruiter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ApplicantListSectionProps {
  applicants: Applicant[];
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Reviewing":
      return "bg-yellow-100 text-yellow-800";
    case "Interviewed":
      return "bg-purple-100 text-purple-800";
    case "Offered":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ApplicantListSection: React.FC<ApplicantListSectionProps> = ({ applicants }) => {
  if (applicants.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <UserCircle className="mx-auto size-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No applicants yet</h3>
          <p className="text-muted-foreground mt-1">
            Your job has no applicants yet. Please check back later or share the job link to get
            more applicants.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-bold">Applicant list ({applicants.length})</h2>

      {applicants.map((applicant) => (
        <Card key={applicant.id}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{applicant.name}</h3>
                  <Badge className={getStatusColor(applicant.status)}>{applicant.status}</Badge>
                </div>

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="size-4" />
                    <span>{applicant.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="size-4" />
                    <span>{applicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    <span>Applied: {applicant.applyDate}</span>
                  </div>
                </div>

                {applicant.matchingScore && (
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Matching score</span>
                      <span className="text-sm font-medium">{applicant.matchingScore}%</span>
                    </div>
                    <Progress value={applicant.matchingScore} className="h-2" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 border-t bg-gray-50 p-4 md:border-t-0 md:border-l">
                <Button size="sm" variant="outline" className="gap-2" asChild>
                  <a href={applicant.cvLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                    <span>View CV</span>
                  </a>
                </Button>

                <Button size="sm" variant="outline" className="gap-2" asChild>
                  <a href={applicant.cvLink} download>
                    <Download className="size-4" />
                    <span>Download CV</span>
                  </a>
                </Button>

                <Button size="sm" variant="default" className="gap-2" asChild>
                  <a href={`mailto:${applicant.email}`}>
                    <Mail className="size-4" />
                    <span>Contact</span>
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApplicantListSection;
