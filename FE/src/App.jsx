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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/members/login' element={<Login />}></Route>
              <Route path='/members/logout' element={<Logout />}></Route>
              <Route path='/join' element={<Join />}></Route>
              <Route path='/recovery' element={<Recovery />}></Route>
              <Route path='/questions' element={<AllQuestion />}></Route>
              <Route path='/questions/ask' element={<QuestionAsk />}></Route>
              <Route path='/questions/edit' element={<QuestionEdit />}></Route>
              <Route path='/mypage' element={<MyPage />}></Route>
              <Route
                path='/questions/:id'
                element={<QuestionsDetail />}></Route>
              <Route path='/*' element={<Error />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
