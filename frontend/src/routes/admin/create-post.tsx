import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createPost } from "../../lib/posts";

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
    createPost(updatedData, () => {
      form.reset();
      navigate({ to: "/admin/my-posts/posts" });
    });
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
