import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 70px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionTitle = styled.h1`
  font-size: 1.9rem;
  margin-top: 16px;
  color: hsl(210deg 8% 25%);
  @media ${(props) => props.theme.mobile} {
    font-size: 1.7rem;
  }
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

const InfoWrapper = styled.div`
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-color: hsl(210deg 8% 90%);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

export {
  HeaderContainer,
  QuestionHeader,
  QuestionInfo,
  QuestionTitle,
  InfoContainer,
  InfoWrapper,
};
