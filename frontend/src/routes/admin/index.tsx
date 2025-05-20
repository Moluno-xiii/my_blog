import { createFileRoute, Link } from "@tanstack/react-router";
import useAuth from "../../context/AuthProvider";
import ProtectedRoute from "../../components/ProtectedRoute";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, logout } = useAuth();
  return (
    <ProtectedRoute>
      <div>
        <p>Welome back, {user?.email}</p>
        <button className="btn-error" onClick={logout}>
          logout
        </button>
        <Link className="btn" to="/admin/create-post">
          Create post
        </Link>
      </div>
    </ProtectedRoute>
  );
}
