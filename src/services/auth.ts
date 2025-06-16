// src/services/auth.ts
import api from "@/config/api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: "applicant" | "company";
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/auth/login/", credentials);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register/", data);
    return response.data;
  },

  verifyOTP: async (email: string, otp: string) => {
    const response = await api.post("/auth/verify-otp/", { email, otp });
    return response.data;
  },

  resendOTP: async (email: string) => {
    const response = await api.post("/auth/resend-otp/", { email });
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout/", { refresh: refreshToken });
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
};

export const getAccessToken = () => localStorage.getItem("accessToken");
