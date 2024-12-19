import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Loading from "./Loading";
import { fetchArticles } from "../../utils/api";
import ArticlesList from "./ArticlesList";
// import { ViewProvider } from "../context/View";

export default function ArticlesByTopic() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSortBy] = useState(searchParams.get("sort_by") || "created_at");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles(topic, sort_by, order)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, [topic, sort_by, order]);

  function handleSortChange({ target: { value } }) {
    console.log(value)
    setSortBy(value);
    setSearchParams({ sort_by: value, order });
  }

  function handleOrderChange({ target: { value } }) {
    setOrder(value);
    setSearchParams({ sort_by, order: value });
  }

  return loading ? (
    <Loading />
  ) : (
    <section className="text-center">
      <label>
        Sort By
        <select name="sort_by" value={sort_by} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </label>
      <label>
        Sort By
        <select name="order" value={order} onChange={handleOrderChange}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </label>
      {/* <ViewProvider> */}
      {topic ? (
        <h2 className="font-bold text-2xl pt-2 pb-1 underline">
          {topic.toUpperCase()}
        </h2>
      ) : null}
      <ArticlesList articles={articles} />
      {/* </ViewProvider> */}
    </section>
  );
}

// view commented out for reworking later
