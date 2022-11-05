import axios from "axios";

const detailQApi = axios.create({
  baseURL: `http://ec2-52-78-116-203.ap-northeast-2.compute.amazonaws.com:8080/questions`,
});

export const getDetailQPost = async (id) => {
  const response = await detailQApi.get(`/${id}`);
  return response.data.data;
};

export const getDetailQAnswer = async (id) => {
  const response = await detailQApi.get(`/${id}`);
  return response.data.data.answers;
};
