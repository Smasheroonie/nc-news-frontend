import { useContext, useEffect, useState } from "react";
import { fetchTopics } from "../../utils/api";
import { formatTopic } from "../../utils/utils";
import { UserContext } from "../context/User";
import Loading from "./Loading";

export default function NewArticle() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setLoading(true);
    setFormData({});
    fetchTopics().then((topicsList) => {
      setTopics(topicsList);
      setLoading(false);
    });
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    console.log(formData, user);
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return loading ? (
    <Loading />
  ) : !user ? (
    <div className="flex flex-col items-center m-auto py-10 px-2 min-h-dvh w-1/2">
      <p>Log in to post an article</p>
    </div>
  ) : (
    <article className="flex flex-col items-center m-auto py-10 px-2 min-h-dvh w-1/2">
      <section className="w-3/4">
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
          <label htmlFor="body" className="w-full">
            <textarea
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
          <button></button>
        </form>
      </section>
    </article>
  );
}
