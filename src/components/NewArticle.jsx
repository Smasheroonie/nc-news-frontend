import { useContext, useEffect, useState } from "react";
import { fetchTopics, postArticle } from "../../utils/api";
import { formatTopic } from "../../utils/utils";
import { UserContext } from "../context/User";
import Loading from "./Loading";
import { Link } from "react-router";

export default function NewArticle() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setFormData({});
    fetchTopics().then((topicsList) => {
      setTopics(topicsList);
      setLoading(false);
    });
  }, [submitted, user]);

  const handleChange = ({ target: { name, value } }) => {
    setError(null);
    setSubmitted(false);
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitButton = e.target[4];
    submitButton.disabled = true;
    setError(null);
    postArticle({ ...formData, user })
      .then(() => {
        setFormData("");
        setSubmitted(true);
        submitButton.disabled = false;
      })
      .catch((err) => {
        setSubmitted(false);
        setError("Post unsuccessful, try again");
        submitButton.disabled = false;
      });
  };

  return loading ? (
    <Loading />
  ) : !user ? (
    <div className="flex flex-col items-center m-auto py-10 px-2 min-h-dvh w-1/2">
      <p>Log in to post an article</p>
    </div>
  ) : submitted ? (
    <div className="flex flex-col items-center h-screen justify-center gap-3">
      <h1 className="text-2xl">Article submitted!</h1>
      <Link to="/articles">
        <h2 className="text-xl underline text-blue-700 hover:">Front Page</h2>
      </Link>
      <button
        onClick={() => {
          setSubmitted(false);
        }}
        className="shadow-sm bg-gray-300 rounded-xl p-1 w-auto h-10 hover:bg-green-400 active:bg-green-300 cursor-pointer hover:transition-colors ease-in-out duration-200"
      >
        + New article
      </button>
    </div>
  ) : (
    <article className="flex flex-col items-center m-auto py-10 px-2 min-h-dvh w-5/12">
      <section className="flex flex-col sm:w-full">
        <h2 className="font-bold text-2xl pb-6">Post an article</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-10"
        >
          <label htmlFor="title" className="w-full">
            <input
              onChange={handleChange}
              required
              placeholder="Title*"
              id="title"
              name="title"
              value={formData.title || ""}
              className="border-blue-200 border rounded-xl py-1 px-2 m-auto mb-1 h-11 min-h-11 max-h-96 min-w-56 w-full"
            />
          </label>
          <label htmlFor="topic" className="w-full">
            <select
              onChange={handleChange}
              required
              id="topic"
              name="topic"
              value={formData.topic || ""}
              className="border-blue-200 border rounded-xl py-1 px-2 m-auto mb-1 h-11 min-h-11 max-h-96 min-w-56 w-full"
            >
              <option hidden value={""}>
                Choose a topic*
              </option>
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {formatTopic(topic.slug)}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="imgUrl" className="w-full">
            <input
              onChange={handleChange}
              placeholder="Image URL"
              id="imgUrl"
              name="imgUrl"
              value={formData.imgUrl || ""}
              className="border-blue-200 border rounded-xl py-1 px-2 m-auto mb-1 h-11 min-h-11 max-h-96 min-w-56 w-full"
            />
          </label>
          <div className="w-full flex flex-col flex-wrap-reverse">
            <label htmlFor="body" className="w-full">
              <textarea
                required
                onChange={handleChange}
                placeholder="Body*"
                id="body"
                name="body"
                value={formData.body || ""}
                className="border-blue-200 border rounded-xl py-1 px-2 m-auto mb-1 h-96 min-h-11 max-h-96 min-w-56 w-full"
              >
                {formData.body}
              </textarea>
            </label>
            {!error ? null : (
              <div className="flex flex-col items-center m-auto">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="shadow-sm bg-gray-300 rounded-xl p-1 w-20 h-10 hover:bg-green-400 active:bg-green-300 cursor-pointer hover:transition-colors ease-in-out duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}
