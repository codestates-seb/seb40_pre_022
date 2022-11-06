import axios from "axios";
import Api from ".";

const MembersPage = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getMembersPage = async (num) => {
  const response = await MembersPage.get(`/members/myPage/${num}`);

  return response.data.data;
};

export const PatchMembersPage = async () => {
  const id = localStorage.getItem("memberId");
  return await Api.patch(`/members/${id}`);
};
