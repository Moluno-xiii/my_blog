import { useRouter } from "@tanstack/react-router";
import { createComment } from "../lib/comments";

const AddComment = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as unknown as {
      comment_by: string;
      body: string;
    };
    createComment(data, postId, () => {
      form.reset();
      router.invalidate();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
      <p className="text-xl font-semibold">Add comment</p>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="comment_by">
          Name <span className="text-sm text-indigo-500"> (optional)</span>
        </label>
        <input
          className="rounded-md border border-indigo-500 p-2"
          type="text"
          name="comment_by"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="body">Message</label>
        <textarea
          required
          className="rounded-md border border-indigo-500 p-2"
          name="body"
        />
      </div>
      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default AddComment;
