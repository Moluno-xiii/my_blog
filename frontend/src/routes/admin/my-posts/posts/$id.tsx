import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { deletePost, getSinglePost } from "../../../../lib/posts";

export const Route = createFileRoute("/admin/my-posts/posts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getSinglePost(params.id);
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();

  if (!post)
    return <div className="text-center text-2xl font-bold">Post not found</div>;

  return (
    <div className="flex flex-col gap-y-6">
      <p className="text-center text-3xl font-bold capitalize">
        {post?.data.post.title}
      </p>

      <p className="leading-10 whitespace-pre-line">{post?.data.post.body}</p>
      <button
        className="btn-error"
        onClick={() =>
          deletePost(post.data.post.id, () =>
            navigate({ to: "/admin/my-posts/posts", replace: true }),
          )
        }
      >
        Delete post
      </button>
    </div>
  );
}
