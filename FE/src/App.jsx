import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Join from "./pages/Join";
import MyPage from "./pages/Mypage";
import QuestionAsk from "./pages/QuestionAsk";
import AllQuestion from "./pages/AllQuestion";
import QuestionsDetail from "./pages/QuestionsDetail";
import QuestionEdit from "./pages/QuestionEdit";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import Recovery from "./pages/Recovery";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useState } from "react";

// 전역에서 이벤트를 핸들링
const queryClient = new QueryClient();

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (auth !== null) {
      setAuth(localStorage.getItem("isLogin"));
    }
    return () => {
      setAuth(false);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="members/login" element={<Login />} />
              <Route path="members/logout" element={<Logout />} />
              <Route path="/join" element={<Join />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/questions" element={<AllQuestion />} />
              <Route
                path="/questions/ask"
                element={
                  <PrivateRoute component={<QuestionAsk />} auth={auth} />
                }
              />
              <Route
                path="/questions/edit"
                element={
                  <PrivateRoute component={<QuestionEdit />} auth={auth} />
                }
              />
              <Route path="/members/myPage/:id" element={<MyPage />} />
              <Route
                path="/questions/detail/:id"
                element={<QuestionsDetail />}
              />
              <Route path="/*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
