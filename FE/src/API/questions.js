import Api from ".";

export const questionsPost = async (formData) => {
  const result = await Api.post("/questions/ask/submit", formData);
  return result;
};

export const questionsData = async (id) => {
  const response = await Api.get(`/questions/edit/${id}`);
  return response.data.data;
};

export const questionsEdit = async (formData) => {
  const result = await Api.patch(`/questions/${formData.questionId}`, formData);
  return result;
};

export const getAQuestion = async (page) => {
  const response = await Api.get(`/questions?page=${page}&size=10`);

  return response.data;
};
