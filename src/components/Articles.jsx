import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Loading from "./Loading";
import { fetchArticles } from "../../utils/api";
import ArticlesList from "./ArticlesList";
// import { ViewProvider } from "../context/View";

export default function ArticlesByTopic() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticles(topic, sortBy, order).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic, sortBy, order]);

  return loading ? (
    <Loading />
  ) : (
    <section className="text-center">
      <label>
        Sort By
        <select
          onChange={({ target: { value } }) => {
            setSearchParams({ sort_by: value });
          }}
        >
          <option name="none"></option>
          <option name="Date" value="created_at">
            Date
          </option>
          <option name="Comment Count" value="comment_count">
            Comment Count
          </option>
          <option name="Votes" value="votes">
            Votes
          </option>
        </select>
      </label>
      <label>
        Sort By
        <select
          onChange={({ target: { value } }) => {
            setSearchParams({ order: value });
          }}
        >
          <option name="none"></option>
          <option name="desc" value="desc">
            Desc
          </option>
          <option name="asc" value="asc">
            Asc
          </option>
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
