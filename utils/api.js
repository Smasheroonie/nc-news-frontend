import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-dd8e.onrender.com/api",
});

export const fetchArticles = (topic) => {
  return newsApi
    .get("/articles", { params: { topic: topic } })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const fetchArticleById = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then(({ data: { article } }) => {
    return article;
  });
};

export const fetchComments = (articleId) => {
  return newsApi
    .get(`/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComment = (username, comment, articleId) => {
  return newsApi.post(`/articles/${articleId}/comments`, {
    username: username,
    body: comment,
  });
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`);
};

export const patchVotes = (votesCount, articleId) => {
  return newsApi.patch(`/articles/${articleId}`, { inc_votes: votesCount });
};

export const fetchTopics = () => {
  return newsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};
