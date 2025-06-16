import api from "@/config/api";

export interface ApplicationFilter {
  status?: string;
  job?: string;
  created_at_after?: string;
  created_at_before?: string;
  match_score_min?: number;
  match_score_max?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface ApplicantProfile {
  id: string;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  description: string;
}

export interface JobDetails {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
}

export interface Application {
  id: string;
  cv_file: string;
  cv_filename: string;
  status: string;
  status_display: string;
  created_at: string;
  updated_at?: string;
  applicant_profile: ApplicantProfile;
  job_details: JobDetails;
  company_id: string;
  company_name: string;
  company_logo?: string;
  match_score?: number | null;
  job_id?: string;
  job_title?: string;
}

export interface ApplicationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  total_pages: number;
  data: Application[];
}

export const applicationService = {
  // Lấy danh sách application của applicant đang đăng nhập
  getMyApplications: async (filters?: ApplicationFilter) => {
    const response = await api.get("/applications/", { params: filters });
    return response.data as ApplicationResponse;
  },

  // Lấy danh sách application của một job cụ thể (cho company)
  getJobApplications: async (jobId: string, filters?: ApplicationFilter) => {
    const params = { job_id: jobId, ...filters };
    const response = await api.get("/applications/", { params });
    return response.data as ApplicationResponse;
  },

  // Xem chi tiết một application
  getApplicationById: async (id: string) => {
    const response = await api.get(`/applications/${id}/`);
    return response.data as Application;
  },

  // Phân tích CV của application
  analyzeCV: async (id: string) => {
    const response = await api.post(`/applications/${id}/analyze/`);
    return response.data;
  },

  // Chấp nhận application
  acceptApplication: async (id: string) => {
    const response = await api.post(`/applications/${id}/accept/`);
    return response.data;
  },

  // Từ chối application
  rejectApplication: async (id: string) => {
    const response = await api.post(`/applications/${id}/reject/`);
    return response.data;
  },

  // Rút lại application (cho applicant)
  withdrawApplication: async (id: string) => {
    const response = await api.delete(`/applications/${id}/`);
    return response.data;
  },

  // Thêm hàm apply job vào applicationService
  applyForJob: async (jobId: string, cvFile: File) => {
    const formData = new FormData();
    formData.append("job_id", jobId);
    formData.append("cv_file", cvFile);

    const response = await api.post("/applications/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as Application;
  },

  // Thêm hàm này vào applicationService
  checkJobApplication: async (jobId: string) => {
    try {
      const response = await api.get("/applications/", {
        params: { job: jobId },
      });
      const data = response.data as ApplicationResponse;
      // Nếu có ít nhất một application cho job này, trả về application đầu tiên
      return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error("Error checking job application:", error);
      return null;
    }
  },
};

export default applicationService;
