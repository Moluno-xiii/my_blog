const PostComments = ({
  comments,
}: {
  comments: {
    body: string;
    comment_by: string;
    date_added: string;
    date_updated: string;
    id: string;
  }[];
}) => {
  return (
    <section className="flex flex-col gap-y-2">
      <span className="text-indigo-500">
        All post comments ({comments.length})
      </span>
      {!comments.length ? (
        <div>No Comments yet, be the first to comment</div>
      ) : (
        <ul className="flex flex-col gap-y-4">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p className="capitalize">{comment.comment_by || "anonymous"}</p>
              <p className="whitespace-pre-line">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostComments;
