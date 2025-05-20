import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import PostsComponent from "../../../../components/PostsComponent";
import axiosInstance from "../../../../lib/axiosInstance";
import toast from "react-hot-toast";
import { handleError } from "../../../../lib/helpers";

export const Route = createFileRoute("/admin/my-posts/drafts/")({
  component: RouteComponent,
  loader: async () => {
    try {
      const drafts = await axiosInstance.get("/posts/drafts");
      return drafts;
    } catch (err: unknown) {
      const message = handleError(err, "response");
      toast.error(message);
    }
  },
});

function RouteComponent() {
  const drafts = useLoaderData({ from: Route.id });
  return (
    <div className="flex flex-col gap-y-5">
      <p className="text-2xl font-bold text-indigo-400">My drafts</p>
      <PostsComponent posts={drafts?.data.drafts} />
    </div>
  );
}
