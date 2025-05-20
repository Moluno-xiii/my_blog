import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/my-posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-y-4">
      <Link className="btn self-end" to="/admin/create-post">
        Create new post
      </Link>
      <section className="flex flex-row items-center gap-x-4">
        <Link
          className="rounded-lg bg-orange-300 px-6 py-2 transition-all duration-300 hover:bg-orange-300/50 [&.active]:bg-orange-300/50 [&.active]:font-bold"
          to="/admin/my-posts/posts"
        >
          Posts
        </Link>
        <Link
          className="rounded-lg bg-orange-300 px-6 py-2 transition-all duration-300 hover:bg-orange-300/50 [&.active]:bg-orange-300/50 [&.active]:font-bold"
          to="/admin/my-posts/drafts"
        >
          Drafts
        </Link>
      </section>
      <section className="flex-1">
        <Outlet />
      </section>
    </div>
  );
}
