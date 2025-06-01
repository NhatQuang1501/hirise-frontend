export const ROUTES = {
  // Authentication routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verify-otp",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Public routes
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    CAREERADVICE: "/career-advice",
    SALARY: "/salary",
    JOBS: {
      LIST: "/jobs",
      SEARCH: (query: string) => `/jobs?q=${encodeURIComponent(query)}`,
      DETAIL: "/jobs/:id",
    },
    COMPANIES: {
      LIST: "/companies",
      DETAIL: "/companies/:id",
      JOBS: "/companies/:id/jobs",
    },
  },

  // Applicant routes
  APPLICANT: {
    DASHBOARD: "/applicant/dashboard",
    PROFILE: "/applicant/profile",
    APPLIED_JOBS: "/applicant/applied-jobs",
    SAVED_JOBS: "/applicant/saved-jobs",
    FOLLOWING_COMPANIES: "/applicant/following-companies",
    JOB_MANAGEMENT: "/applicant/job-management",
  },

  // company routes
  COMPANY: {
    DASHBOARD: "/company/dashboard",
    PROFILE: "/company/profile",
    JOBS: {
      LIST: "/company/jobs",
      CREATE: "/company/jobs/create",
      DETAIL: "/company/jobs/:id",
      EDIT: "/company/jobs/:id/edit",
    },
    APPLICATIONS: "/company/applications",
    COMPANY_PROFILE: "/company/company",
  },
};
