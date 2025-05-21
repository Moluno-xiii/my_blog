import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts } from "../lib/posts";
import type { Post } from "../types";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => getAllPosts(),
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return (
    <div className="flex flex-col gap-y-5">
      <p className="text-2xl font-bold text-indigo-300">Welcome to my blog</p>
      <p className="self-center text-xl font-semibold">All Posts</p>
      {data?.data.posts ? (
        <AllPosts posts={data?.data.posts} />
      ) : (
        <p className="text-center">No blog posts yet</p>
      )}
    </div>
  );
}

const AllPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <ul className="flex flex-col gap-y-6">
      {posts.map((post: Post) => (
        <li key={post.id} className="flex flex-col gap-y-3">
          <p className="text-xl font-semibold text-orange-300 capitalize">
            {post.title}
          </p>
          <p>
            Date created : {post.date_created.split("T")[0]},{" "}
            {post.date_created.split("T")[1].slice(0, -5)}
          </p>
          <p>{post.body.split(" ").slice(0, 20).join(" ") + "..."}</p>
          <div className="flex flex-row items-center justify-between">
            <Link className="btn" to={"/post/$id"} params={{ id: post.id }}>
              View post
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
