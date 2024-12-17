import { useState, useEffect } from "react";
import Comment from "./Comment";
import Loading from "./Loading";
import { fetchComments } from "../../utils/api";

export default function CommentsSection({ articleId }) {
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments(articleId).then((commentsData) => {
      setComments(commentsData);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <ul>
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}
    </ul>
  );
}
