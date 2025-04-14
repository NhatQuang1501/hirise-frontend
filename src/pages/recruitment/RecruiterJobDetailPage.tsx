import React, { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { AlertCircle, Calendar, Clock, Edit, MapPin, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApplicants, mockJob } from "@/types/mockData";
import { Applicant, RecruiterJob } from "@/types/recruiter";
import ApplicantListSection from "@/components/section/ApplicantListSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-gray-100 text-gray-800";
    case "Closed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecruiterJobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<RecruiterJob | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setJob(mockJob);
      setApplicants(mockApplicants);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No job found with the given information. Please check the information and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleEditJob = () => {
    navigate(ROUTES.RECRUITER.JOBS.EDIT.replace(":id", id || ""));
  };

  const handleCloseJob = () => {
    // Hiển thị dialog xác nhận trước khi đóng job
    if (
      window.confirm(
        "Are you sure you want to close this job? Applicants will no longer be able to apply for this job.",
      )
    ) {
      // Gọi API để đóng job
      alert("Job closed successfully");
      // Cập nhật state
      setJob({
        ...job,
        status: "Closed",
      });
    }
  };

  const handleDeleteJob = () => {
    // Hiển thị dialog xác nhận trước khi xóa job
    if (window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      // Gọi API để xóa job
      alert("Job deleted successfully");
      // Chuyển về trang danh sách
      navigate(ROUTES.RECRUITER.JOBS.LIST);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header thông tin */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
          </div>
          <p className="text-lg text-gray-600">{job.company}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleEditJob} className="gap-2">
            <Edit className="size-4" />
            Edit
          </Button>

          {job.status !== "Closed" && (
            <Button onClick={handleCloseJob} variant="outline" className="gap-2">
              <AlertCircle className="size-4" />
              Close Job
            </Button>
          )}

          <Button onClick={handleDeleteJob} variant="destructive" className="gap-2">
            <AlertCircle className="size-4" />
            Delete Job
          </Button>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-1 size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Created date</p>
                <p className="font-medium">{job.createdDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-1 size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{job.deadline}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="mt-1 size-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Applicants</p>
                <p className="font-medium">{job.applicantCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs nội dung */}
      <Tabs defaultValue="job-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="job-details">Job details</TabsTrigger>
          <TabsTrigger value="applicants">Applicants ({applicants.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="job-details" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-xl font-semibold">Job description</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-lg font-medium">Responsibilities</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-medium">Requirements</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.basicRequirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-medium">Preferred Skills</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.preferredSkills.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-medium">Benefits</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applicants">
          <ApplicantListSection applicants={applicants} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterJobDetailPage;
