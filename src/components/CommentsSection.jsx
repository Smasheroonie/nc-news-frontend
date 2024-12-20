import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import Loading from "./Loading";
import { fetchComments, postComment } from "../../utils/api";
import { UserContext } from "../context/User";

export default function CommentsSection({ articleId }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setDeleted(false);
    fetchComments(articleId).then((commentsData) => {
      setComments(commentsData);
      setLoading(false);
    });
  }, [submitted, deleted]);

  const handleChange = ({ target: { value } }) => {
    setError(null);
    setSubmitted(false);
    setNewComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitButton = e.target[1];
    submitButton.disabled = true;
    setError(null);
    postComment(user, newComment, articleId)
      .then(() => {
        setNewComment("");
        setSubmitted(true);
        submitButton.disabled = false;
      })
      .catch((err) => {
        setSubmitted(false);
        setError("Comment unsuccessful, try again.");
        submitButton.disabled = false;
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        {user ? (
          <label
            className="flex gap-2 flex-wrap-reverse"
            htmlFor="comment-input"
          >
            <textarea
              id="comment-input"
              onChange={handleChange}
              value={newComment}
              placeholder="Add a comment"
              required
              className="border rounded-xl py-1 px-2 m-auto mb-1 h-11 min-h-11 max-h-96 min-w-56 sm:w-96"
            >
              {newComment}
            </textarea>
            <button
              type="submit"
              className="shadow-sm bg-gray-300 rounded-xl p-1 mb-1 hover:bg-green-400 active:bg-green-300 cursor-pointer max-h-[44px] hover:transition-colors ease-in-out duration-200"
            >
              Submit
            </button>
          </label>
        ) : (
          <p className="mb-1">Log in to leave a comment</p>
        )}
      </form>
      {!submitted ? null : <p>Comment Submitted!</p>}
      {!error ? null : <p className="text-red-600">{error}</p>}
      <ul>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              setDeleted={setDeleted}
            />
          );
        })}
      </ul>
    </div>
  );
}
