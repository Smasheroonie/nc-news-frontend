import { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import { fetchTopics } from "../../utils/api";
import Loading from "./Loading";

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
      <div className="flex items-center my-0.5">
        <h2 className="font-semibold text-xl my-4 ml-2 underline">Topics</h2>
      </div>
      {topics.map((topic) => {
        return <SidebarLink key={topic.slug} text={topic.slug} />;
      })}
    </aside>
  );
}
