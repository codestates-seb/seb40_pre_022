import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//요청시 AccessToken 계속 보내주기
Api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken && !refreshToken) {
    config.headers["accessToken"] = null;
    config.headers["refreshToken"] = null;
    return config;
  }
  if (config.headers && accessToken && refreshToken) {
    config.headers["Authorization"] = accessToken.replace(/\"/gi, ""); // Bearer
    config.headers["refreshToken"] = refreshToken.replace(/\"/gi, ""); // Bearer
    return config;
  }
});

// AccessToken이 만료됐을때 처리
Api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      const accessToken = originalConfig.headers["Authorization"];
      const refreshToken = originalConfig.headers["refreshToken"];
      try {
        const data = await axios({
          url: `${baseURL}/members/refresh`,
          method: "GET",
          headers: {
            Authorization: accessToken,
            refreshToken: refreshToken,
          },
        });
        if (data) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.headers.authorization)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.headers.refreshtoken)
          );
          return await Api.request(originalConfig);
        }
      } catch (err) {
        console.log("토큰 갱신 에러");
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default Api;
