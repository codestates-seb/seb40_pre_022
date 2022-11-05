import axios from "axios";

const MembersPage = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getMembersPage = async (num) => {
  const response = await MembersPage.get(`/members/myPage/${num}`);

  return response.data.data;
};
