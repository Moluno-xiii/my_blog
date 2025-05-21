import { createFileRoute, Outlet } from "@tanstack/react-router";
import ProtectedRoute from "../../components/ProtectedRoute";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <p>Admin route</p>
      <Outlet />
    </ProtectedRoute>
  );
}
