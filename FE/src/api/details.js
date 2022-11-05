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

export const AvoteUp = async (id, path) => {
  return await Api.patch(`/questions/${id}/answers/vote_up/${path}`);
};

export const AvoteDown = async (id, path) => {
  return await Api.patch(`/questions/${id}/answers/vote_down/${path}`);
};

export const createAnswer = async (id) => {
  return await Api.post(`/questions/${id}/answers`);
};

// export const acceptAnswer = async(id);
