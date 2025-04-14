export const ROUTES = {
  // Authentication routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
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
    APPLICATIONS: "/applicant/applications",
    SAVED_JOBS: "/applicant/saved-jobs",
  },

  // Recruiter routes
  RECRUITER: {
    DASHBOARD: "/recruiter/dashboard",
    JOBS: {
      LIST: "/recruiter/jobs",
      CREATE: "/recruiter/jobs/create",
      DETAIL: "/recruiter/jobs/:id",
      EDIT: "/recruiter/jobs/:id/edit",
    },
    APPLICATIONS: "/recruiter/applications",
    COMPANY_PROFILE: "/recruiter/company",
  },
};
