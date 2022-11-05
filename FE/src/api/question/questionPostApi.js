import axios from "axios";

const questionPostApi = axios.create({
  baseURL:
    "http://ec2-52-78-116-203.ap-northeast-2.compute.amazonaws.com:8080/questions",
});
// baseURL을 설정해줌

export const questionPost = async (formData) => {
  const result = await questionPostApi.post("/questions", formData);
  return result;
};
// return은 해줘야하는건가?
