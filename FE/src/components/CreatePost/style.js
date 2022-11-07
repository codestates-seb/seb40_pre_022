import styled from "styled-components";

const QuestionContainer = styled.div`
  padding: 20px;
`;

const AskInputText = styled.div`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  &.text {
    color: #525960;
    font-size: 0.8rem;
  }
`;

const TitleInput = styled.input`
  padding: 8px 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 35px;
  border: 1px solid rgb(186, 191, 196);
  border-radius: 3px;
  margin-bottom: 30px;
  input::placeholder {
    color: rgb(133, 133, 133);
  }
`;

export { QuestionContainer, AskInputText, TitleInput };
