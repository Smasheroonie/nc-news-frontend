import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-dd8e.onrender.com/api",
});

export const fetchArticles = (topic, sortBy, order) => {
  return newsApi
    .get("/articles", {
      params: { topic: topic, sort_by: sortBy, order: order },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const fetchArticleById = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then(({ data: { article } }) => {
    return article;
  });
};

export const postArticle = ({ user, title, topic, imgUrl, body }) => {
  return newsApi.post("/articles", {
    author: user,
    title: title,
    topic: topic,
    body: body,
    article_img_url:
      imgUrl ||
      "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
  });
};

export const deleteArticle = (articleId) => {
  return newsApi.delete(`/articles/${articleId}`);
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

export const patchCommentVotes = (votesCount, commentId) => {
  return newsApi.patch(`/comments/${commentId}`, { inc_votes: votesCount });
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
