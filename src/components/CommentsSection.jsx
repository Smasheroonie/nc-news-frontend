import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import Loading from "./Loading";
import { fetchComments, postComment } from "../../utils/api";
import { UserContext } from "../context/User";

export default function CommentsSection({ articleId }) {
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments(articleId).then((commentsData) => {
      setComments(commentsData);
      setLoading(false);
    });
  }, [submitted]);

  const handleChange = ({ target: { value } }) => {
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
    setSubmitted(false);
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
          <button className="shadow-sm bg-gray-300 rounded-xl p-1 hover:bg-green-400 active:bg-green-300 cursor-pointer max-h-[44px]">
            Submit
          </button>
        </label>
      </form>
      <ul>
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </>
  );
}
