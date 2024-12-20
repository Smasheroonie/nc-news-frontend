import { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import { fetchTopics } from "../../utils/api";
import Loading from "./Loading";
import { Link } from "react-router";

export default function SidebarNav() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics().then((topicsList) => {
      setTopics(topicsList);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <aside className="max-[1599px]:m-auto max-[1599px]:w-full max-[1599px]:flex max-[1599px]:h-14 max-[1599px]:gap-2 w-fit min-w-64 p-2 h-full mt-auto ml-5 shadow-md min-[1599px]:fixed overflow-auto">
      <Loading />
    </aside>
  ) : (
    <aside className="max-[1599px]:m-auto max-[1599px]:w-full max-[1599px]:flex max-[1599px]:h-14 max-[1599px]:gap-2 w-fit min-w-64 p-2 h-full mt-auto ml-5 shadow-md min-[1599px]:fixed overflow-auto">
      <Link
        to="/new-article"
        className="bg-blue-300 rounded-lg sm:p-0.5 hover:bg-blue-400 active:bg-blue-200 flex max-[1710px]:pr-2 max-[1710px]:pb-1 my-0.5 items-center cursor-pointer border border-slate-400 hover:text-white hover:transition-colors ease-out duration-300"
      >
        <h3 className="font-bold text-lg w-36 sm:w-full my-4 ml-2">
          + New article
        </h3>
      </Link>
      <hr className="my-3" />
      <Link
        to="/articles"
        className="bg-white flex max-[1710px]:pr-2 max-[1710px]:pb-1 my-0.5 items-center cursor-pointer rounded-lg border border-slate-400 hover:bg-sky-200 hover:text-cyan-950 hover:transition-colors active:bg-sky-100 ease-out duration-300"
      >
        <h3 className="font-bold text-xl w-[7.5rem] sm:w-full my-4 ml-2">
          All articles
        </h3>
      </Link>
      <div className="flex items-center my-0.5">
        <h2 className="font-semibold text-xl my-4 mx-2 sm:mx-auto underline">
          Topics
        </h2>
      </div>

      {topics.map((topic) => {
        return <SidebarLink key={topic.slug} text={topic.slug} />;
      })}
    </aside>
  );
}
