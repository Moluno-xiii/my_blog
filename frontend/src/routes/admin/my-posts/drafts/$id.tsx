import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { deletePost, getDraftById } from "../../../../lib/posts";

export const Route = createFileRoute("/admin/my-posts/drafts/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getDraftById(params.id);
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
        {post?.data.draft.title}
      </p>
      <p className="leading-10 whitespace-pre-line">{post?.data.draft.body}</p>
      <button
        className="btn-error"
        onClick={() =>
          deletePost(post.data.draft.id, () =>
            navigate({ to: "/admin/my-posts/drafts", replace: true }),
          )
        }
      >
        Delete draft
      </button>
    </div>
  );
}
