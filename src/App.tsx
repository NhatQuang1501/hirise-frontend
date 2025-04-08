import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";

const JobListPage = lazy(() => import("./pages/job/JobListPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("./pages/authentication/RegisterPage"));
const JobDetailPage = lazy(() => import("./pages/job/JobDetailPage"));
const PostJobPageContent = lazy(() => import("./pages/job/PostJobPage"));

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
  </div>
);

// Pages require authentication
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
            <Route path="/post-jobs" element={<PostJobPageContent />} />
          </Routes>
        </Suspense>
      </main>
      {/* {!isAuthPage && <Footer />} */}
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
