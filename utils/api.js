import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-dd8e.onrender.com/api",
});

export default function fetchArticles() {
  return newsApi
    .get("/articles")
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => console.log(err));
}
