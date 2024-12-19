import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Loading from "./Loading";
import { fetchArticles } from "../../utils/api";
import ArticlesList from "./ArticlesList";
import ErrorPage from "./ErrorPage";

// import { ViewProvider } from "../context/View";

export default function ArticlesByTopic() {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    fetchArticles(topic, sort_by, order)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError({
          status: err.response.status,
          msg: `Topic: ${err.response.data.msg}`,
        });
      });
  }, [topic, sort_by, order]);

  function handleReset() {
    setSortBy("created_at");
    setOrder("desc");
    setSearchParams({ sort_by: sort_by, order: order });
  }

  function handleSortChange({ target: { value } }) {
    setSortBy(value);
    setSearchParams({ sort_by: value, order });
  }

  function handleOrderChange({ target: { value } }) {
    setOrder(value);
    setSearchParams({ sort_by, order: value });
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage status={error.status} msg={error.msg} />
  ) : (
    <section className="flex justify-center">
      <div className="text-center m-2 w-4/6">
        <div className="sm:block flex flex-col justify-center gap-2">
          <div className="flex flex-row justify-center gap-2">
            <label id="sort-by-select">
              <span className="px-1">Sort By</span>
              <select
                name="sort_by"
                value={sort_by}
                onChange={handleSortChange}
                className="h-8 sm:h-auto"
              >
                <option value="created_at">Date (default)</option>
                <option value="comment_count">Comment Count</option>
                <option value="votes">Votes</option>
              </select>
            </label>
            <label id="order-select">
              <span className="px-1">Order</span>
              <select
                name="order"
                value={order}
                onChange={handleOrderChange}
                className="h-8 sm:h-auto"
              >
                <option value="desc">Desc (default)</option>
                <option value="asc">Asc</option>
              </select>
            </label>
          </div>
          <button
            onClick={handleReset}
            className="m-auto px-1 h-10 sm:mt-1 sm:h-auto sm:mx-2 text-base font-normal bg-blue-300 rounded-lg hover:bg-blue-400 active:bg-blue-200 hover:transition-colors ease-in-out duration-200"
          >
            Reset Filters
          </button>
        </div>
        <hr className="mt-2"></hr>
        {/* <ViewProvider> */}
        {topic ? (
          <h2 className="font-bold text-2xl pt-2 pb-1 underline">
            {topic.toUpperCase()}
          </h2>
        ) : null}
        <ArticlesList articles={articles} />
        {/* </ViewProvider> */}
      </div>
    </section>
  );
}

// view commented out for reworking later
