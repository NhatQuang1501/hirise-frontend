import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loading from "@/components/ui/loading";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/authentication/RegisterPage"));
const JobListPage = lazy(() => import("@/pages/job/JobListPage"));
const JobDetailPage = lazy(() => import("@/pages/job/JobDetailPage"));
const PostJobPage = lazy(() => import("@/pages/job/PostJobPage"));
const CompanyListPage = lazy(() => import("@/pages/company/CompanyListPage"));
const CompanyDetailPage = lazy(() => import("@/pages/company/CompanyDetailPage"));
const AboutPage = lazy(() => import("@/pages/static/AboutPage"));
const ContactPage = lazy(() => import("@/pages/static/ContactPage"));

export const AUTH_PAGES = ["/login", "/register"];

export const routes: RouteObject[] = [
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
    path: "/jobs",
    element: <JobListPage />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetailPage />,
  },
  {
    path: "/post-jobs",
    element: <PostJobPage />,
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
];
