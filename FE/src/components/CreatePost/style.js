import styled from "styled-components";

const AskQuestionBox = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: grey 0px 0px 3px;
  border-radius: 3px;
`;

const QuestionContainer = styled.section`
  padding: 20px;
`;

const TitleInputText = styled.div`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  &.text {
    color: #525960;
  }
`;

const TitleInput = styled.input`
  padding: 8px 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 35px;
  border: 1px solid rgb(186, 191, 196);
  border-radius: 3px;
  color: rgb(186 191 196);
  margin-bottom: 30px;
`;

export { QuestionContainer, AskQuestionBox, TitleInputText, TitleInput };
