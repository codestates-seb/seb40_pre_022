import styled from "styled-components";

const AnswerContainer = styled.div`
  padding: 0px 16px;
`;

const AnswerMainTitle = styled.h2`
  padding-top: 20px;
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 19px;
`;

const AnswerForm = styled.form``;

const BtnContainer = styled.div`
  padding: 30px 0 15px 0;
`;

const AnswerText = styled.div`
  margin-top: 15px;
  margin-bottom: 17px;
  .link {
    color: hsl(206deg 100% 40%);
    &:hover {
      color: hsl(206deg 100% 52%);
    }
  }
`;

export {
  AnswerContainer,
  AnswerMainTitle,
  AnswerForm,
  BtnContainer,
  AnswerText,
};
