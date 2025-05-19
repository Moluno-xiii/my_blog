import { useNavigate } from "@tanstack/react-router";
import useAuth from "../context/AuthProvider";
import type { PropsWithChildren } from "react";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user === null) {
    navigate({ to: "/auth/login", replace: true });
  }

  return children;
};

export default ProtectedRoute;
