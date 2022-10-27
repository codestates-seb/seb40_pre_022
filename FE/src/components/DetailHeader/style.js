import styled from "styled-components";

const HeaderContainer = styled.div`
  /* height: 44.45px; */
  height: 70px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionTitle = styled.h1`
  font-size: 2.07692308rem;
  margin-top: 16px;
`;

const QuestionInfo = styled.span`
  color: ${(props) => props.color || "hsl(210deg 8% 45%)"};
  margin-right: 6px;
  font-size: 0.8em;
`;

const InfoContainer = styled.div`
  display: inline;
  margin-right: 16px;
  margin-bottom: 8px;
`;

export {
  HeaderContainer,
  QuestionHeader,
  QuestionInfo,
  QuestionTitle,
  InfoContainer,
};
