import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme }  from './styles';

import Login from './pages/Login';
import Home from './pages/Home'
import Join from './pages/Join'
import MyPage from './pages/MyPage'
import QuestionAsk from './pages/QuestionAsk'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/join" element={<Join />}></Route>
            <Route path="/question/ask" element={<QuestionAsk />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
