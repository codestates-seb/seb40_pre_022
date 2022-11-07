import React from "react";
import {
  HeaderContainer,
  QuestionHeader,
  QuestionInfo,
  QuestionTitle,
  InfoContainer,
  InfoWrapper,
} from "./style";
import { Button } from "../Button";
import { DETAIL_HEADER_INFO } from "../../constants";
import { Link } from "react-router-dom";
import { calculateTime } from "../../utils/calculateTime";

const DetailHeader = ({ question }) => {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  let createdAt = new Date(Date.parse(question.createdAt) + KR_TIME_DIFF);
  let updatedAt = new Date(Date.parse(question.createdAt) + KR_TIME_DIFF);
  const questionInfo = [
    calculateTime(createdAt),
    calculateTime(updatedAt),
    question.viewCount,
  ];

  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>{question.title}</QuestionTitle>
          <Link to="/questions/ask">
            <Button label="Ask Question" size="header-size" />
          </Link>
        </QuestionHeader>
      </HeaderContainer>
      {
        <InfoWrapper>
          {DETAIL_HEADER_INFO.map((info, i) => {
            return (
              <InfoContainer key={info.title}>
                <QuestionInfo>{info.title}</QuestionInfo>
                <QuestionInfo color="black">{questionInfo[i]}</QuestionInfo>
              </InfoContainer>
            );
          })}
        </InfoWrapper>
      }
    </>
  );
};

export default DetailHeader;
