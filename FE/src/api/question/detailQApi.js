import axios from "axios";

const detailQApi = axios.create({
  baseURL: `http://ec2-52-78-116-203.ap-northeast-2.compute.amazonaws.com:8080/questions`,
});

export const getDetailQPost = async (id) => {
  const response = await detailQApi.get(`/${id}`);
  return response.data.data;
};

export const QvoteUp = async (id) => {
  return await detailQApi.patch(`/vote_up/${id}`);
};

export const QvoteDown = async (id) => {
  return await detailQApi.patch(`/vote_down/${id}`);
};
