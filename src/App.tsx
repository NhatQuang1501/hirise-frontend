import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Toaster } from "sonner"; // 👉 Thêm dòng này

const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("./pages/authentication/RegisterPage"));
const JobListPage = lazy(() => import("./pages/job/JobListPage"));
const JobDetailPage = lazy(() => import("./pages/job/JobDetailPage"));
const PostJobPage = lazy(() => import("./pages/job/PostJobPage"));
const CompanyListPage = lazy(() => import("./pages/company/CompanyListPage"));
const CompanyDetailPage = lazy(() => import("./pages/company/CompanyDetailPage"));
const AboutPage = lazy(() => import("./pages/static/AboutPage"));
const ContactPage = lazy(() => import("./pages/static/ContactPage"));

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
  </div>
);

const AUTH_PAGES = ["/login", "/register"];

function AppLayout() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_PAGES.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/post-jobs" element={<PostJobPage />} />
            <Route path="/companies" element={<CompanyListPage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster position="bottom-right" richColors closeButton />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
