export default function Comment({ comment }) {
  return (
    <section className="border p-2 m-1 min-w-[450px] max-w-[1000px]">
      <div>
        <span className="font-semibold pb-2">{comment.author}</span>
        <span className="font-light"> - {comment.created_at.slice(0, 10)}</span>
      </div>
      <p className="p-2">{comment.body}</p>
      <p className="font-light">
        Votes: <span className="font-semibold">{comment.votes}</span>
      </p>
    </section>
  );
}
