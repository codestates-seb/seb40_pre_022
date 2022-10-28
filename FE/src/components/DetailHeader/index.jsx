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

const DetailHeader = () => {
  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>제목입니다.</QuestionTitle>
          <Button label='Ask Question' size='header-size' />
        </QuestionHeader>
      </HeaderContainer>
      <InfoWrapper>
        {DETAIL_HEADER_INFO.map((info) => {
          return (
            <InfoContainer>
              <QuestionInfo>{info.title}</QuestionInfo>
              <QuestionInfo color='black'>{info.content}</QuestionInfo>
            </InfoContainer>
          );
        })}
      </InfoWrapper>
    </>
  );
};

export default DetailHeader;
