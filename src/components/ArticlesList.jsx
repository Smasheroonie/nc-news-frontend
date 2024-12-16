import ArticleCard from "./ArticleCard";

export default function ArticlesList({ articles }) {
  return (
    <ul className="flex flex-col m-auto items-center justify-center">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </ul>
  );
}
