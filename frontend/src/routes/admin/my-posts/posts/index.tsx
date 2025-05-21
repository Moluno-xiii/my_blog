import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import PostsComponent from "../../../../components/PostsComponent";
import { getAllPosts } from "../../../../lib/posts";

export const Route = createFileRoute("/admin/my-posts/posts/")({
  component: RouteComponent,
  loader: async () => {
    return getAllPosts();
  },
});

function RouteComponent() {
  const posts = useLoaderData({ from: Route.id });

  if (!posts)
    return (
      <div className="text-center text-2xl text-yellow-300">
        You have no posts yet!
      </div>
    );
  return (
    <div className="flex flex-col gap-y-5">
      <p className="text-2xl font-bold text-indigo-400">My posts</p>
      <PostsComponent posts={posts?.data.posts} />
    </div>
  );
}
