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
    setDeleted(false);
    fetchComments(articleId).then((commentsData) => {
      setComments(commentsData);
      setLoading(false);
    });
  }, [submitted, deleted]);

  const handleChange = ({ target: { value } }) => {
    setSubmitted(false);
    setNewComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    postComment(user, newComment, articleId)
      .then(() => {
        setNewComment("");
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setError("Comment unsuccessful, try again.");
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <label className="flex gap-2">
          <textarea
            onChange={handleChange}
            value={newComment}
            placeholder="Add a comment"
            required
            className="border rounded-xl py-1 px-2 m-auto min-h-[44px] max-h-96 min-w-[390px] max-w-[1000px]"
          >
            {newComment}
          </textarea>
          <button className="shadow-sm bg-gray-300 rounded-xl p-1 hover:bg-green-400 active:bg-green-300 cursor-pointer max-h-[44px] hover:transition-colors ease-in-out duration-200">
            Submit
          </button>
        </label>
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
    </>
  );
}
