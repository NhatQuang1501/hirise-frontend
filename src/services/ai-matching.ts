import { axiosInstance } from "@/lib/axios";

export interface MatchingResult {
  id: string;
  job: string;
  job_title: string;
  application: string;
  applicant_name: string;
  match_score: number;
  match_percentage: number;
  detail_scores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  explanation: {
    overall: string;
    top_strengths: string[];
    key_gaps: string[];
    note: string;
  };
  created_at: string;
  updated_at: string;
}

export interface MatchResponse {
  detail: string;
  match_data: MatchingResult;
}

export const aiMatchingService = {
  // Lấy kết quả đánh giá của job với tất cả CV
  getJobMatchResults: async (jobId: string): Promise<MatchingResult[]> => {
    try {
      const response = await axiosInstance.get(`/api/match/job/${jobId}/results/`);
      console.log("API response:", response.data);

      // Kiểm tra cấu trúc response và trả về mảng kết quả
      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        return response.data.results;
      } else if (Array.isArray(response.data)) {
        return response.data;
      }

      // Trả về mảng rỗng nếu không có dữ liệu hợp lệ
      console.warn("API response format is not as expected:", response.data);
      return [];
    } catch (error) {
      console.error("Error getting job match results:", error);
      return [];
    }
  },

  // Đánh giá job với một CV cụ thể
  matchSingleApplication: async (
    jobId: string,
    applicationId: string,
  ): Promise<MatchingResult | null> => {
    try {
      const response = await axiosInstance.post<MatchResponse>(
        `/api/match/job/${jobId}/application/${applicationId}/`,
      );
      return response.data.match_data;
    } catch (error) {
      console.error("Error matching single application:", error);
      return null;
    }
  },

  // Đánh giá job với tất cả CV
  matchAllApplications: async (jobId: string): Promise<any> => {
    try {
      const response = await axiosInstance.post(`/api/match/job/${jobId}/all-applications/`);

      // Trả về toàn bộ response để frontend có thể truy cập các trường khác
      return {
        message: response.data.detail,
        status: response.data.status,
        total_applications: response.data.total_applications,
        processed_applications: response.data.processed_applications,
        results: Array.isArray(response.data.results) ? response.data.results : [],
      };
    } catch (error) {
      console.error("Error analyzing all applications:", error);
      throw error;
    }
  },
};
