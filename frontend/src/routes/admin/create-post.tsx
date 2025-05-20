import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { handleError } from "../../lib/helpers";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axiosInstance";
import { useState } from "react";

export const Route = createFileRoute("/admin/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [isPostDraft, setIsPostDraft] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as unknown as {
      title: string;
      body: string;
    };
    const updatedData = { ...data, isPostDraft };
    try {
      const post = await axiosInstance.post("/admin/create-post", updatedData);
      form.reset();
      toast.success(post.data.message);
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
        />
      </section>
      <section className="flex flex-col gap-y-3">
        <label htmlFor="body">Post Body</label>
        <textarea
          className="rounded-md border border-indigo-500 p-3"
          required
          name="body"
          id=""
        ></textarea>
      </section>

      <section className="flex flex-row items-center justify-between gap-x-3">
        <button className="btn" type="submit">
          Save post
        </button>
        <button
          className="btn"
          type="submit"
          onClick={() => setIsPostDraft(true)}
        >
          Save as draft
        </button>
      </section>
    </form>
  );
}
