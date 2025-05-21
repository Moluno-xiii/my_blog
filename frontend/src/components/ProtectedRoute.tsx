import { useNavigate } from "@tanstack/react-router";
import useAuth from "../context/AuthProvider";
import { useEffect, type PropsWithChildren } from "react";
import toast from "react-hot-toast";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      toast.error(
        "You're Unauthorized, you need to be logged in to access this route.",
      );
      navigate({ to: "/auth/login", replace: true });
    }
  }, [user, navigate]);

  if (user === undefined) {
    return <div>Loading User data...</div>;
  }

  return children;
};

export default ProtectedRoute;
