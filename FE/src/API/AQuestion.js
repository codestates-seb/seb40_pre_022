import axios from "axios";

const AQuestion = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getAQuestion = async (page) => {
  const response = await AQuestion.get(`/questions?page=${page}&size=10`);

  return response.data;
};
