import { Link } from "react-router";

export default function ArticleCard({ article }) {
  return (
    <div className="flex flex-col flex-wrap items-start justify-start m-auto my-2 w-4/6 min-w-96 max-w-[748px]">
      <Link
        to={"/articles/" + article.article_id}
        className="cursor-pointer border border-black p-6 pb-4 h-[700px]"
      >
        <div className="justify-start pb-2">
          <h1 className="font-bold text-2xl pb-1">{article.title}</h1>
          <p className="rounded-lg bg-sky-200 m-auto w-fit px-1 py-0.5">{article.topic}</p>
        </div>

        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-[698px] h-[465px] object-cover"
        />

        <div className="flex flex-row flex-wrap w-full m-1 pt-2.5 pr-2.5 place-content-between">
          <p>Author: {article.author}</p>
          <p>Posted: {article.created_at.slice(0, 10)}</p>
        </div>
        <div className="flex flex-row flex-wrap w-full m-1 pr-2.5 place-content-between">
          <p>{article.votes} votes</p>
          <p>{article.comment_count} comments</p>
        </div>
      </Link>
    </div>
  );
}
