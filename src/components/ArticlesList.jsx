// import { useContext } from "react";
import ArticleCard from "./ArticleCard";
// import { ViewContext } from "../context/View";

export default function ArticlesList({ articles }) {
  // const { view, setView } = useContext(ViewContext);
  // const toggleView = () => {
  //   setView((currView) => {
  //     return currView === "List" ? "Grid" : "List";
  //   });
  // };
  return (
    <>
      {/* <label className="flex justify-center items-center cursor-pointer m-auto mt-2 w-fit">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={toggleView}
        />
        <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          {view} View
        </span>
      </label> */}
      <div className="">
        <ul
          className="flex flex-col m-auto items-center justify-center"
          // className={
          //   view === "List"
          //     ? "flex flex-col m-auto items-center justify-center"
          //     : "flex flex-row flex-wrap"
          // }
        >
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </div>
    </>
  );
}

// view commented out for reworking later
