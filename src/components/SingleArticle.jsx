import { useEffect, useState } from "react";
import { fetchArticleById } from "../../utils/api";
import { useParams } from "react-router";
import Loading from "./Loading";
import VotesCounter from "./VotesCounter";
import CommentsSection from "./CommentsSection";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <article className="border border-black flex flex-col items-center m-auto py-10 px-2 gap-2 min-h-dvh">
      <h1 className="font-bold text-3xl pb-1 min-w-96 max-w-[750px]">
        {article.title}
      </h1>
      <div className="flex flex-row w-2/5 justify-between min-w-96 max-w-[700px]">
        <p>By: {article.author}</p>
        <p>Topic: {article.topic}</p>
      </div>
      <div className="flex flex-row w-2/5 justify-between pb-3 min-w-96 max-w-[700px]">
        <p>Posted: {article.created_at}</p>
        <VotesCounter votes={article.votes} articleId={article.article_id} />
      </div>
      <img
        src={article.article_img_url}
        className="w-2/3 min-w-96 max-w-[700px]"
      />
      <p className="p-8 pb-4 min-w-[450px] max-w-[1200px]">{article.body}</p>
      <CommentsSection articleId={article.article_id} />
    </article>
  );
}
