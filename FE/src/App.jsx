import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles";
import { RecoilRoot } from "recoil";
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

function App() {
  const auth = localStorage.getItem("isLogin");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='members/login' element={<Login />} />
            <Route path='members/logout' element={<Logout />} />
            <Route path='/join' element={<Join />} />
            <Route path='/recovery' element={<Recovery />} />
            <Route path='/questions' element={<AllQuestion />} />
            <Route
              path='/question/ask'
              element={<PrivateRoute component={<QuestionAsk />} auth={auth} />}
            />
            <Route
              path='/question/edit'
              element={
                <PrivateRoute component={<QuestionEdit />} auth={auth} />
              }
            />
            {/* <Route
              path='/mypage'
              element={<PrivateRoute component={<MyPage />} auth={auth} />} 
            /> */}
            <Route path='/members/myPage/:id' element={<MyPage />} />
            <Route path='/question/detail/:id' element={<QuestionsDetail />} />
            <Route path='/*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
