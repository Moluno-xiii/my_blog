import { createFileRoute } from "@tanstack/react-router";
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
        <button
          className="w-40 cursor-pointer rounded-md bg-indigo-600 p-2 transition-all duration-300 hover:bg-indigo-600/70"
          onClick={logout}
        >
          logout
        </button>
      </div>
    </ProtectedRoute>
  );
}
