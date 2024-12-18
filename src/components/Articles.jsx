import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "./Loading";
import { fetchArticles } from "../../utils/api";
import ArticlesList from "./ArticlesList";
import SortDropdown from "./SortDropdown";
// import { ViewProvider } from "../context/View";

export default function ArticlesByTopic() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles(topic).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic]);

  return loading ? (
    <Loading />
  ) : (
    <section className="text-center">
      <SortDropdown />
      {/* <ViewProvider> */}
      {topic ? <h2 className="font-bold text-2xl pt-2 pb-1 underline">{topic.toUpperCase()}</h2> : null}
      <ArticlesList articles={articles} />
      {/* </ViewProvider> */}
    </section>
  );
}

// view commented out for reworking later
