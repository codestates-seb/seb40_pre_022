import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Join from "./pages/Join";
import MyPage from "./pages/MyPage";
import QuestionAsk from "./pages/QuestionAsk";
import AllQuestion from "./pages/AllQuestion";
import QuestionsDetail from "./pages/QuestionsDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/question" element={<AllQuestion />}></Route>
          <Route path="/question/ask" element={<QuestionAsk />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/question/detail" element={<QuestionsDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
