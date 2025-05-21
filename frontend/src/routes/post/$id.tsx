import { createFileRoute } from "@tanstack/react-router";
import AddComment from "../../components/AddComment";
import PostComments from "../../components/PostComments";
import { getPostById } from "../../lib/posts";

export const Route = createFileRoute("/post/$id")({
  component: RouteComponent,
  loader: async ({ params }) => getPostById(params.id),
});

function RouteComponent() {
  const post = Route.useLoaderData();

  if (!post)
    return <div className="text-center text-2xl font-bold">Post not found</div>;

  return (
    <div className="flex flex-col gap-y-6">
      <section className="flex min-h-[calc(100dvh-200px)] flex-col gap-y-6">
        <p className="text-center text-3xl font-bold capitalize">
          {post?.data.post.title}
        </p>

        <p className="leading-8 whitespace-pre-line">{post?.data.post.body}</p>
      </section>

      <section className="flex flex-col gap-y-4">
        <p className="text-2xl font-bold text-indigo-600">Comments</p>
        <AddComment postId={post.data.post.id} />
        <PostComments comments={post.data.post.comments} />
      </section>
    </div>
  );
}
