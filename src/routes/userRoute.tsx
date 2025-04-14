
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import RecruiterJobDetailPage from '@/pages/recruitment/RecruiterJobDetailPage';

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/authentication/RegisterPage"));
const OTPPage = lazy(() => import("@/pages/authentication/OTPPage"));
const JobListPage = lazy(() => import("@/pages/job/JobListPage"));
const JobDetailPage = lazy(() => import("@/pages/job/JobDetailPage"));
const CreateJobPage = lazy(() => import("@/pages/job/CreateJobPage"));
const CompanyListPage = lazy(() => import("@/pages/company/CompanyListPage"));
const CompanyDetailPage = lazy(() => import("@/pages/company/CompanyDetailPage"));
const AboutPage = lazy(() => import("@/pages/static/AboutPage"));
const ContactPage = lazy(() => import("@/pages/static/ContactPage"));
const ProfilePage = lazy(() => import("@/pages/user/applicant/ProfilePage"));
const RecruiterJobDetailPage = lazy(() => import("@/pages/recruitment/RecruiterJobDetailPage"))

export const AUTH_PAGES = ["/login", "/register", "/register/otp"];

export const userRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify-email",
    element: <OTPPage />,
  },
  {
    path: "/jobs",
    element: <JobListPage />,
  },
  // Đặt route cụ thể trước route có tham số
  {
    path: "/jobs/create",
    element: <CreateJobPage />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetailPage />,
  },
  {
    path: "/companies",
    element: <CompanyListPage />,
  },
  {
    path: "/companies/:id",
    element: <CompanyDetailPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/applicant-profile",
    element: <ProfilePage />,
  },
  {
    path: "/recruitment/job-detail",
    element: <RecruiterJobDetailPage />
  }
];
