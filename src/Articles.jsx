import { useEffect, useState } from "react";
import ArticlesList from "./ArticlesList";
import fetchArticles from "../utils/api";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <section className="w-3/5 m-auto">
      <ArticlesList articles={articles} />
    </section>
  );
}
