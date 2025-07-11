// src/App.tsx
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/AuthContext";
import Loading from "@/components/staticComponents/loading";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import userRoutes, { AUTH_PATHS } from "./routes/userRoutes";

const queryClient = new QueryClient();

function AppLayout() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && <Header />}
      <main className={`flex-1 ${isAuthPage ? "bg-gray-50" : ""}`}>
        <Suspense fallback={<Loading fullScreen size="lg" />}>
          <Routes>
            {userRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </main>
      {!isAuthPage && <Footer />}
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
