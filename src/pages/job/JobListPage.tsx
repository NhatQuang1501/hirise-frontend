import React, { useEffect, useState } from "react";
import { JobCardData } from "@/types/job";
import FeaturedJobs from "@/components/job/FeaturedJobs";
import JobListView from "@/components/job/JobListView";
import AdvancedFilters from "@/components/search/AdvancedFilters";
import SearchBar from "@/components/search/SearchBar";
import { jobListMetadata } from "./joblMetadata";

// Định nghĩa kiểu cho salaryRange
type SalaryRangeKey = "500-1000" | "1000-2000" | "2000-3000" | "3000+";

// Định nghĩa kiểu cho bộ lọc
interface FilterType {
  jobCategory: string[];
  location: string[];
  salaryRange: string;
  jobLevel: string[];
  contractType: string[];
  experience: string;
  postDate: string;
}

// Dữ liệu mẫu cho trang
const sampleJobs: JobCardData[] = [
  {
    id: 1,
    company: "FPT Software",
    logo: "/company-logos/fpt.png",
    title: "Senior React Developer",
    salary: "25.000.000 - 35.000.000",
    location: "Hanoi",
    time: "1 day ago",
    skills: ["React", "TypeScript", "NodeJS"],
  },
  {
    id: 2,
    company: "VNG Corporation",
    logo: "/company-logos/vng.png",
    title: "DevOps Engineer",
    salary: "20.000.000 - 30.000.000",
    location: "HCM",
    time: "2 days ago",
    skills: ["Docker", "Kubernetes", "AWS"],
  },
  {
    id: 3,
    company: "Shopee",
    logo: "/company-logos/shopee.png",
    title: "Frontend Developer",
    salary: "18.000.000 - 25.000.000",
    location: "HCM",
    time: "3 days ago",
    skills: ["JavaScript", "React", "CSS"],
  },
  {
    id: 4,
    company: "Tiki",
    logo: "/company-logos/tiki.png",
    title: "Product Manager",
    salary: "20.000.000 - 30.000.000",
    location: "HCM",
    time: "4 days ago",
    skills: ["Agile", "Scrum", "Product Development"],
  },
  {
    id: 5,
    company: "Momo",
    logo: "/company-logos/momo.png",
    title: "Backend Engineer",
    salary: "22.000.000 - 32.000.000",
    location: "HCM",
    time: "2 days ago",
    skills: ["Java", "Spring Boot", "Microservices"],
  },
  {
    id: 6,
    company: "VNPAY",
    logo: "/company-logos/vnpay.png",
    title: "Data Engineer",
    salary: "20.000.000 - 28.000.000",
    location: "Hanoi",
    time: "3 days ago",
    skills: ["Python", "SQL", "Data Pipeline"],
  },
  {
    id: 7,
    company: "Microsoft",
    logo: "/company-logos/microsoft.png",
    title: "Software Engineer",
    salary: "30.000.000 - 45.000.000",
    location: "HCM",
    time: "1 week ago",
    skills: ["C#", ".NET", "Azure"],
  },
  {
    id: 8,
    company: "Amazon",
    logo: "/company-logos/amazon.png",
    title: "Data Scientist",
    salary: "35.000.000 - 50.000.000",
    location: "Remote",
    time: "5 days ago",
    skills: ["Python", "Machine Learning", "AWS"],
  },
  {
    id: 9,
    company: "Google",
    logo: "/company-logos/google.png",
    title: "UX/UI Designer",
    salary: "28.000.000 - 40.000.000",
    location: "HCM",
    time: "2 weeks ago",
    skills: ["Figma", "Adobe XD", "User Research"],
  },
  {
    id: 10,
    company: "Grab",
    logo: "/company-logos/grab.png",
    title: "Mobile Developer",
    salary: "25.000.000 - 38.000.000",
    location: "Hanoi",
    time: "6 days ago",
    skills: ["Flutter", "React Native", "iOS/Android"],
  },
  {
    id: 11,
    company: "Agoda",
    logo: "/company-logos/agoda.png",
    title: "QA Engineer",
    salary: "18.000.000 - 28.000.000",
    location: "HCM",
    time: "1 week ago",
    skills: ["Selenium", "TestNG", "Automation"],
  },
  {
    id: 12,
    company: "Netflix",
    logo: "/company-logos/netflix.png",
    title: "Backend Developer",
    salary: "32.000.000 - 46.000.000",
    location: "Remote",
    time: "3 days ago",
    skills: ["Java", "Spring Boot", "Microservices"],
  },
];

// Dữ liệu mẫu cho các mục nổi bật
const featuredJobs = sampleJobs.slice(0, 4);
const mostAppliedJobs = sampleJobs.slice(4, 8);
const recentlyViewedJobs = sampleJobs.slice(2, 6);
const recommendedJobs = sampleJobs.slice(6, 10);

const JobListPage: React.FC = () => {
  const [filteredJobs, setFilteredJobs] = useState<JobCardData[]>(sampleJobs);
  const [keyword, setKeyword] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<FilterType>({
    jobCategory: [],
    location: [],
    salaryRange: "",
    jobLevel: [],
    contractType: [],
    experience: "",
    postDate: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Xử lý tìm kiếm
  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    applyFilters(searchKeyword, activeFilters);
  };

  // Xử lý bộ lọc
  const handleFilterChange = (filters: FilterType) => {
    setActiveFilters(filters);
    applyFilters(keyword, filters);
  };

  // Kiểm tra xem có bộ lọc nào được áp dụng không
  const hasActiveFilters = (filters: FilterType): boolean => {
    return (
      filters.jobCategory.length > 0 ||
      filters.location.length > 0 ||
      filters.jobLevel.length > 0 ||
      filters.contractType.length > 0 ||
      !!filters.salaryRange ||
      !!filters.experience ||
      !!filters.postDate
    );
  };

  // Áp dụng bộ lọc và tìm kiếm
  const applyFilters = (searchKeyword: string, filters: FilterType) => {
    setIsLoading(true);

    // Nếu không có bộ lọc nào được chọn và không có từ khóa tìm kiếm, trả về tất cả công việc
    if (!hasActiveFilters(filters) && !searchKeyword) {
      setTimeout(() => {
        setFilteredJobs(sampleJobs);
        setIsLoading(false);
      }, 300);
      return;
    }

    // Mô phỏng thời gian tải
    setTimeout(() => {
      let results = [...sampleJobs];

      // Lọc theo từ khóa tìm kiếm
      if (searchKeyword) {
        results = results.filter(
          (job) =>
            job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            job.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            job.skills.some((skill) => skill.toLowerCase().includes(searchKeyword.toLowerCase())),
        );
      }

      // Lọc theo địa điểm
      if (filters.location && filters.location.length > 0) {
        results = results.filter((job) => {
          return filters.location.some((loc) =>
            job.location.toLowerCase().includes(loc.toLowerCase()),
          );
        });
      }

      // Lọc theo ngành nghề
      if (filters.jobCategory && filters.jobCategory.length > 0) {
        results = results.filter((job) => {
          // Ví dụ: lọc theo title của công việc
          return filters.jobCategory.some(
            (category) =>
              job.title.toLowerCase().includes(category.toLowerCase()) ||
              job.skills.some((skill) => skill.toLowerCase().includes(category.toLowerCase())),
          );
        });
      }

      // Lọc theo cấp bậc
      if (filters.jobLevel && filters.jobLevel.length > 0) {
        results = results.filter((job) => {
          // Giả định: cấp bậc nằm trong tiêu đề
          return filters.jobLevel.some((level) =>
            job.title.toLowerCase().includes(level.toLowerCase()),
          );
        });
      }

      // Lọc theo loại hợp đồng
      if (filters.contractType && filters.contractType.length > 0) {
        // Giả định: không có thông tin này trong dữ liệu mẫu
        // Có thể bỏ qua hoặc mô phỏng
      }

      // Lọc theo mức lương
      if (filters.salaryRange) {
        const salaryRanges: Record<SalaryRangeKey, [number, number]> = {
          "500-1000": [5000000, 10000000],
          "1000-2000": [10000000, 20000000],
          "2000-3000": [20000000, 30000000],
          "3000+": [30000000, Infinity],
        };

        if (filters.salaryRange in salaryRanges) {
          const [min, max] = salaryRanges[filters.salaryRange as SalaryRangeKey];
          results = results.filter((job) => {
            // Tách số từ chuỗi lương và lấy giá trị đầu tiên
            const salaryParts = job.salary.split(/[^0-9.]/);
            const firstNumber = parseFloat(salaryParts.find((part) => part.trim() !== "") || "0");
            const jobSalary = firstNumber * 1000000; // Giả sử đơn vị là triệu
            return jobSalary >= min && (max === Infinity || jobSalary <= max);
          });
        }
      }

      // Lọc theo kinh nghiệm
      if (filters.experience) {
        // Giả định: kinh nghiệm có thể được xác định từ cấp bậc
        const experienceMap: Record<string, string[]> = {
          "0-1": ["Intern", "Fresher"],
          "1-3": ["Junior"],
          "3-5": ["Middle", "Senior"],
          "5+": ["Lead", "Manager", "Chief"],
        };

        if (filters.experience in experienceMap) {
          const levels = experienceMap[filters.experience];
          results = results.filter((job) =>
            levels.some((level) => job.title.toLowerCase().includes(level.toLowerCase())),
          );
        }
      }

      // Lọc theo ngày đăng
      if (filters.postDate) {
        // Giả định: lọc theo field time
        const now = new Date();
        let daysAgo = 0;

        switch (filters.postDate) {
          case "today":
            daysAgo = 1;
            break;
          case "week":
            daysAgo = 7;
            break;
          case "month":
            daysAgo = 30;
            break;
          default:
            daysAgo = 0; // "any" hoặc khác
        }

        if (daysAgo > 0) {
          results = results.filter((job) => {
            // Lọc đơn giản dựa trên chuỗi time
            if (job.time.includes("day")) {
              const days = parseInt(job.time.split(" ")[0]);
              return days <= daysAgo;
            } else if (job.time.includes("week") && daysAgo >= 7) {
              const weeks = parseInt(job.time.split(" ")[0]);
              return weeks * 7 <= daysAgo;
            }
            return daysAgo >= 30; // Nếu là "months" trở lên, chỉ phù hợp khi lọc theo month
          });
        }
      }

      setFilteredJobs(results);
      setIsLoading(false);
    }, 300); // Giảm thời gian load xuống
  };

  // Khi component mount
  useEffect(() => {
    // Cuộn lên đầu trang
    window.scrollTo(0, 0);

    // Cập nhật tiêu đề trang và metadata
    document.title = jobListMetadata.title;

    // Cập nhật meta description
    updateMetaTag("name", "description", jobListMetadata.description);

    // Cập nhật meta keywords
    updateMetaTag("name", "keywords", jobListMetadata.keywords);

    // Cập nhật OpenGraph tags
    updateMetaTag("property", "og:title", jobListMetadata.openGraph.title);
    updateMetaTag("property", "og:description", jobListMetadata.openGraph.description);
    updateMetaTag("property", "og:image", jobListMetadata.openGraph.image);
    updateMetaTag("property", "og:url", jobListMetadata.openGraph.url);
    updateMetaTag("property", "og:type", jobListMetadata.openGraph.type);

    // Cập nhật canonical link
    updateCanonicalLink(jobListMetadata.canonical);
  }, []);

  // Helper function để cập nhật meta tags
  const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    let metaTag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (metaTag) {
      metaTag.setAttribute("content", content);
    } else {
      metaTag = document.createElement("meta");
      metaTag.setAttribute(attributeName, attributeValue);
      metaTag.setAttribute("content", content);
      document.head.appendChild(metaTag);
    }
  };

  // Helper function để cập nhật canonical link
  const updateCanonicalLink = (href: string) => {
    let linkTag = document.querySelector('link[rel="canonical"]');
    if (linkTag) {
      linkTag.setAttribute("href", href);
    } else {
      linkTag = document.createElement("link");
      linkTag.setAttribute("rel", "canonical");
      linkTag.setAttribute("href", href);
      document.head.appendChild(linkTag);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section */}
      <section className="from-primary/10 to-primary-foreground/5 bg-gradient-to-r py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold">Tìm công việc mơ ước của bạn</h1>
            <p className="text-muted-foreground mb-8 text-xl">
              Khám phá hàng nghìn cơ hội việc làm từ các công ty công nghệ hàng đầu
            </p>
          </div>

          {/* Thanh tìm kiếm */}
          <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>
      </section>

      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar với bộ lọc */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AdvancedFilters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Danh sách việc làm */}
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                <span className="ml-2">Đang tải...</span>
              </div>
            ) : (
              <>
                {filteredJobs.length > 0 ? (
                  <JobListView jobs={filteredJobs} />
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-xl font-semibold">Không tìm thấy công việc phù hợp</h3>
                    <p className="text-muted-foreground">
                      Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Các mục nổi bật */}
            <div className="mt-16">
              <FeaturedJobs
                featuredJobs={featuredJobs}
                mostAppliedJobs={mostAppliedJobs}
                recentlyViewedJobs={recentlyViewedJobs}
                recommendedJobs={recommendedJobs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
