import Api from ".";

export const userLogin = async (formData) => {
  const result = await Api.post("/members/login", formData);
  return result;
};

export const userJoin = async (formData) => {
  const result = await Api.post("/members/signup", formData);
  return result;
};

export const userLogout = async () => {
  const result = await Api.delete("/members/logout");
  return result;
};

export const userRecover = async (formData) => {
  const { data } = await Api.post("/members/passwordReset", formData);
  return data;
};

export const getMembersPage = async (num) => {
  const response = await Api.get(`/members/myPage/${num}`);

  return response.data.data;
};
