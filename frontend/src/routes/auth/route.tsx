import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import GoBack from "../../components/GoBack";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-full min-w-full flex-1 flex-col gap-y-3">
      <p>If you're not the owner of this blog, go back.</p>
      <GoBack />
      <div className="flex flex-row justify-center gap-x-4">
        <Link
          className="rounded-lg bg-orange-300 p-3 transition-all duration-300 hover:bg-orange-300/50 [&.active]:bg-orange-300/50 [&.active]:font-bold"
          to="/auth/login"
        >
          Login
        </Link>
        <Link
          className="rounded-lg bg-orange-300 p-3 transition-all duration-300 hover:bg-orange-300/50 [&.active]:bg-orange-300/50 [&.active]:font-bold"
          to="/auth/signup"
        >
          Signup
        </Link>
      </div>
      <section className="flex-1">
        <Outlet />
      </section>
    </div>
  );
}
