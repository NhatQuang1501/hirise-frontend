import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { LoginCredentials, RegisterData, authService, getAccessToken } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  updateProfile: (userId: string, data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(() => {
    // Khởi tạo giá trị ban đầu từ localStorage để tránh render lại
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  // const getAccessToken = () => localStorage.getItem("accessToken");

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          // Thiết lập người dùng từ localStorage
          setUser(JSON.parse(storedUser));

          // Tùy chọn: Xác thực token bằng cách gọi API
          // const response = await authService.validateToken();
          // setUser(response.user);
        } catch (error) {
          console.error("Failed to initialize auth:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    const { access, refresh, user } = response;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    // Điều hướng dựa trên role
    if (user.role === "applicant") {
      navigate(ROUTES.PUBLIC.HOME);
    } else if (user.role === "company") {
      navigate(ROUTES.COMPANY.JOBS.LIST);
    } else {
      // Role khác (nếu có)
      navigate(ROUTES.PUBLIC.HOME);
    }
  };

  const register = async (data: RegisterData) => {
    await authService.register(data);
    navigate(ROUTES.AUTH.VERIFY_OTP, { state: { email: data.email } });
  };

  const verifyOTP = async (email: string, otp: string) => {
    await authService.verifyOTP(email, otp);
    navigate(ROUTES.AUTH.LOGIN);
  };

  const resendOTP = async (email: string) => {
    await authService.resendOTP(email);
    toast.success("OTP has been resent to your email");
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate(ROUTES.AUTH.LOGIN);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateProfile = async (userId: string, data: any) => {
    try {
      const response = await fetch(`/api/users/companies/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      // Cập nhật user state nếu cần
      setUser((prev) => ({
        ...prev,
        profile: updatedData.profile,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };
  const isAuthenticated = !!user || !!localStorage.getItem("accessToken");

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        verifyOTP,
        resendOTP,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
