import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Loading from "@/components/staticComponents/loading";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { AUTH_PAGES, routes } from "./index";

function AppLayout() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_PAGES.includes(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-1">
        <Suspense fallback={<Loading fullScreen size="lg" />}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Toaster position="bottom-right" richColors closeButton />
      {!isAuthPage && <Footer />}
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
