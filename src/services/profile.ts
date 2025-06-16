import { axiosInstance } from "@/lib/axios";

export const profileService = {
  async getMyProfile(userId?: string, role?: string) {
    if (!userId || !role) throw new Error("User ID and role are required");

    try {
      if (role === "applicant") {
        const response = await axiosInstance.get(`/api/applicants/${userId}/`);
        return response.data;
      } else if (role === "company") {
        const response = await axiosInstance.get(`/api/companies/${userId}/`);
        return response.data;
      }
      throw new Error("Invalid role");
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  async updateProfile(userId?: string, role?: string, data?: any) {
    if (!userId || !role) throw new Error("User ID and role are required");

    try {
      if (role === "applicant") {
        const response = await axiosInstance.put(`/api/applicants/${userId}/`, data);
        return response.data;
      } else if (role === "company") {
        const response = await axiosInstance.put(`/api/companies/${userId}/`, data);
        return response.data;
      }
      throw new Error("Invalid role");
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // Thêm hàm mới để xử lý cập nhật profile với file logo
  async updateProfileWithLogo(userId?: string, role?: string, formData?: FormData) {
    if (!userId || !role) throw new Error("User ID and role are required");

    try {
      if (role === "company") {
        // In ra dữ liệu để debug
        for (const pair of formData?.entries() || []) {
          console.log(pair[0], pair[1]);
        }

        const response = await axiosInstance.put(`/api/companies/${userId}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } else if (role === "applicant") {
        const response = await axiosInstance.put(`/api/applicants/${userId}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      }
      throw new Error("Invalid role");
    } catch (error: any) {
      console.error("Error updating profile with file:", error);
      // Log chi tiết lỗi từ API
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      throw error;
    }
  },
};
