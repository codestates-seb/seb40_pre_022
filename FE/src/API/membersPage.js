import Api from ".";

export const getMembersPage = async (num) => {
  const response = await Api.get(`/members/myPage/${num}`);
  return response.data.data;
};

export const PatchMembersPage = async (params) => {
  return await Api.patch(`/members/${params.memberId}`, params);
};

export const getAllMembers = async (num) => {
  const response = await Api.get(`/members/list?page=${num}&size=200`);
  return response.data.data;
};
