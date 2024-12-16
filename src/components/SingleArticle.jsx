import { useEffect, useState } from "react";
import { fetchArticleById } from "../../utils/api";
import { useParams } from "react-router";
import Loading from "./Loading";

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
    <>
      <article className="border border-black flex flex-col items-center m-auto p-10 gap-2">
        <h1 className="font-bold text-3xl pb-1">{article.title}</h1>
        <div className="flex flex-row w-1/3 justify-between">
          <p>By: {article.author}</p>
          <p>Topic: {article.topic}</p>
        </div>
        <div className="flex flex-row w-1/3 justify-start pb-3">
          <p>Posted: {article.created_at}</p>
        </div>
        <img src={article.article_img_url} />
        <p className="w-1/2 p-8">{article.body}</p>
      </article>
    </>
  );
}
