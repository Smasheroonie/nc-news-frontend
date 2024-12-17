import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";
import { fetchArticles } from "../../utils/api";
import Loading from "./Loading";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section className="">
      <ArticlesList articles={articles} />
    </section>
  );
}
