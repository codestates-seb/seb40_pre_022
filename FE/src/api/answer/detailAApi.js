import axios from "axios";

const detailAApi = axios.create({
  baseURL: `http://ec2-52-78-116-203.ap-northeast-2.compute.amazonaws.com:8080/questions`,
});

export const AvoteUp = async (id, path) => {
  return await detailAApi.patch(`/${id}/answers/vote_up/${path}`);
};

export const AvoteDown = async (id, path) => {
  return await detailAApi.patch(`/${id}/answers/vote_down/${path}`);
};

export const createAnswer = async (id) => {
  return await detailAApi.post(`/${id}/answers`);
};

export const acceptAnswer = async(id);
