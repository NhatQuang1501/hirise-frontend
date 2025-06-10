import { lazy } from "react";
import ProtectedRoute from "@/routes/protectedRoute";
import { ROUTES } from "@/routes/routes";
import { Navigate, RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const AboutPage = lazy(() => import("@/pages/static/AboutPage"));
const ContactPage = lazy(() => import("@/pages/static/ContactPage"));
const JobListPage = lazy(() => import("@/pages/job/JobListPage"));
const JobDetailPage = lazy(() => import("@/pages/job/JobDetailPage"));
const CompanyListPage = lazy(() => import("@/pages/company/CompanyListPage"));
const CompanyDetailPage = lazy(() => import("@/pages/company/CompanyDetailPage"));
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/authentication/RegisterPage"));
const OTPPage = lazy(() => import("@/pages/authentication/OTPPage"));
const ProfilePage = lazy(() => import("@/pages/user/ProfilePage"));
const JobManagementPage = lazy(() => import("@/pages/applicant/JobManagementPage"));
const CompanyRecruitmentPage = lazy(() => import("@/pages/recruitment/CompanyRecruitmentPage"));
const CompanyJobDetailPage = lazy(() => import("@/pages/recruitment/CompanyJobDetailPage"));
const CompanyJobCreatePage = lazy(() => import("@/pages/recruitment/CompanyJobCreatePage"));
const CompanyJobEditPage = lazy(() => import("@/pages/recruitment/CompanyJobEditPage"));
const ApplicantDashboardPage = lazy(() => import("@/pages/applicant/ApplicantDashboardPage"));
const JobApplicationsPage = lazy(() => import("@/pages/company/JobApplicationsPage"));

const userRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      // Public routes
      { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
      { path: ROUTES.PUBLIC.ABOUT, element: <AboutPage /> },
      { path: ROUTES.PUBLIC.CONTACT, element: <ContactPage /> },
      { path: ROUTES.PUBLIC.JOBS.LIST, element: <JobListPage /> },
      { path: ROUTES.PUBLIC.JOBS.DETAIL, element: <JobDetailPage /> },
      { path: ROUTES.PUBLIC.COMPANIES.LIST, element: <CompanyListPage /> },
      { path: ROUTES.PUBLIC.COMPANIES.DETAIL, element: <CompanyDetailPage /> },
    ],
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.AUTH.VERIFY_OTP,
    element: <OTPPage />,
  },
  {
    path: "/company",
    children: [
      {
        path: "applications",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <Navigate to={ROUTES.COMPANY.APPLICATIONS.LIST} replace />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <Navigate to={ROUTES.COMPANY.JOBS.LIST} replace />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.DASHBOARD,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyRecruitmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.RECRUITMENT_MANAGEMENT,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyRecruitmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "recruitment-management/jobs",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyRecruitmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "recruitment-management/applications",
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyRecruitmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.JOBS.CREATE,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyJobCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.JOBS.DETAIL,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyJobDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.JOBS.EDIT,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyJobEditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.JOBS.APPLICATIONS,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <JobApplicationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.COMPANY.PROFILE,
        element: (
          <ProtectedRoute allowedRoles={["company"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/applicant",
    children: [
      {
        path: ROUTES.APPLICANT.PROFILE,
        element: (
          <ProtectedRoute allowedRoles={["applicant"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.APPLICANT.DASHBOARD,
        element: (
          <ProtectedRoute allowedRoles={["applicant"]}>
            <ApplicantDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.APPLICANT.JOB_MANAGEMENT,
        element: (
          <ProtectedRoute allowedRoles={["applicant"]}>
            <JobManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.APPLICANT.APPLIED_JOBS,
        element: (
          <ProtectedRoute allowedRoles={["applicant"]}>
            <JobManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.APPLICANT.SAVED_JOBS,
        element: (
          <ProtectedRoute allowedRoles={["applicant"]}>
            <JobManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.APPLICANT.FOLLOWING_COMPANIES,
        element: (
          <ProtectedRoute allowedRoles={["applicant"]}>
            <JobManagementPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

// Update AUTH_PATHS to use ROUTES constant
export const AUTH_PATHS = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.VERIFY_OTP,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
];

export default userRoutes;
