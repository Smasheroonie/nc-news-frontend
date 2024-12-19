import { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { deleteComment } from "../../utils/api";
import { formatDate } from "../../utils/utils";

export default function Comment({ comment, setDeleted }) {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleClick = ({ target: { value } }) => {
    setError(null);
    deleteComment(value).catch((err) => {
      setError("Comment not deleted, try again.");
    });
    setDeleted(true);
  };

  return (
    <section className="border border-neutral-400 p-2 m-1 min-w-72 max-w-[1000px]">
      <div>
        <span className="font-semibold pb-2">{comment.author}</span>
        <span className="font-light"> - {formatDate(comment.created_at)}</span>
      </div>
      <p className="p-2">{comment.body}</p>
      <div className="flex justify-between px-1">
        <p className="font-light">
          Votes: <span className="font-semibold">{comment.votes}</span>
        </p>
        {!error ? null : <p className="text-red-600">{error}</p>}
        {comment.author === user ? (
          <button
            value={comment.comment_id}
            onClick={handleClick}
            className="bg-red-200 rounded-lg p-0.5 hover:bg-red-500 active:bg-red-400 hover:transition-colors ease-in-out duration-200"
          >
            DELETE
          </button>
        ) : null}
      </div>
    </section>
  );
}
