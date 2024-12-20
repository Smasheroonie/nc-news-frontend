export const formatDate = (date) => {
  const formattedDate = date.slice(0, 10).split("-").reverse().join("-");
  return formattedDate;
};

export const formatTopic = (topic) => {
  const formattedTopic = topic[0].toUpperCase() + topic.slice(1);
  return formattedTopic;
};
