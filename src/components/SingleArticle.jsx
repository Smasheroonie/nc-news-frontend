import { useEffect, useState } from "react";
import { fetchArticleById } from "../../utils/api";
import { useParams } from "react-router";
import Loading from "./Loading";
import VotesCounter from "./VotesCounter";
import CommentsSection from "./CommentsSection";
import { formatDate } from "../../utils/utils";
import ErrorPage from "./ErrorPage";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    fetchArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError({
          status: err.response.status,
          msg: `Article: ${err.response.data.msg}`,
        });
      });
  }, []);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage status={error.status} msg={error.msg} />
  ) : (
    <article className="flex flex-col items-center m-auto py-10 px-2 gap-2 min-h-dvh">
      <h1 className="font-bold text-3xl pb-1 max-w-[750px]">{article.title}</h1>
      <hr className="w-1/3"/>
      <div className="flex max-w-[750px] flex-row flex-wrap w-full m-1 pr-2.5 justify-between">
        <p>By: {article.author}</p>
        <p>Topic: {article.topic}</p>
      </div>
      <div className="flex max-w-[750px] flex-row flex-wrap w-full m-1 pr-2.5 justify-between">
        <p>Posted: {formatDate(article.created_at)}</p>
        <VotesCounter votes={article.votes} articleId={article.article_id} />
      </div>
      <img
        src={article.article_img_url}
        className="w-2/3 min-w-80 max-w-[700px]"
      />
      <p className="my-4 max-w-[1000px]">{article.body}</p>
      <hr className="w-1/3"/>
      <CommentsSection articleId={article.article_id} />
    </article>
  );
}
