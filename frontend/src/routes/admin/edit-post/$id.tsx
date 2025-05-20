import { createFileRoute, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import axiosInstance from "../../../lib/axiosInstance";
import { handleError } from "../../../lib/helpers";

export const Route = createFileRoute("/admin/edit-post/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const data = await axiosInstance.get(`/posts/singlePost/${params.id}`);
      return data;
    } catch (err) {
      const message = handleError(err, "response");
      toast.error(message);
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const post = Route.useLoaderData();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as unknown as {
      title: string;
      body: string;
    };
    const updatedData = { ...data, isPostDraft: post?.data.post.isPostDraft };
    try {
      const updatedPost = await axiosInstance.put(
        `/admin/update-post/${post?.data.post.id}`,
        updatedData,
      );
      form.reset();
      toast.success(updatedPost.data.message);
      navigate({ to: "/admin/my-posts/posts" });
    } catch (err: unknown) {
      const message = handleError(err, "response");
      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
      <section className="flex flex-col gap-y-3">
        <label htmlFor="title">Post Title</label>
        <input
          className="rounded-md border border-indigo-600 p-3"
          required
          type="text"
          name="title"
          defaultValue={post?.data.post.title}
        />
      </section>
      <section className="flex flex-col gap-y-3">
        <label htmlFor="body">Post Body</label>
        <textarea
          className="rounded-md border border-indigo-500 p-3"
          required
          name="body"
          id=""
          defaultValue={post?.data.post.body}
        ></textarea>
      </section>

      <section className="flex flex-row items-center justify-between gap-x-3">
        <button className="btn" type="submit">
          Update post
        </button>
      </section>
    </form>
  );
}
