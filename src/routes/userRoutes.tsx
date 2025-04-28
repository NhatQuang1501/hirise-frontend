import { lazy } from "react";
import { ROUTES } from "@/routes/routes";
import { RouteObject } from "react-router-dom";

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
const ProfilePage = lazy(() => import("@/pages/user/applicant/ProfilePage"));
const RecruiterJobListPage = lazy(() => import("@/pages/recruitment/RecruiterJobListPage"));
const RecruiterJobDetailPage = lazy(() => import("@/pages/recruitment/RecruiterJobDetailPage"));
const RecruiterJobCreatePage = lazy(() => import("@/pages/recruitment/RecruiterJobCreatePage"));
const RecruiterJobEditPage = lazy(() => import("@/pages/recruitment/RecruiterJobEditPage"));
const RecruiterDashboardPage = lazy(() => import("@/pages/recruitment/RecruiterDashboardPage"));

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
    path: ROUTES.AUTH.VERIFY_EMAIL,
    element: <OTPPage />,
  },
  {
    path: "/recruiter",
    children: [
      { path: ROUTES.RECRUITER.DASHBOARD, element: <RecruiterDashboardPage /> },
      { path: ROUTES.RECRUITER.JOBS.LIST, element: <RecruiterJobListPage /> },
      { path: ROUTES.RECRUITER.JOBS.CREATE, element: <RecruiterJobCreatePage /> },
      { path: ROUTES.RECRUITER.JOBS.DETAIL, element: <RecruiterJobDetailPage /> },
      { path: ROUTES.RECRUITER.JOBS.EDIT, element: <RecruiterJobEditPage /> },
    ],
  },
  {
    path: "/applicant",
    children: [{ path: ROUTES.APPLICANT.PROFILE, element: <ProfilePage /> }],
  },
];

// Update AUTH_PATHS to use ROUTES constant
export const AUTH_PATHS = [
  // ROUTES.AUTH.LOGIN,
  // ROUTES.AUTH.REGISTER,
  // ROUTES.AUTH.VERIFY_EMAIL,
  // ROUTES.AUTH.FORGOT_PASSWORD,
  // ROUTES.AUTH.RESET_PASSWORD,
];

export default userRoutes;
