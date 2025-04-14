import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, Calendar, Clock, Edit, MapPin, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicantListSection from "@/components/recruiter/ApplicantListSection";
import { Applicant, RecruiterJob } from "@/types/recruiter";

// Dữ liệu mẫu
const mockJob: RecruiterJob = {
  id: 1,
  title: "Senior React Developer",
  company: "FPT Software",
  logo: "/company-logos/fpt.png",
  status: "Published",
  location: "Hà Nội, Việt Nam",
  salary: "$1500 - $2500",
  skills: ["React", "TypeScript", "Node.js", "Redux"],
  time: "Full-time",
  experience: "3-5 years",
  level: "Senior",
  contractType: "Full-time",
  applicantCount: 12,
  createdDate: "2023-06-15",
  deadline: "2023-07-30",
  companyId: "1",
  interviewProcess: ["Phone Screening", "Technical Interview", "HR Interview"],
  responsibilities: [
    "Develop new features and functionality for web applications",
    "Maintain existing code and troubleshoot issues",
    "Collaborate with designers and backend developers",
    "Participate in code reviews and technical discussions",
    "Write clean, efficient, and reusable code",
  ],
  basicRequirements: [
    "3+ years of experience with React",
    "Strong knowledge of TypeScript",
    "Experience with state management (Redux, Context API)",
    "Understanding of responsive design principles",
    "Familiarity with REST APIs and async programming",
  ],
  preferredSkills: [
    "Experience with Next.js",
    "Knowledge of GraphQL",
    "Testing frameworks (Jest, React Testing Library)",
    "Familiarity with CI/CD pipelines",
  ],
  benefits: [
    "Competitive salary package",
    "Flexible working hours",
    "Health insurance",
    "Annual company trips",
    "Professional development budget",
  ],
  companyDescription: "Vietnam's largest IT company specializing in software development."
};

const mockApplicants: Applicant[] = [
  {
    id: "a1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    cvLink: "/samples/cv-template.pdf",
    matchingScore: 85,
    applyDate: "2023-06-20",
    status: "Reviewing",
  },
  {
    id: "a2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0909876543",
    cvLink: "/samples/cv-template.pdf",
    matchingScore: 92,
    applyDate: "2023-06-18",
    status: "Interviewed",
  },
  {
    id: "a3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0912345678",
    cvLink: "/samples/cv-template.pdf",
    matchingScore: 78,
    applyDate: "2023-06-25",
    status: "New",
  },
];

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
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>
            Không thể tìm thấy thông tin công việc. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleEditJob = () => {
    navigate(`/recruiter/jobs/${id}/edit`);
  };

  const handleCloseJob = () => {
    // Hiển thị dialog xác nhận trước khi đóng job
    if (window.confirm("Bạn có chắc chắn muốn đóng công việc này? Ứng viên sẽ không thể ứng tuyển sau khi đóng.")) {
      // Gọi API để đóng job
      alert("Đã đóng công việc thành công");
      // Cập nhật state
      setJob({
        ...job,
        status: "Closed",
      });
    }
  };

  const handleDeleteJob = () => {
    // Hiển thị dialog xác nhận trước khi xóa job
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này? Hành động này không thể hoàn tác.")) {
      // Gọi API để xóa job
      alert("Đã xóa công việc thành công");
      // Chuyển về trang danh sách
      navigate("/recruiter/jobs");
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
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
          
          {job.status !== "Closed" && (
            <Button
              onClick={handleCloseJob}
              variant="outline"
              className="gap-2"
            >
              Đóng công việc
            </Button>
          )}
          
          <Button
            onClick={handleDeleteJob}
            variant="destructive"
            className="gap-2"
          >
            Xóa
          </Button>
        </div>
      </div>

      {/* Thông tin cơ bản */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Địa điểm</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Ngày tạo</p>
                <p className="font-medium">{job.createdDate}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Hạn chót</p>
                <p className="font-medium">{job.deadline}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Ứng viên đã ứng tuyển</p>
                <p className="font-medium">{job.applicantCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs nội dung */}
      <Tabs defaultValue="job-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="job-details">Chi tiết công việc</TabsTrigger>
          <TabsTrigger value="applicants">Danh sách ứng viên ({applicants.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="job-details" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-xl font-semibold">Mô tả công việc</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-lg font-medium">Trách nhiệm công việc</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-2 text-lg font-medium">Yêu cầu cơ bản</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.basicRequirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-2 text-lg font-medium">Kỹ năng ưu tiên</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.preferredSkills.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-2 text-lg font-medium">Quyền lợi</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-2 text-lg font-medium">Kỹ năng</h4>
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