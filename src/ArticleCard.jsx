export default function ArticleCard({ article }) {
  return (
    <div className="border border-black flex flex-col flex-wrap items-start justify-start m-auto w-4/6 p-6 pb-4">
      <div className="justify-start pb-2">
        <h2 className="font-bold text-2xl pb-1">{article.title}</h2>
        <p>Topic: {article.topic}</p>
      </div>
      <div className="flex flex-col m-auto items-center justify-center">
        <img src={article.article_img_url} className="object-cover" alt={article.title}/>
      </div>
      <div className="flex flex-row flex-wrap w-full m-1 pt-2.5 pr-2.5 place-content-between">
        <p>Author: {article.author}</p>
        <p>Created on: {article.created_at.slice(0, 10)}</p>
      </div>
      <div className="flex flex-row flex-wrap w-full m-1 pr-2.5 place-content-between">
        <p>{article.votes} votes</p>
        <p>{article.comment_count} comments</p>
      </div>
    </div>
  );
}
