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

export const fetchComments = (articleId) => {
  return newsApi
    .get(`/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    })
    .catch((err) => console.log(err));
};

export const postComment = (username, comment, articleId) => {
  return newsApi
    .post(`/articles/${articleId}/comments`, {
      username: username,
      body: comment,
    })
    .catch((err) => {
      return err;
    });
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`).catch((err) => {
    return err;
  });
};

export const patchVotes = (votesCount, articleId) => {
  return newsApi
    .patch(`/articles/${articleId}`, { inc_votes: votesCount })
    .catch((err) => {
      return err;
    });
};
