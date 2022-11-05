import axios from "axios";

const memberApi = axios.create({
  baseURL: "http://ec2-52-78-116-203.ap-northeast-2.compute.amazonaws.com:8080",
});

export const userLogin = async (formData) => {
  const result = await memberApi.post("/members/login", formData);
  return result;
};
