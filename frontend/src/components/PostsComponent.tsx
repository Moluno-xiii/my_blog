import { Link } from "@tanstack/react-router";
import type { Post } from "../types";

interface PropTypes {
  posts: Post[];
}
const PostsComponent: React.FC<PropTypes> = ({ posts }) => {
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
            <Link
              className="btn"
              to={
                post.isPostDraft
                  ? "/admin/my-posts/drafts/$id"
                  : "/admin/my-posts/posts/$id"
              }
              params={{ id: post.id }}
            >
              View post
            </Link>
            <Link
              className="btn"
              to={"/admin/edit-post/$id"}
              params={{ id: post.id }}
            >
              Edit post
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostsComponent;
