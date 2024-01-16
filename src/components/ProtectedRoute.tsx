import { FC, useEffect } from "react";
import useUser from "../hooks/auth/useUser";
import FullPageSpinner from "./FullPageSpinner";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
