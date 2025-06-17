import { JobFormValues } from "@/types/job";
import api from "@/config/api";

export interface JobFilter {
  search?: string; // Từ khóa tìm kiếm
  status?: string; // Trạng thái: published, draft, closed
  job_type?: string; // Loại công việc: full time, part time, contract, etc.
  experience_level?: string; // Cấp độ kinh nghiệm: entry, junior, middle, senior, etc.
  city?: string; // Thành phố
  min_salary?: string; // Lương tối thiểu - Đổi tên thành min_salary_gte
  max_salary?: string; // Lương tối đa - Đổi tên thành max_salary_lte
  min_salary_gte?: string; // Thêm vào để khớp với backend
  max_salary_lte?: string; // Thêm vào để khớp với backend
  posted_date?: string; // Thời gian đăng: today, this_week, this_month, etc.
  page?: number; // Trang hiện tại
  page_size?: number; // Số lượng job mỗi trang
}

export const jobService = {
  // Lấy danh sách job
  getJobs: async (filters?: JobFilter) => {
    const response = await api.get("/jobs/", { params: filters });
    return response.data;
  },

  // Lấy job theo ID
  getJobById: async (id: string) => {
    const response = await api.get(`/jobs/${id}/`);
    return response.data;
  },

  // Lấy danh sách job của công ty hiện tại
  getMyJobs: async (filters?: JobFilter) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const companyId = user.company_id || user.id;
    const response = await api.get(`/companies/${companyId}/jobs/`, { params: filters });
    return response.data;
  },

  // Tạo job mới
  createJob: async (jobData: JobFormValues) => {
    const formattedData = formatJobData(jobData);
    const response = await api.post("/jobs/create/", formattedData);
    return response.data;
  },

  // Cập nhật job
  updateJob: async (id: string, jobData: JobFormValues) => {
    const formattedData = formatJobData(jobData);
    const response = await api.put(`/jobs/${id}/update/`, formattedData);
    return response.data;
  },

  // Cập nhật trạng thái job
  updateJobStatus: async (id: string, status: string) => {
    const response = await api.patch(`/jobs/${id}/status/`, { status });
    return response.data;
  },

  // Đóng job
  closeJob: async (id: string) => {
    const response = await api.patch(`/jobs/${id}/update/`, { status: "closed" });
    return response.data;
  },

  // publish job
  publishJob: async (id: string) => {
    const response = await api.patch(`/jobs/${id}/update/`, { status: "published" });
    return response.data;
  },

  // Xóa job
  deleteJob: async (id: string) => {
    const response = await api.delete(`/jobs/${id}/delete/`);
    return response.data;
  },

  // Lấy thống kê job
  getJobStatistics: async (id: string) => {
    const response = await api.get(`/jobs/${id}/statistics/`);
    return response.data;
  },

  // Lưu job
  saveJob: async (id: string) => {
    const response = await api.post(`/jobs/${id}/save/`);
    return response.data;
  },

  // Bỏ lưu job
  unsaveJob: async (id: string) => {
    const response = await api.delete(`/jobs/${id}/save/`);
    return response.data;
  },

  // Lấy danh sách job đã lưu
  getSavedJobs: async (filters?: JobFilter) => {
    const response = await api.get("/saved-jobs/", { params: filters });
    return response.data;
  },

  // Lấy danh sách job đã lưu của ứng viên
  getApplicantSavedJobs: async (applicantId: string, filters?: JobFilter) => {
    const response = await api.get(`/applicants/${applicantId}/saved-jobs/`, {
      params: filters,
    });
    return response.data;
  },
};

// Hàm hỗ trợ chuyển đổi dữ liệu từ form sang API format
function formatJobData(jobData: JobFormValues) {
  // Chuyển đổi status từ "Draft"/"Published"/"Closed" sang "draft"/"published"/"closed"
  const status = jobData.status?.toLowerCase();

  // Sử dụng level thay vì experience để đặt experience_level
  const experienceLevel = jobData.level?.toLowerCase();

  // Hàm loại bỏ dấu gạch đầu dòng
  const removeBulletPoints = (text: string): string => {
    if (!text) return "";
    return text
      .split("\n")
      .map((line) => line.replace(/^-\s*/, "").trim())
      .filter((line) => line.length > 0) // Loại bỏ các dòng trống
      .join("\n");
  };

  // Chuyển đổi các trường khác nếu cần
  return {
    title: jobData.title,
    description: jobData.description || "",
    city: jobData.city,
    responsibilities: removeBulletPoints(jobData.responsibilities || ""),
    requirements: removeBulletPoints(jobData.basicRequirements || ""),
    preferred_skills: removeBulletPoints(jobData.preferredSkills || ""),
    benefits: removeBulletPoints(jobData.benefits || ""),
    job_type: jobData.jobType?.toLowerCase() || "full time",
    experience_level: experienceLevel,
    min_salary: jobData.salaryMin ? parseInt(jobData.salaryMin) : null,
    max_salary: jobData.salaryMax ? parseInt(jobData.salaryMax) : null,
    currency: jobData.currency || "VND",
    is_salary_negotiable: true,
    closed_date: jobData.deadline || null,
    status, // Đảm bảo status được gửi đi
    location_names: [jobData.location],
    industry_names: [],
    skill_names: jobData.skills || [],
  };
}

export default jobService;
