import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axiosInstance from "../../../../lib/axiosInstance";
import toast from "react-hot-toast";
import { handleError } from "../../../../lib/helpers";

export const Route = createFileRoute("/admin/my-posts/posts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const post = await axiosInstance(`/posts/${params.id}`);
      return post;
    } catch (err) {
      const message = handleError(err, "response");
      toast.error(message);
    }
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();

  async function deletePost() {
    try {
      const data = await axiosInstance.delete(
        `/admin/delete-post/${post?.data.post.id}`,
      );
      navigate({ to: "/admin/my-posts/posts", replace: true });
      toast.success(data.data.message);
    } catch (err) {
      const message = handleError(err, "response");
      toast.error(message);
    }
  }

  return (
    <div className="flex flex-col gap-y-6">
      <p className="text-center text-3xl font-bold capitalize">
        {post?.data.post.title}
      </p>
      <p className="leading-10 whitespace-pre-line">{post?.data.post.body}</p>
      <button className="btn-error" onClick={deletePost}>
        Delete post
      </button>
    </div>
  );
}
