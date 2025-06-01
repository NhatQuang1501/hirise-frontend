import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/staticComponents/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectPath = ROUTES.AUTH.LOGIN,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You need to login to access this page");
      navigate(redirectPath);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      toast.error("You don't have permission to access this page");
      navigate(user.role === "applicant" ? ROUTES.PUBLIC.HOME : ROUTES.COMPANY.JOBS.LIST);
      return;
    }
  }, [isAuthenticated, user, allowedRoles, navigate, redirectPath]);

  if (!isAuthenticated) {
    return <Loading fullScreen size="lg" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Loading fullScreen size="lg" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
