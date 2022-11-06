import Api from ".";

export const getDetailQPost = async (id) => {
  const response = await Api.get(`/questions/${id}`);
  return response.data.data;
};

export const QvoteUp = async (params) => {
  return await Api.patch(`/questions/vote_up/${params.questionId}`, params);
};

export const QvoteDown = async (params) => {
  return await Api.patch(`/questions/vote_down/${params.questionId}`, params);
};

export const AvoteUp = async (params) => {
  return await Api.patch(
    `/questions/${params.id}/answers/vote_up/${params.answerId}`,
    { answerId: params.answerId }
  );
};

export const AvoteDown = async (params) => {
  return await Api.patch(
    `/questions/${params.id}/answers/vote_down/${params.answerId}`,
    { answerId: params.answerId }
  );
};

export const createAnswer = async (params) => {
  return await Api.post(`/questions/${params.id}/answers`, {
    body: params.body,
  });
};

export const acceptAnswer = async (params) => {
  return await Api.patch(
    `questions/${params.id}/answers/accept/${params.answerId}`,
    { answerId: params.answerId }
  );
};
export const deleteAnswer = async (params) => {
  return await Api.delete(`questions/${params.id}/answers/${params.answerId}`);
};

export const deleteQuestion = async (id) => {
  return await Api.delete(`questions/${id}`);
};
