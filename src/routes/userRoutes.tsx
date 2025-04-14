import { lazy } from "react";
import { ROUTES } from "@/routes/routes";
import { RouteObject } from "react-router-dom";

// Public pages
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const AboutPage = lazy(() => import("@/pages/static/AboutPage"));
const ContactPage = lazy(() => import("@/pages/static/ContactPage"));
const JobListPage = lazy(() => import("@/pages/job/JobListPage"));
const JobDetailPage = lazy(() => import("@/pages/job/JobDetailPage"));
const CompanyListPage = lazy(() => import("@/pages/company/CompanyListPage"));
const CompanyDetailPage = lazy(() => import("@/pages/company/CompanyDetailPage"));

// Auth pages
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/authentication/RegisterPage"));
const OTPPage = lazy(() => import("@/pages/authentication/OTPPage"));

// Recruiter pages
const RecruiterJobListPage = lazy(() => import("@/pages/recruitment/RecruiterJobListPage"));
const CreateJobPage = lazy(() => import("@/pages/job/CreateJobPage"));
const RecruiterJobDetailPage = lazy(() => import("@/pages/recruitment/RecruiterJobDetailPage"));

export const AUTH_PATHS = Object.values(ROUTES.AUTH);

const userRoutes: RouteObject[] = [
  // Public routes
  { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
  { path: ROUTES.PUBLIC.ABOUT, element: <AboutPage /> },
  { path: ROUTES.PUBLIC.CONTACT, element: <ContactPage /> },
  { path: ROUTES.PUBLIC.JOBS.LIST, element: <JobListPage /> },
  { path: ROUTES.PUBLIC.JOBS.DETAIL, element: <JobDetailPage /> },
  { path: ROUTES.PUBLIC.COMPANIES.LIST, element: <CompanyListPage /> },
  { path: ROUTES.PUBLIC.COMPANIES.DETAIL, element: <CompanyDetailPage /> },

  // Auth routes
  { path: ROUTES.AUTH.LOGIN, element: <LoginPage /> },
  { path: ROUTES.AUTH.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.AUTH.VERIFY_EMAIL, element: <OTPPage /> },

  // Recruiter routes
  { path: ROUTES.RECRUITER.JOBS.LIST, element: <RecruiterJobListPage /> },
  { path: ROUTES.RECRUITER.JOBS.CREATE, element: <CreateJobPage /> },
  { path: ROUTES.RECRUITER.JOBS.DETAIL, element: <RecruiterJobDetailPage /> },
  { path: ROUTES.RECRUITER.JOBS.EDIT, element: <RecruiterJobDetailPage /> },
];

export default userRoutes;
export const AUTH_PAGES = AUTH_PATHS.map((path) => path.replace("/auth", ""));
