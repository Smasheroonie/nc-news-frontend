import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-dd8e.onrender.com/api",
});

export const fetchArticles = () => {
  return newsApi
    .get("/articles")
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => console.log(err));
};

export const fetchArticleById = (articleId) => {
  return newsApi
    .get(`/articles/${articleId}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => console.log(err));
};
