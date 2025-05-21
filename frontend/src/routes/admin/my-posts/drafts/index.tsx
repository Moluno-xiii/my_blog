import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import PostsComponent from "../../../../components/PostsComponent";
import { getAllDrafts } from "../../../../lib/posts";

export const Route = createFileRoute("/admin/my-posts/drafts/")({
  component: RouteComponent,
  loader: async () => {
    return await getAllDrafts();
  },
});

function RouteComponent() {
  const drafts = useLoaderData({ from: Route.id });

  if (!drafts)
    return (
      <div className="text-center text-2xl text-yellow-300">
        You have no drafts yet!
      </div>
    );
  return (
    <div className="flex flex-col gap-y-5">
      <p className="text-2xl font-bold text-indigo-400">My drafts</p>
      <PostsComponent posts={drafts?.data.drafts} />
    </div>
  );
}
