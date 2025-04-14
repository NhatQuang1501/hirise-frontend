import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import RecruiterJobCard from "@/components/recruiter/RecruiterJobCard";
import RecruiterJobFilters from "@/components/recruiter/RecruiterJobFilters";
import { JobStatus, RecruiterJob } from "@/types/recruiter";

// Mock data cho mục đích demo - trong thực tế sẽ lấy từ API
const mockRecruiterJobs: RecruiterJob[] = [
  {
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
    responsibilities: ["Develop new features", "Maintain existing code", "Code reviews"],
    basicRequirements: ["3+ years React experience", "Strong TypeScript skills"],
    preferredSkills: ["NextJS", "GraphQL"],
    benefits: ["Flexible working hours", "Health insurance", "Annual trips"],
    companyDescription: "Vietnam's largest IT company specializing in software development."
  },
  {
    id: 2,
    title: "Product Designer",
    company: "VNG Corporation",
    logo: "/company-logos/vng.png",
    status: "Draft",
    location: "TP. Hồ Chí Minh, Việt Nam",
    salary: "$1200 - $2000",
    skills: ["UI/UX", "Figma", "Adobe XD", "User Research"],
    time: "Full-time",
    experience: "2-4 years",
    level: "Mid-level",
    contractType: "Full-time",
    applicantCount: 0,
    createdDate: "2023-06-20",
    deadline: "2023-07-25",
    companyId: "2",
    interviewProcess: ["Portfolio Review", "Design Challenge", "Culture Fit"],
    responsibilities: ["Create wireframes", "Conduct user testing"],
    basicRequirements: ["2+ years design experience", "Portfolio of work"],
    preferredSkills: ["Motion design", "Prototyping"],
    benefits: ["Remote work options", "Professional development budget"],
    companyDescription: "Leading internet company in Vietnam, known for Zalo and Zing MP3."
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Tiki",
    logo: "/company-logos/tiki.png",
    status: "Closed",
    location: "TP. Hồ Chí Minh, Việt Nam",
    salary: "$2000 - $3000",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    time: "Full-time",
    experience: "4-6 years",
    level: "Senior",
    contractType: "Full-time",
    applicantCount: 8,
    createdDate: "2023-05-10",
    deadline: "2023-06-15",
    companyId: "3",
    interviewProcess: ["Technical Screening", "System Design", "Team Interview"],
    responsibilities: ["Manage cloud infrastructure", "Implement CI/CD pipelines"],
    basicRequirements: ["4+ years DevOps experience", "Strong AWS knowledge"],
    preferredSkills: ["Monitoring tools", "Security practices"],
    benefits: ["Competitive salary", "Stock options", "Flexible hours"],
    companyDescription: "One of the largest e-commerce platforms in Vietnam."
  }
];

const RecruiterJobListPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<RecruiterJob[]>(mockRecruiterJobs);
  const [filteredJobs, setFilteredJobs] = useState<RecruiterJob[]>(mockRecruiterJobs);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeStatus, setActiveStatus] = useState<JobStatus | "All">("All");
  
  // Xử lý dialog xóa job
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  
  // Xử lý dialog đóng job
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [jobToClose, setJobToClose] = useState<number | null>(null);

  // Áp dụng filter
  useEffect(() => {
    let result = [...jobs];
    
    // Filter theo từ khóa
    if (searchKeyword) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    
    // Filter theo status
    if (activeStatus !== "All") {
      result = result.filter(job => job.status === activeStatus);
    }
    
    setFilteredJobs(result);
  }, [jobs, searchKeyword, activeStatus]);

  // Xử lý tìm kiếm
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  // Xử lý thay đổi filter status
  const handleStatusChange = (status: JobStatus | "All") => {
    setActiveStatus(status);
  };
  
  // Các hàm xử lý action cho job
  const handleViewJob = (id: number) => {
    navigate(`/recruiter/jobs/${id}`);
  };
  
  const handleEditJob = (id: number) => {
    navigate(`/recruiter/jobs/${id}/edit`);
  };
  
  const handleCreateJob = () => {
    navigate("/recruiter/jobs/create");
  };
  
  // Hiển thị dialog xóa
  const showDeleteDialog = (id: number) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  // Xử lý xóa job
  const confirmDeleteJob = () => {
    if (jobToDelete) {
      const updatedJobs = jobs.filter(job => job.id !== jobToDelete);
      setJobs(updatedJobs);
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };
  
  // Hiển thị dialog đóng job
  const showCloseDialog = (id: number) => {
    setJobToClose(id);
    setCloseDialogOpen(true);
  };
  
  // Xử lý đóng job
  const confirmCloseJob = () => {
    if (jobToClose) {
      const updatedJobs = jobs.map(job => {
        if (job.id === jobToClose) {
          return { ...job, status: "Closed" as JobStatus };
        }
        return job;
      });
      setJobs(updatedJobs);
      setCloseDialogOpen(false);
      setJobToClose(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RecruiterJobFilters
        searchKeyword={searchKeyword}
        activeStatus={activeStatus}
        onSearchChange={handleSearch}
        onStatusChange={handleStatusChange}
        onCreateJob={handleCreateJob}
      />

      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <RecruiterJobCard
              key={job.id}
              job={job}
              onDelete={showDeleteDialog}
              onClose={showCloseDialog}
              onView={handleViewJob}
              onEdit={handleEditJob}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold">Không tìm thấy công việc nào</h3>
            <p className="text-muted-foreground">
              Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc.
            </p>
          </div>
        )}
      </div>
      
      {filteredJobs.length > 0 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      {/* Dialog xác nhận xóa job */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa công việc này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Công việc này sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteJob} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Dialog xác nhận đóng job */}
      <AlertDialog open={closeDialogOpen} onOpenChange={setCloseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn đóng công việc này?</AlertDialogTitle>
            <AlertDialogDescription>
              Khi đóng công việc, ứng viên sẽ không thể ứng tuyển được nữa, nhưng bạn vẫn có thể xem các ứng viên đã ứng tuyển.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCloseJob}>
              Đóng công việc
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecruiterJobListPage;