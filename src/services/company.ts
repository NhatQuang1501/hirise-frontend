import { ApiCompany, ApiResponse, Company } from "@/types/company";
import api from "@/config/api";

export interface CompanyFilter {
  page?: number;
  page_size?: number;
  search?: string;
  industry?: string;
  location?: string;
  ordering?: string;
}

export interface CompanyFollower {
  id: string;
  applicant_id: string;
  applicant_name: string;
  company_id: string;
  company_name: string;
  company_logo: string | null;
  created_at: string;
}

export interface CompanyFollowerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  total_pages: number;
  data: CompanyFollower[];
}

export interface FollowStatusResponse {
  is_following: boolean;
}

// Function to convert API data to UI format
const mapApiCompanyToCompany = (apiCompany: ApiCompany): Company => {
  return {
    id: apiCompany.id,
    name: apiCompany.profile.name || apiCompany.username,
    logo: apiCompany.profile.logo || "/company-logos/default-logo.png",
    industry: apiCompany.profile.industry_names?.[0] || "",
    location: apiCompany.profile.location_names?.[0] || "Multiple locations",
    jobCount: 0, // Will be updated from statistics if available
    followerCount: apiCompany.profile.follower_count || 0, // Lấy follower_count từ API
    isFollowing: false, // Need API to check if user is following company
    newJobsToday: 0, // Will be updated from statistics if available
    description: apiCompany.profile.description || "",
    website: apiCompany.profile.website || "",
    foundedYear: apiCompany.profile.founded_year,
    industries: apiCompany.profile.industry_names || [],
    locations: apiCompany.profile.location_names || [],
    skills: apiCompany.profile.skill_names || [],
  };
};

export const companyService = {
  getCompanies: async (filters: CompanyFilter = {}) => {
    try {
      const response = await api.get("/companies/", { params: filters });
      // Extract companies from the response
      const companies = response.data.data || response.data;

      return {
        count: response.data.count || companies.length,
        next: response.data.next || null,
        previous: response.data.previous || null,
        current_page: response.data.current_page || 1,
        total_pages: response.data.total_pages || 1,
        data: Array.isArray(companies) ? companies.map(mapApiCompanyToCompany) : [],
      };
    } catch (error) {
      console.error("Error fetching companies:", error);
      return {
        count: 0,
        next: null,
        previous: null,
        current_page: 1,
        total_pages: 1,
        data: [],
      };
    }
  },

  getPopularCompanies: async (filters: CompanyFilter = {}) => {
    try {
      // Try to use the regular company endpoint with ordering
      const response = await companyService.getCompanies({
        ...filters,
        ordering: "-follower_count", // Sort by follower count
      });
      return response;
    } catch (error) {
      console.error("Error fetching popular companies:", error);
      return {
        count: 0,
        next: null,
        previous: null,
        current_page: 1,
        total_pages: 1,
        data: [],
      };
    }
  },

  getCompanyById: async (id: string) => {
    try {
      const response = await api.get(`/companies/${id}/`);
      const apiCompany = response.data;
      return mapApiCompanyToCompany(apiCompany);
    } catch (error) {
      console.error(`Error fetching company ${id}:`, error);
      throw error;
    }
  },

  // Updated follow company method to use the new endpoint
  followCompany: async (companyId: string) => {
    try {
      const response = await api.post(`/companies/${companyId}/follow/`);
      return response.data;
    } catch (error) {
      console.error(`Error following company ${companyId}:`, error);
      throw error;
    }
  },

  // Updated unfollow company method to use the new endpoint
  unfollowCompany: async (companyId: string) => {
    try {
      const response = await api.delete(`/companies/${companyId}/follow/`);
      return response.data;
    } catch (error: any) {
      // Nếu lỗi là 404, có thể công ty đã được unfollow hoặc chưa từng được follow
      // Trong trường hợp này, chúng ta trả về thành công để UI cập nhật đúng
      if (error.response && error.response.status === 404) {
        console.warn(`Company ${companyId} was not followed or already unfollowed.`);
        return { success: true };
      }
      console.error(`Error unfollowing company ${companyId}:`, error);
      throw error;
    }
  },

  // New method to check if user is following a company
  checkFollowStatus: async (companyId: string) => {
    try {
      const response = await api.get<FollowStatusResponse>(`/companies/${companyId}/check-follow/`);
      return response.data;
    } catch (error) {
      console.error(`Error checking follow status for company ${companyId}:`, error);
      return { is_following: false };
    }
  },

  // New method to get list of companies user is following
  getFollowingCompanies: async () => {
    try {
      const response = await api.get<CompanyFollowerResponse>("/following/");
      return response.data;
    } catch (error) {
      console.error("Error fetching following companies:", error);
      return {
        count: 0,
        next: null,
        previous: null,
        current_page: 1,
        total_pages: 1,
        data: [],
      };
    }
  },

  // Get all industries from jobs models
  getIndustries: async () => {
    try {
      // The actual endpoint would be different based on backend
      const response = await api.get("/jobs/industries/");
      return {
        results: response.data || [],
      };
    } catch (error) {
      console.error("Error fetching industries:", error);
      return { results: [] };
    }
  },

  // Get all locations from jobs models
  getLocations: async () => {
    try {
      // The actual endpoint would be different based on backend
      const response = await api.get("/jobs/locations/");
      return {
        results: response.data || [],
      };
    } catch (error) {
      console.error("Error fetching locations:", error);
      return { results: [] };
    }
  },

  // Get company statistics
  getCompanyStatistics: async (id: string) => {
    try {
      const response = await api.get(`/companies/${id}/statistics/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching statistics for company ${id}:`, error);
      return {
        jobCount: 0,
        followerCount: 0,
        newJobsToday: 0,
        applicationsCount: 0,
      };
    }
  },

  // Get jobs from a specific company
  // getCompanyJobs: async (id: string, filters: CompanyFilter = {}) => {
  //   try {
  //     const response = await api.get(`/companies/${id}/jobs/`, { params: filters });
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error fetching jobs for company ${id}:`, error);
  //     return {
  //       count: 0,
  //       next: null,
  //       previous: null,
  //       current_page: 1,
  //       total_pages: 1,
  //       data: [],
  //     };
  //   }
  // },
  getCompanyJobs: async (companyId: string, status: string = "all", page: number = 1) => {
    const response = await api.get(`/companies/${companyId}/jobs/`, {
      params: {
        status,
        page,
      },
    });
    return response.data;
  },

  getCompanyJobsCount: async (companyId: string) => {
    const response = await api.get(`/companies/${companyId}/jobs-count/`);
    return response.data;
  },

  // API to get trending companies (most visited or with most new jobs)
  getTrendingCompanies: async (filters: CompanyFilter = {}) => {
    try {
      const response = await api.get("/companies/trending/", { params: filters });
      const apiResponse: ApiResponse<ApiCompany> = response.data;

      return {
        ...apiResponse,
        data: apiResponse.data.map(mapApiCompanyToCompany),
      };
    } catch (error) {
      // If API is not available, fallback to regular companies
      console.error("Error fetching trending companies:", error);
      const companies = await companyService.getCompanies({
        ...filters,
        ordering: "-created_at", // Sort by most recently created
      });
      return companies;
    }
  },

  // API to search companies with more complex filtering
  searchCompanies: async (
    filters: CompanyFilter & {
      skills?: string[];
      min_job_count?: number;
      is_hiring?: boolean;
    },
  ) => {
    try {
      const response = await api.get("/companies/search/", { params: filters });
      const apiResponse: ApiResponse<ApiCompany> = response.data;

      return {
        ...apiResponse,
        data: apiResponse.data.map(mapApiCompanyToCompany),
      };
    } catch (error) {
      console.error("Error searching companies:", error);
      // Fallback to regular companies endpoint with basic filtering
      return companyService.getCompanies(filters);
    }
  },

  // API to get recommended companies based on user profile
  getRecommendedCompanies: async (filters: CompanyFilter = {}) => {
    try {
      const response = await api.get("/companies/recommended/", { params: filters });
      const apiResponse: ApiResponse<ApiCompany> = response.data;

      return {
        ...apiResponse,
        data: apiResponse.data.map(mapApiCompanyToCompany),
      };
    } catch (error) {
      console.error("Error fetching recommended companies:", error);
      return companyService.getPopularCompanies(filters);
    }
  },
};
