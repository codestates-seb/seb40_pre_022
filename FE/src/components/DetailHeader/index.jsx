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
import { data } from "@src/db/data.json";
import { calculateTime } from "../../utils/calculateTime";

const DetailHeader = () => {
  const questionInfo = [
    calculateTime(data[0].createdAt),
    calculateTime(data[0].updatedAt),
    data[0].view,
  ];
  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>Title</QuestionTitle>
          <Link to='/question/ask'>
            <Button label='Ask Question' size='header-size' />
          </Link>
        </QuestionHeader>
      </HeaderContainer>
      <InfoWrapper>
        {DETAIL_HEADER_INFO.map((info, i) => {
          return (
            <InfoContainer key={info.title}>
              <QuestionInfo>{info.title}</QuestionInfo>
              <QuestionInfo color='black'>{questionInfo[i]}</QuestionInfo>
            </InfoContainer>
          );
        })}
      </InfoWrapper>
    </>
  );
};

export default DetailHeader;
