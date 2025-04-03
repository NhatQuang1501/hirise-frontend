import React, { useEffect, useState } from "react";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  Phone,
  Video,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import JobCarousel from "@/components/job/JobCarousel";
import { Button } from "@/components/ui/button";
// Import metadata từ file riêng biệt
import { jobDetailMetadata } from "./jobDetailMetadata";

// Mẫu dữ liệu (sau này sẽ được lấy từ API)
const jobsData = [
  {
    id: 1,
    company: "FPT Software",
    logo: "/company-logos/fpt.png",
    title: "Senior React Developer",
    salary: "$2,500 - $3,500",
    location: "Hà Nội",
    time: "1 ngày trước",
    skills: ["React", "TypeScript", "NodeJS"],
    experience: "3-5 năm",
    level: "Senior",
    contractType: "Toàn thời gian",
    interviewProcess: ["Phỏng vấn qua điện thoại", "Phỏng vấn kỹ thuật", "Đề xuất hợp đồng"],
    responsibilities: [
      "Phát triển và duy trì các ứng dụng web sử dụng React, Redux, và TypeScript",
      "Cộng tác với nhóm backend để tích hợp API và tối ưu hóa hiệu suất",
      "Thiết kế và triển khai các giải pháp kỹ thuật phù hợp với yêu cầu kinh doanh",
      "Phát triển và duy trì kiến trúc frontend, đảm bảo khả năng mở rộng và bảo trì",
      "Làm việc trong môi trường Agile/Scrum",
    ],
    basicRequirements: [
      "3-5 năm kinh nghiệm làm việc với React và các công nghệ frontend hiện đại",
      "Thành thạo JavaScript/TypeScript, HTML5, CSS3",
      "Hiểu biết sâu về React Hooks, Redux, và quản lý state",
      "Kinh nghiệm làm việc với RESTful APIs và GraphQL",
      "Hiểu biết về tối ưu hóa hiệu suất web và các phương pháp tốt nhất",
    ],
    preferredSkills: [
      "Kinh nghiệm với Next.js, Gatsby hoặc các framework React khác",
      "Hiểu biết về testing với Jest, React Testing Library, và Cypress",
      "Kinh nghiệm với CI/CD pipelines",
      "Kinh nghiệm với các thư viện UI như Material-UI, Ant Design, hoặc Tailwind CSS",
      "Khả năng giao tiếp tiếng Anh tốt",
    ],
    benefits: [
      "Mức lương cạnh tranh và xét thưởng hiệu suất hàng năm",
      "Bảo hiểm sức khỏe toàn diện cho nhân viên và người thân",
      "Lịch làm việc linh hoạt và chính sách làm việc từ xa",
      "Môi trường làm việc quốc tế, năng động",
      "Đào tạo và phát triển nghề nghiệp liên tục",
      "Các hoạt động team building và sự kiện công ty thường xuyên",
    ],
    companyDescription:
      "FPT Software là công ty công nghệ thông tin hàng đầu tại Việt Nam, chuyên cung cấp các dịch vụ và giải pháp phần mềm cho khách hàng toàn cầu.",
  },
  // Thêm dữ liệu mẫu khác
  {
    id: 2,
    company: "VNG Corporation",
    logo: "/company-logos/vng.png",
    title: "DevOps Engineer",
    salary: "$2,000 - $3,000",
    location: "TP. Hồ Chí Minh",
    time: "2 ngày trước",
    skills: ["Docker", "Kubernetes", "AWS"],
    experience: "2-4 năm",
    level: "Middle",
    contractType: "Toàn thời gian",
    interviewProcess: ["Phỏng vấn qua điện thoại", "Phỏng vấn kỹ thuật", "Đề xuất hợp đồng"],
    responsibilities: [
      "Thiết kế và triển khai các giải pháp CI/CD",
      "Quản lý và tối ưu hóa hệ thống trên AWS và Kubernetes",
      "Tự động hóa quy trình phát triển phần mềm",
      "Giám sát và đảm bảo tính khả dụng của hệ thống",
      "Xây dựng các công cụ nội bộ để cải thiện quy trình phát triển",
    ],
    basicRequirements: [
      "2-4 năm kinh nghiệm với DevOps và Cloud Infrastructure",
      "Kinh nghiệm với Docker, Kubernetes, và container orchestration",
      "Thành thạo AWS và các dịch vụ cloud khác",
      "Kinh nghiệm với các công cụ CI/CD như Jenkins, GitLab CI, GitHub Actions",
      "Kiến thức vững về networking, bảo mật, và monitoring",
    ],
    preferredSkills: [
      "Chứng chỉ AWS, Google Cloud, hoặc Azure",
      "Kinh nghiệm với IaC sử dụng Terraform hoặc CloudFormation",
      "Kinh nghiệm với ELK stack hoặc các giải pháp logging/monitoring khác",
      "Kiến thức về microservices và kiến trúc cloud-native",
      "Kỹ năng scripting với Python, Bash, hoặc Go",
    ],
    benefits: [
      "Môi trường làm việc hiện đại và năng động",
      "Cơ hội học hỏi và phát triển trong lĩnh vực công nghệ mới nhất",
      "Lương thưởng hấp dẫn và đánh giá hiệu suất định kỳ",
      "Bảo hiểm sức khỏe và các phúc lợi khác",
      "Các hoạt động đội nhóm và sự kiện công ty hàng quý",
      "Lịch làm việc linh hoạt và chế độ làm việc từ xa",
    ],
    companyDescription:
      "VNG là một trong những công ty internet và công nghệ hàng đầu Việt Nam, sở hữu hệ sinh thái các sản phẩm công nghệ và dịch vụ số với hàng triệu người dùng.",
  },
];

// Mẫu dữ liệu công việc mới nhất
const latestJobs = [
  {
    id: 3,
    company: "Shopee",
    logo: "/company-logos/shopee.png",
    title: "Frontend Developer",
    salary: "$1,800 - $2,500",
    location: "TP. Hồ Chí Minh",
    time: "3 ngày trước",
    skills: ["JavaScript", "React", "CSS"],
  },
  {
    id: 4,
    company: "Tiki",
    logo: "/company-logos/tiki.png",
    title: "Product Manager",
    salary: "$2,000 - $3,000",
    location: "TP. Hồ Chí Minh",
    time: "4 ngày trước",
    skills: ["Agile", "Scrum", "Product Development"],
  },
  {
    id: 5,
    company: "Momo",
    logo: "/company-logos/momo.png",
    title: "Backend Engineer",
    salary: "$2,200 - $3,200",
    location: "TP. Hồ Chí Minh",
    time: "2 ngày trước",
    skills: ["Java", "Spring Boot", "Microservices"],
  },
  {
    id: 6,
    company: "VNPAY",
    logo: "/company-logos/vnpay.png",
    title: "Data Engineer",
    salary: "$2,000 - $2,800",
    location: "Hà Nội",
    time: "3 ngày trước",
    skills: ["Python", "SQL", "Data Pipeline"],
  },
];

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Sau này sẽ thay bằng API call thực tế
    const jobDetail = jobsData.find((job) => job.id === Number(id));
    setJob(jobDetail);

    // Cập nhật tiêu đề trang và meta tags - React 19 approach
    if (jobDetail) {
      document.title = `${jobDetail.title} - ${jobDetail.company} | HiRise`;

      // Sử dụng metadata từ file riêng trong trường hợp không có dữ liệu chi tiết
      const metaDescriptionContent = `Ứng tuyển vị trí ${jobDetail.title} tại ${jobDetail.company}. ${jobDetail.basicRequirements[0]}`;

      // Tạo meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          metaDescriptionContent || jobDetailMetadata.description,
        );
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.setAttribute("name", "description");
        newMetaDescription.setAttribute(
          "content",
          metaDescriptionContent || jobDetailMetadata.description,
        );
        document.head.appendChild(newMetaDescription);
      }

      // Tạo meta OG title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", `${jobDetail.title} - ${jobDetail.company} | HiRise`);
      } else {
        const newOgTitle = document.createElement("meta");
        newOgTitle.setAttribute("property", "og:title");
        newOgTitle.setAttribute("content", `${jobDetail.title} - ${jobDetail.company} | HiRise`);
        document.head.appendChild(newOgTitle);
      }

      // Tạo meta OG description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          `Ứng tuyển vị trí ${jobDetail.title} tại ${jobDetail.company}. Mức lương: ${jobDetail.salary}`,
        );
      } else {
        const newOgDescription = document.createElement("meta");
        newOgDescription.setAttribute("property", "og:description");
        newOgDescription.setAttribute(
          "content",
          `Ứng tuyển vị trí ${jobDetail.title} tại ${jobDetail.company}. Mức lương: ${jobDetail.salary}`,
        );
        document.head.appendChild(newOgDescription);
      }
    }

    // Cuộn lên đầu trang
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  const handleSaveJob = () => {
    setSaved(!saved);
    // Thêm logic lưu công việc vào API sau này
  };

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        {/* 1. Header - Thông tin cơ bản công việc */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-md lg:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Logo và thông tin công ty */}
            <div className="md:col-span-2">
              <div className="mb-6 flex items-start gap-4">
                <Link
                  to={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="group-hover:border-primary h-20 w-20 rounded-lg border border-gray-200 object-contain p-2 transition-all"
                    width="80"
                    height="80"
                  />
                </Link>
                <div>
                  <Link
                    to={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-primary text-lg font-medium hover:underline"
                  >
                    {job.company}
                  </Link>
                  <h1 className="mt-1 text-3xl font-bold">{job.title}</h1>
                  <div className="bg-primary/10 text-primary mt-2 inline-block rounded-md px-4 py-2 text-lg font-semibold">
                    {job.salary}
                  </div>
                </div>
              </div>

              {/* Thông tin cơ bản dạng form/item */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Years of experience</p>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Job level</p>
                    <p className="font-medium">{job.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Contract type</p>
                    <p className="font-medium">{job.contractType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-medium">{job.time}</p>
                  </div>
                </div>
              </div>

              {/* Quy trình phỏng vấn */}
              <div className="mt-6">
                <p className="mb-3 font-medium text-gray-700">Interview process</p>
                <div className="flex flex-wrap items-center">
                  {job.interviewProcess.map((step: string, index: number) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-1">
                        {index === 0 && <Phone className="h-4 w-4 text-gray-500" />}
                        {index === 1 && <Video className="h-4 w-4 text-gray-500" />}
                        {index === 2 && <CheckCircle className="h-4 w-4 text-gray-500" />}
                        <span className="text-sm">{step}</span>
                      </div>
                      {index < job.interviewProcess.length - 1 && (
                        <span className="mx-2 text-gray-300">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-start justify-center space-y-4 md:items-end">
              <Button size="lg" className="w-full md:w-auto">
                Ứng tuyển ngay
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto"
                onClick={handleSaveJob}
              >
                {saved ? (
                  <span className="flex items-center gap-2">
                    <Heart className="fill-primary text-primary h-5 w-5" />
                    Đã lưu
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Lưu
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 2. Chi tiết công việc */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
              <h2 className="mb-6 text-2xl font-bold">Job Description</h2>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <span className="text-primary inline-block">📌</span> Responsibilities
                </h3>
                <ul className="ml-6 list-disc space-y-2">
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <span className="text-primary inline-block">📌</span> Requirements
                </h3>

                <h4 className="mb-2 font-medium">Basic Requirements (Yêu cầu cơ bản):</h4>
                <ul className="mb-6 ml-6 list-disc space-y-2">
                  {job.basicRequirements.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>

                <h4 className="mb-2 font-medium">
                  Nice to have / Preferred Skills (Ưu tiên nhưng không bắt buộc):
                </h4>
                <ul className="ml-6 list-disc space-y-2">
                  {job.preferredSkills.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <span className="text-primary inline-block">📌</span> Benefits
                </h3>
                <ul className="ml-6 list-disc space-y-2">
                  {job.benefits.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Công ty & Nút CTA */}
          <div className="lg:col-span-1">
            <div className="mb-8 rounded-xl bg-white p-6 shadow-md lg:p-8">
              <div className="mb-6">
                <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                  <Building className="text-primary h-5 w-5" />
                  Về công ty
                </h3>
                <p className="text-gray-700">{job.companyDescription}</p>
                <Link
                  to={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary mt-3 inline-block hover:underline"
                >
                  Xem chi tiết công ty
                </Link>
              </div>

              <div className="space-y-4">
                <Button className="w-full text-lg" size="lg">
                  Ứng tuyển ngay
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSaveJob}>
                  {saved ? (
                    <span className="flex items-center justify-center gap-2">
                      <Heart className="fill-primary text-primary h-5 w-5" />
                      Đã lưu
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Heart className="h-5 w-5" />
                      Lưu
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md lg:p-8">
              <h3 className="mb-3 text-xl font-semibold">Kỹ năng</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Carousel: Công việc mới nhất */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Việc làm mới nhất</h2>
          <JobCarousel jobs={latestJobs} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
